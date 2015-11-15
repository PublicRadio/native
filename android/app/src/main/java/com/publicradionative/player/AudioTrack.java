package com.publicradionative.player;

import com.facebook.react.bridge.ReadableMap;

import lombok.Getter;

class AudioTrack {
    private final @Getter String uri;
    private final @Getter String artist;
    private final @Getter String title;
    private final @Getter Integer id;
    private final @Getter Long duration;

    public AudioTrack(ReadableMap trackInfo) {
        uri = trackInfo.hasKey("url") ? trackInfo.getString("url") : trackInfo.getString("uri");
        artist = trackInfo.getString("artist");
        title = trackInfo.getString("title");
        duration = (long) trackInfo.getInt("duration");
        id = trackInfo.getInt("id");
    }
}
  