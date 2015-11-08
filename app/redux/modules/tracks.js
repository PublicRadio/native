async function likeTrack (track, station) {
    const albums = await vk.call('audio.getAlbums', {offset: 0, count: 100}, '.items');
    const currentAlbumTitle = 'publicRadio.io // ' + station.name + ' (' + station.screen_name + ')';
    const albumRegex = new RegExp(`^publicRadio.io \/\/.*\(${station.screen_name}\)$`, 'img');
    const currentAlbum = albums.filter(album => albumRegex.test(album.title))[0];
    const album_id = (currentAlbum ? currentAlbum : await vk.call('audio.addAlbum', {title: currentAlbumTitle})).album_id;
    var audio_id = await vk.call('audio.add', {audio_id: track.id, owner_id: track.owner_id});
    await Promise.all([
        vk.call('audio.moveToAlbum', {album_id, audio_ids: audio_id}),
        vk.call('audio.edit', {
            owner_id: vk.user.id,
            audio_id,
            title: track.title + ' (найдено на PublicRadio.io)'
        })
    ]);
}

const like = (item, isLike) => 
  item.like = isLike;
  return item;

const applyFuncToItem = (func)=>(item)=>
  return func(item);

export default handleActions({
   'LIKE_TRACK' : (state, {id}}) => ,
   'SET_TRACKS' : (state, payload) => ,
   'CLEAR_TRACKS' : (state) => ({}),
}, {})