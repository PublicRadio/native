package com.publicradionative;

import android.app.Application;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.vk.sdk.VKSdk;
import com.vk.sdk.VKAccessTokenTracker;
import com.vk.sdk.VKAccessToken;

import javax.annotation.Nullable;


public class DefaultApplication extends Application {
    VKAccessToken vkAccessToken;
    TokenCallback vkAccessTokenCallback;
    VKAccessTokenTracker vkAccessTokenTracker = new VKAccessTokenTracker() {
        @Override
        public void onVKAccessTokenChanged(VKAccessToken oldToken, VKAccessToken newToken) {
            Log.i("VK", "Token changed, callback " + (vkAccessTokenCallback != null ? "exists" : "not exists"));
            vkAccessToken = newToken;
            invokeTokenCallback();
        }
    };

    private void invokeTokenCallback() {
        if (vkAccessTokenCallback != null) {
            vkAccessTokenCallback.callbackCall(vkAccessToken != null ? vkAccessToken.accessToken : "");
        }
    }

    public void registerTokenCallback(TokenCallback callback) {
        vkAccessTokenCallback = callback;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        vkAccessTokenTracker.startTracking();
        VKSdk.initialize(this);
    }
}
