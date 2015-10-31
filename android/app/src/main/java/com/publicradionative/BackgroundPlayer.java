package com.publicradionative;

import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.util.Log;

public class BackgroundPlayer extends ReactContextBaseJavaModule {
    MediaPlayer mediaPlayer;
    Context context;
    private static final String TAG = "BackgroundPlayer";

    public BackgroundPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "BackgroundPlayer";
    }

    @ReactMethod
    public void play() {
        try {
            Uri uri = Uri.parse("https://cs1-19v4.vk-cdn.net/p21/c2524b81b7eca9.mp3?extra=MaDGuMXXGmsIFHJR9mzPeqj4e6P8ZRwDKI8VFTtuLOetaPRDxm5Cwz2D1V_pSX_93Zi3YlKKuTdsDS5wpl6vPBqLRIO2Odk");
            mediaPlayer = MediaPlayer.create(context, uri);
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
