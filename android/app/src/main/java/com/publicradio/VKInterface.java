package com.publicradio;

import android.app.Activity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.vk.sdk.VKSdk;

class VKInterface extends ReactContextBaseJavaModule {
    private final Activity currentActivity;

    public VKInterface(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        currentActivity = activity;
    }

    @Override
    public String getName() {
        return "VKInterface";
    }

    @ReactMethod
    public void login() {
        VKSdk.login(currentActivity, "audio", "groups");
    }
}
