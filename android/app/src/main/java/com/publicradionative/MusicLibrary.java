/*
* Copyright (C) 2014 The Android Open Source Project
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

package com.publicradionative;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Bitmap;
import android.media.MediaMetadata;
import android.media.browse.MediaBrowser;
import android.os.Build;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;

import static fj.data.Array.array;

@TargetApi(Build.VERSION_CODES.LOLLIPOP)
class MusicLibrary {
    private static final TreeMap<String, MediaMetadata> music = new TreeMap<>();
    private static final HashMap<String, String> uriRes = new HashMap<>();

    private static String getAlbumArtUri(String albumArtResName) {
        return "android.resource://" + BuildConfig.APPLICATION_ID + "/drawable/" + albumArtResName;
    }


    private static MediaMetadata createMediaMetadata(String mediaId, String title, String artist,
                                                     String album, String genre, long duration, int musicResId, int albumArtResId,
                                                     String albumArtResName) {

        return new MediaMetadata.Builder()
                .putString(MediaMetadata.METADATA_KEY_MEDIA_ID, mediaId)
                .putString(MediaMetadata.METADATA_KEY_ALBUM, album)
                .putString(MediaMetadata.METADATA_KEY_ARTIST, artist)
                .putLong(MediaMetadata.METADATA_KEY_DURATION, duration * 1000)
                .putString(MediaMetadata.METADATA_KEY_GENRE, genre)
                .putString(MediaMetadata.METADATA_KEY_ALBUM_ART_URI, getAlbumArtUri(albumArtResName))
                .putString(MediaMetadata.METADATA_KEY_DISPLAY_ICON_URI, getAlbumArtUri(albumArtResName))
                .putString(MediaMetadata.METADATA_KEY_TITLE, title)
                .build();
    }

    public static String getRoot() {
        return "";
    }

    public static void SetFromReadableArray(ReadableArray items) {
        array(ReactNativeUtils.toArrayOfMaps(items).toArray())
                .map((item) -> (ReadableMap)(item))
                .map(AudioTrack::new)
                .map((track) -> {
                    MediaMetadata metaData = createMediaMetadata(
                            track.id.toString(),
                            track.title,
                            track.artist,
                            null,
                 /*String genre*/ null,
                            track.duration,
                 /*int musicResId*/ -1,
                 /*Sint albumArtResId*/ -1,
                 /*String albumArtResName*/null);
                    uriRes.put(track.id.toString(), track.uri);
                    music.put(track.id.toString(), metaData);
                    return metaData;
                });
    }

    public static String getSongUri(String mediaId) {
        return uriRes.get(mediaId);
//        return "android.resource://" + BuildConfig.APPLICATION_ID + "/" + getMusicRes(mediaId);
    }

    public static Bitmap getAlbumBitmap(Context ctx, String mediaId) {
        return null;
//        return BitmapFactory.decodeResource(ctx.getResources(), MusicLibrary.getAlbumRes(mediaId));
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
        Bitmap albumArt = getAlbumBitmap(ctx, mediaId);

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
        builder.putBitmap(MediaMetadata.METADATA_KEY_ALBUM_ART, albumArt);
        return builder.build();
    }
}