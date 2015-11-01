package com.publicradionative;

import android.media.session.PlaybackState;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import java.util.ArrayList;

public class BackgroundPlayer extends ReactContextBaseJavaModule {
    ReactApplicationContext context;
    ArrayList<AudioTrack> tracks = new ArrayList<>();
    public static BackgroundPlayer backgroundPlayer;
    private static final String TAG = "BackgroundPlayer";

    public BackgroundPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        backgroundPlayer = this;

//        updatePlaybackState(MainActivity.mainActivity.getMediaController().getPlaybackState());
    }

    @Override
    public String getName() { return "BackgroundPlayer"; }

    @ReactMethod
    public void setTrackList(ReadableArray items) {
        try {
            MusicLibrary.SetFromReadableArray(items);
            setNextTrack();
        } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }

    @ReactMethod
    public void setNextTrack() {
        String key = MusicService.mPlayback.getCurrentMediaId();

        String nextTrack = MusicLibrary.getNextSong(key);
        if(nextTrack == null){
            return;
        }
        stop();
        MainActivity.mainActivity.getMediaController().getTransportControls().playFromMediaId(nextTrack, null);
    }

    @ReactMethod
    public void play() {
        try { MainActivity.mainActivity.getMediaController().getTransportControls().play(); } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }

    @ReactMethod
    public void stop() { 
        try { MainActivity.mainActivity.getMediaController().getTransportControls().stop(); } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }

    @ReactMethod
    public void pause() { 
        try { MainActivity.mainActivity.getMediaController().getTransportControls().pause(); } catch (Exception e) { Log.wtf(TAG, "react" + e.getMessage()); }
    }

    private void dispatchReduxUpdatePlaybackState(String eventName) {
        ReduxSender.sendEvent(context, eventName, null);
    }

    public void updatePlaybackState(PlaybackState state) {
        if(state == null || PlaybackState.STATE_STOPPED == state.getState()){
            dispatchReduxUpdatePlaybackState("STATE_STOPPED");
        } else if(PlaybackState.STATE_PAUSED == state.getState()) {
            dispatchReduxUpdatePlaybackState("STATE_PAUSED");
        } else if(PlaybackState.STATE_PLAYING == state.getState()) {
            dispatchReduxUpdatePlaybackState("STATE_PLAYING");
        }
    }
}
