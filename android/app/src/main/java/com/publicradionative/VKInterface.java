package com.publicradionative;

import android.app.Activity;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.vk.sdk.VKSdk;

/**
 * Created by vrodionov on 10/31/15.
 */
public class VKInterface extends ReactContextBaseJavaModule {
    Context context;
    Activity currentActivity;

    public VKInterface(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        context = reactContext;
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
