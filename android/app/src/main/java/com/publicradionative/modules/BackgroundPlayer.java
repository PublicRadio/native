package com.facebook.react.modules.BackgroundPlayerAndroid;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.io.File;

import android.app.Activity;
import android.app.Service;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.IBinder;

public class BackgroundPlayerAndroid extends ReactContextBaseJavaModule {
  MediaPlayer mediaPlayer;
  public BackgroundPlayerAndroid(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "BackgroundPlayerAndroid";
  }

  @ReactMethod
  public void play () {
    try {
      mediaPlayer = new MediaPlayer();
      File file = new File("./assets/raw/track.mp3");
      String filePath = file.getAbsolutePath();
      mediaPlayer.setDataSource(filePath);
      mediaPlayer.start();
    } catch (Exception e) {

    }
  }
  @ReactMethod
  public void pause() {
    mediaPlayer.stop();
  }
}
