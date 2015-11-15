package com.publicradionative.player;

import android.app.Activity;
import android.media.session.MediaController;
import android.media.session.PlaybackState;
import android.util.Log;
import com.publicradionative.utils.ReduxSender;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

public class BackgroundPlayer extends ReactContextBaseJavaModule {
    private static final String TAG = "BackgroundPlayer";
    public static BackgroundPlayer backgroundPlayer;
    private final ReactApplicationContext context;
    private final Activity currentActivity;
    private final MediaController.TransportControls transportControls;

    public BackgroundPlayer(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        currentActivity = activity;
        context = reactContext;
        backgroundPlayer = this;
        transportControls = currentActivity.getMediaController().getTransportControls();
    }

    @Override
    public String getName() {
        return "BackgroundPlayer";
    }

    @ReactMethod
    public void setTrackList(ReadableArray items) {
        try {
            stop();
            MusicLibrary.SetFromReadableArray(items);
            setNextTrack();
        } catch (Exception e) {
            Log.wtf(TAG, "react" + e.getMessage());
        }
    }

    @ReactMethod
    public void setNextTrack() {
        String key = MusicService.mPlayback.getCurrentMediaId();

        String nextTrack = MusicLibrary.getNextSong(key);
        if (nextTrack == null) {
            return;
        }
        stop();
        transportControls.playFromMediaId(nextTrack, null);
    }

    @ReactMethod
    public void play() {
        transportControls.play();
    }

    @ReactMethod
    public void stop() {
        transportControls.stop();
    }

    @ReactMethod
    public void pause() {
        transportControls.pause();
    }

    private void dispatchReduxUpdatePlaybackState(String eventName) {
        ReduxSender.sendEvent(context, eventName, null);
    }

    public void updatePlaybackState(PlaybackState state) {
        if (state == null || PlaybackState.STATE_STOPPED == state.getState()) {
            dispatchReduxUpdatePlaybackState("STATE_STOPPED");
        } else if (PlaybackState.STATE_PAUSED == state.getState()) {
            dispatchReduxUpdatePlaybackState("STATE_PAUSED");
        } else if (PlaybackState.STATE_PLAYING == state.getState()) {
            dispatchReduxUpdatePlaybackState("STATE_PLAYING");
        }
    }
}
