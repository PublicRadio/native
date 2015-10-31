package com.publicradionative;

import android.net.Uri;

import com.facebook.react.bridge.ReadableMap;

public class AudioTrack {
    Uri uri;
    String artist;
    String title;

    public AudioTrack(ReadableMap trackInfo) {
        uri = Uri.parse(trackInfo.getString("uri"));
        artist = trackInfo.getString("artist");
        title = trackInfo.getString("title");
    }
}
