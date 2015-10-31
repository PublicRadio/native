package com.publicradionative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.util.Log;

import java.util.Random;
import java.util.ArrayList;

import javax.annotation.Nullable;

public class BackgroundPlayer extends ReactContextBaseJavaModule {
    MediaPlayer mediaPlayer = null;
    ReactContext context;
    ArrayList<Track> tracks = new ArrayList<>();
    Random random = new Random();

    private static final String TAG = "BackgroundPlayer";

    public BackgroundPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {

        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @Override
    public String getName() { return "BackgroundPlayer"; }

    private int getRandomTrackIndex() { return random.nextInt(tracks.size()); }

    private Track getRandomTrack() { return tracks.get(getRandomTrackIndex()); }
    
    private void setTrack(Track track) {
        Log.i(TAG, "now playing: " + track.artist + " " + track.title);
        //todo
        WritableMap map = Arguments.createMap();
        map.putString("artist", track.artist);
        map.putString("title", track.title);
        sendEvent(context, "PlayerTrackChange", map);
        try { 
            if(mediaPlayer == null) {
                mediaPlayer = MediaPlayer.create(context, track.uri);
                return;
            }
            mediaPlayer.setDataSource(context, track.uri); 
        } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }

    @ReactMethod
    public void setNextTrack() { setTrack(getRandomTrack()); }

    @ReactMethod
    public void setTrackList(ReadableArray items) {
        tracks = new ArrayList<Track>();
        int size = items.size();
        for (int i = 0; i < size; i++)
            tracks.add(new Track(items.getMap(i)));
    }

    @ReactMethod
    public void play() {
        try { mediaPlayer.start(); } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }

    @ReactMethod
    public void pause() { 
        try { mediaPlayer.pause(); } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }
}


class Track {
    Uri uri;
    String artist;
    String title;

    public Track(ReadableMap trackInfo) {
        uri = Uri.parse(trackInfo.getString("uri"));
        artist = trackInfo.getString("artist");
        title = trackInfo.getString("title");
    }
}