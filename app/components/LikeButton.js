import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'
import {vk} from '../lib/index'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

async function like (track, station) {
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

export default connect(store => {vk:store.vk, currentTrack, currentStation})
(class LikeButton extends Component {
    constructor(){
        super();
        this.state = {clicked:false};
    }

    render() {
        return <TouchableOpacity onPress={() => {
            if(this.state.clicked){
                return;
            }
            // this.authorised ? NativeModules.VKInterface.login() : undefined
            like(currentTrack, currentStation)
            .then(()=>{
                this.setState({clicked:true});
            })
        }}>
            <Icon
                name={this.state.clicked ? 'favorite' : 'favorite-border'}
                size={30}
                color='#333333'/>
        </TouchableOpacity>

    }
})
