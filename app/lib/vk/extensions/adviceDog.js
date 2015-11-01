function findVectorsAngleSin(v1, v2) {
    var module, length, dot = 0
    if (!v1.module)
        for (i = 0, module = 0, length = v1.length, v1.module = 0; i < length; i++)
            if (v1[i]) v1.module += v1[i] * v1[i]
    if (!v2.module)
        for (i = 0, module = 0, length = v2.length, v2.module = 0; i < length; i++)
            if (v2[i]) v2.module += v2[i] * v2[i]

    /* if we will get division by zero */
    if (v1.module === 0 || v2.module === 0)
        return null

    var minLength = Math.min(v1.length, v2.length)
    for (var i = 0; i < minLength; i++)
        dot += v1[i] * v2[i]

    return 1 - dot / Math.sqrt(v1.module * v2.module)
}


const vectorCache = fetch('http://publicradio.io/data/result.csv')
    .then(response => response.text())
    .then(csv => csv.split('\n')
        .map(line => line.split(',').map(entry => Number(entry) || 0))
        .filter(([id]) => id)
        .reduce(({...map, order}, [id, ...vector]) => ({...map, order: [...order, id], [id]: vector}), {order: []}))


//noinspection JSUnusedGlobalSymbols
export async function getPopular() {
    const cache = await vectorCache
    const list = []
    const map = {}
    for (let id of cache.order) {
        const vector = map[id] = cache[id]

        if (Math.min(...list
                .map(id => findVectorsAngleSin(vector, map[id]))
                .map((distance, idx, arr) => distance * arr.length / (idx + 1))) > 0.3)
            list.push(id)
    }

    return list
}

//noinspection JSUnusedGlobalSymbols
export async function getRecommended() {
    const cache = await vectorCache
    const userGroups = new Set(await getFavorites.call(this))
    const userGenres = await this.call('audio.get', {count: 1000}, '.items@.genre_id')
    const userVector = []
    for (let item of userGenres)
        if (item !== 18 && item < 25)
            userVector[item - 1] = (userVector[item - 1] || 0) + 1

    const matchMap = new Map()
    for (var i = 0; i < userVector.length; i++)
        if (!userVector[i])
            userVector[i] = 0
    /*todo fix*/
    for (let id of Object.keys(cache))
        if (!userGroups.has(id))
            matchMap.set(id, findVectorsAngleSin(userVector, cache[id]))

    const weightKVs = Array.from(matchMap)
    const weightKeys = weightKVs.map(([key, ]) => key)
    const weightValues = weightKVs.map(([, value]) => value)
    const sortedWeightKeys = insertionSort(weightValues, weightKeys)
    return await sortedWeightKeys.slice(0, 100)
}

export async function getFavorites() {
    const cache = await vectorCache
    const {items} = await this.getUserGroups()
    const results = await Promise.all(
        items.map(item => this.getGroupWallAttachments(item)
            .then(wall => console.log('getting wall data for ' + item) || validateWallData(wall) ? item : null))
    )
    console.log('items@@@@results', results);
    return results.filter(a => a)
}

const maxNoPostsWithTracksLevel = 2
function validateWallData(wallData) {
    if (wallData.length < 25)
        return
    let currentNoPostsWithTracksLevel = 0

    for (let entry of wallData)
        if (entry.length > 0)
            currentNoPostsWithTracksLevel = 0
        else if (++currentNoPostsWithTracksLevel > maxNoPostsWithTracksLevel)
            return
    return true
}

function noop(err) {
    console.trace(err)
}

function insertionSort(arr, arr2) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var j = i, item = arr[j], item2 = arr2[j]
        for (; j > 0 && arr[j - 1] > item; j--) {
            arr[j] = arr[j - 1]
            arr2[j] = arr2[j - 1]
        }
        arr[j] = item
        arr2[j] = item2
    }
    return arr2
}