package com.publicradionative;

import android.net.Uri;

import com.facebook.react.bridge.ReadableMap;

public class AudioTrack {
    public String uri;
    public String artist;
    public String title;
    public Integer id;
    public Long duration;

    public AudioTrack(ReadableMap trackInfo) {
        uri = trackInfo.getString("uri");
        artist = trackInfo.getString("artist");
        title = trackInfo.getString("title");
        duration = (long) trackInfo.getInt("duration");
        id = trackInfo.getInt("id");
    }
}
