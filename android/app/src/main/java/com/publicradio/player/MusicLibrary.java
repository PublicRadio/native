package com.publicradio.player;

import android.annotation.TargetApi;
import android.content.Context;
import android.media.MediaMetadata;
import android.media.browse.MediaBrowser;
import android.os.Build;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.publicradio.utils.ReactNativeUtils;

import java.util.Collection;
import java.util.HashMap;
import java.util.TreeMap;

import fj.data.Array;

import static fj.data.Array.array;

@TargetApi(Build.VERSION_CODES.LOLLIPOP)
class MusicLibrary {
    private static final TreeMap<String, MediaMetadata> music = new TreeMap<>();
    private static final HashMap<String, String> uriRes = new HashMap<>();

    private static MediaMetadata createMediaMetadata(String mediaId, String title, String artist, long duration) {

        return new MediaMetadata.Builder()
                .putString(MediaMetadata.METADATA_KEY_MEDIA_ID, mediaId)
                .putString(MediaMetadata.METADATA_KEY_ARTIST, artist)
                .putLong(MediaMetadata.METADATA_KEY_DURATION, duration * 1000)
                .putString(MediaMetadata.METADATA_KEY_TITLE, title)
                .build();
    }

    public static String getRoot() {
        return "";
    }

    public static void SetFromReadableArray(ReadableArray items) {
        Array.array(ReactNativeUtils.toArrayOfMaps(items).toArray())
                .map((item) -> (ReadableMap)(item))
                .map(AudioTrack::new)
                .map((track) -> {
                    String _id = track.getId().toString();
                    MediaMetadata metaData = createMediaMetadata(
                            _id,
                            track.getTitle(),
                            track.getArtist(),
                            track.getDuration());
                    uriRes.put(_id, track.getUri());
                    music.put(_id, metaData);
                    return metaData;
                });
    }

    public static String getSongUri(String mediaId) {
        return uriRes.get(mediaId);
    }

    public static Collection<MediaBrowser.MediaItem> getMediaItems() {
        return array(music.values().toArray())
                .map((item) -> (MediaMetadata) (item))
                .map((metadata) -> new MediaBrowser.MediaItem((metadata).getDescription(), MediaBrowser.MediaItem.FLAG_PLAYABLE))
                .toCollection();
    }

    public static String getNextSong(String currentMediaId) {
        if (currentMediaId == null) {
            try {
                return music.firstKey();
            } catch (Exception ex) {
                return null;
            }
        }
        String nextMediaId = music.higherKey(currentMediaId);
        if (nextMediaId == null) {
            nextMediaId = music.firstKey();
        }
        return nextMediaId;
    }

    public static MediaMetadata getMetadata(Context ctx, String mediaId) {
        MediaMetadata metadataWithoutBitmap = music.get(mediaId);

        // Since MediaMetadata is immutable, we need to create a copy to set the album art
        // We don't set it initially on all items so that they don't take unnecessary memory
        MediaMetadata.Builder builder = new MediaMetadata.Builder();
        for (String key : new String[]{MediaMetadata.METADATA_KEY_MEDIA_ID,
                MediaMetadata.METADATA_KEY_ALBUM, MediaMetadata.METADATA_KEY_ARTIST,
                MediaMetadata.METADATA_KEY_GENRE, MediaMetadata.METADATA_KEY_TITLE}) {
            builder.putString(key, metadataWithoutBitmap.getString(key));
        }
        builder.putLong(MediaMetadata.METADATA_KEY_DURATION,
                metadataWithoutBitmap.getLong(MediaMetadata.METADATA_KEY_DURATION));
        return builder.build();
    }
}