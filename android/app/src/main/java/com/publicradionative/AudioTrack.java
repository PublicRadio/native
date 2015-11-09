package com.publicradionative;

import com.facebook.react.bridge.ReadableMap;

public class AudioTrack {
    public final String uri;
    public final String artist;
    public final String title;
    public final Integer id;
    public final Long duration;

    public AudioTrack(ReadableMap trackInfo) {
        uri = trackInfo.getString("url");
        artist = trackInfo.getString("artist");
        title = trackInfo.getString("title");
        duration = (long) trackInfo.getInt("duration");
        id = trackInfo.getInt("id");
    }
}
