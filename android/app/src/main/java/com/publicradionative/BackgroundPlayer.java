package com.publicradionative;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.io.File;

import android.media.MediaPlayer;
import android.util.Log;

public class BackgroundPlayer extends ReactContextBaseJavaModule {
    MediaPlayer mediaPlayer;
    private static final String TAG = "BackgroundPlayer";

    public BackgroundPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BackgroundPlayer";
    }

    @ReactMethod
    public void play() {
        try {
            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource("https://cs1-19v4.vk-cdn.net/p21/c2524b81b7eca9.mp3?extra=MaDGuMXXGmsIFHJR9mzPeqj4e6P8ZRwDKI8VFTtuLOetaPRDxm5Cwz2D1V_pSX_93Zi3YlKKuTdsDS5wpl6vPBqLRIO2Odk");
            mediaPlayer.start();
        } catch (Exception e) {
            Log.wtf(TAG, "react" + e.getMessage());
        }
    }

    @ReactMethod
    public void pause() {
        mediaPlayer.stop();
    }
}
