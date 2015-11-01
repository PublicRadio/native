import {encodeToSearchString} from './util'

export class Query {
    constructor(method, opts = {}, postfix = '') {Object.assign(this, {method, opts: {v: Query.v, ...opts}, postfix})}
}
Query.v = '5.25';

function generateExecuteCode(queries) {
    return 'var results=[],result;' +
        queries
            .map(q => ({
                call: `API.${q.method}(${JSON.stringify(q.opts, (key, value) => typeof value === 'string'
                    ? value.replace(/[^\\]('")/img, "\$1").replace(/&/img, '')
                    : value)})`,
                postfix: q.postfix
            }))
            .map(q => q.postfix
                ? `result = ${q.call}${q.postfix};results.push(result);`
                : `results.push(${q.call});`)
            .join('\n') +
        `return results;`
}

export class QueryRunner {
    constructor() {
        this.spliceSize = QueryRunner.spliceSizeHighThreshold;
        this.stack = [];
        this._loopRunning = false;
    }

    addQuery(method, opts, postfix) {
        return new Promise(resolve => {
            this.stack.push(Object.assign(new Query(method, opts, postfix), {resolve}))
            setTimeout(() => this.startLoop(), 0)
        })
    }

    /** @private */
    removeQueryFromStack(query) {
        this.stack.splice(this.stack.indexOf(query), 1)
    }

    /** @private */
    getNextQuery() {
        if (this.stack.length === 0) {}
        else if (!this.access_token) {
            for (let query of this.stack)
                if (query.method !== 'execute') {
                    this.removeQueryFromStack(query)
                    return query
                }
        }
        else if (this.stack[0].method === 'execute') {
            const query = this.stack[0]
            this.removeQueryFromStack(query)
            return query
        }
        else {
            const aggregatedQueryStack = []
            for (let query of this.stack) if (query.method !== 'execute') {
                aggregatedQueryStack.push(query)
                if (aggregatedQueryStack.length >= this.spliceSize)
                    break
            }

            for (let query of aggregatedQueryStack)
                this.removeQueryFromStack(query)

            if (aggregatedQueryStack.length === 1)
                return aggregatedQueryStack[0]
            else
                return Object.assign(new Query('execute', {code: generateExecuteCode(aggregatedQueryStack)}),
                    {
                        resolve(response) {
                            console.log(Object.keys(response), response)
                            for (var i = 0; i < response.length; i++)
                                aggregatedQueryStack[i].resolve(response[i])
                        }
                    })
        }
    }

    /** @private */
    startLoop() {
        if (!this._loopRunning)
            this.runLoop()
    }

    /** @private */
    processError(error) {
        console.warn(error)
        //todo
    }

    /** @private */
    async runLoop() {
        let query
        while (query = this.getNextQuery()) {
            const result = await this.executeQuery(query)
            result === undefined ? this.addQuery(query) : query.resolve(result.response)
        }
    }

    /** @private */
    executeQuery(query) {
        const request = `${QueryRunner.basePath}/${query.method}?` +
            encodeToSearchString(this.access_token ? {...query.opts, access_token: this.access_token} : query.opts)
        console.log(request)
        return fetch(request)
            .then(response => response.json())
            .then(({error, ...response} = {error: true}) => {
                console.log(error, query, Object.keys(response.response))
                if (!error)
                    return response

                this.processError(error)
                return Promise.reject(error)
            })

    }
}


Object.assign(QueryRunner, {
    instances: new Map(),
    spliceSizeLowThreshold: 4,
    spliceSizeHighThreshold: 25,
    basePath: 'https://api.vk.com/method'
})
