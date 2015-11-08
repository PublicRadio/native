async function getUser () {
    await vk.call('users.get', {fields: 'photo_200'}).then(users => users[0]);
}

export default handleActions({
   'SET_USER' : (state, payload) => ,
   'CLEAR_USER' : (state) => ({}),
}, {})