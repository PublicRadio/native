package com.publicradionative.player;

import com.facebook.react.bridge.ReadableMap;

class AudioTrack {
    public final String uri, artist, title;
    public final Integer id;
    public final Long duration;

    public AudioTrack(ReadableMap trackInfo) {
        uri = trackInfo.hasKey("url") ? trackInfo.getString("url") : trackInfo.getString("uri");
        artist = trackInfo.getString("artist");
        title = trackInfo.getString("title");
        duration = (long) trackInfo.getInt("duration");
        id = trackInfo.getInt("id");
    }
}
  