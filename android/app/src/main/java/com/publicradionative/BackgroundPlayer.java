package com.publicradionative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.media.MediaPlayer;
import android.os.IBinder;
import android.os.Messenger;
import android.util.Log;

import java.util.ArrayList;

import javax.annotation.Nullable;

public class BackgroundPlayer extends ReactContextBaseJavaModule {
    ReactContext context;
    PlayerService player;

    private PlayerService playerService;
    private boolean musicBound = false;
    private ServiceConnection musicConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            playerService = ((PlayerService.PlayerBinder) service).getService();
            musicBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            playerService = null;
            musicBound = false;
        }
    };

    private static final String TAG = "BackgroundPlayer";

    public BackgroundPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        player = new PlayerService(context);
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        context
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    @Override
    public String getName() { return "BackgroundPlayer"; }

    private int getRandomTrackIndex() { return random.nextInt(tracks.size()); }

    private AudioTrack getRandomTrack() { return tracks.get(getRandomTrackIndex()); }

    private void playNextTrack() { playTrack(getRandomTrack()); }

    public void playTrack(Track track) {
        Log.i(TAG, "now playing: " + track.artist + " " + track.title);
        //todo
        WritableMap map = Arguments.createMap();
        map.putString("artist", track.artist);
        map.putString("title", track.title);
        sendEvent(context, "PlayerTrackChange", map);
        mediaPlayer.stop();
        mediaPlayer = MediaPlayer.create(context, track.uri);
        play();
    }

    @ReactMethod
    public void setTrackList(ReadableArray items) {
        tracks = new ArrayList<Track>();
        int size = items.size();
        for (int i = 0; i < size; i++)
            tracks.add(new AudioTrack(items.getMap(i)));
    }

    @ReactMethod
    public void play() {
        try { mediaPlayer.start(); } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }

    @ReactMethod
    public void pause() { mediaPlayer.stop(); }

    @ReactMethod
    public void skip() { playNextTrack(); }
}