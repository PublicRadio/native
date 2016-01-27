package com.publicradio;

import android.app.Application;
import android.util.Log;

import com.vk.sdk.VKAccessToken;
import com.vk.sdk.VKAccessTokenTracker;
import com.vk.sdk.VKSdk;

import lombok.Setter;

public class DefaultApplication extends Application {
    private @Setter ProjectModulesPackage.Callback vkAccessTokenCallback;

    private final VKAccessTokenTracker vkAccessTokenTracker = new VKAccessTokenTracker() {
        @Override
        public void onVKAccessTokenChanged(VKAccessToken oldToken, VKAccessToken vkAccessToken) {
            Log.i("VK", "Token changed, callback " + (vkAccessTokenCallback != null ? "exists" : "not exists"));
            if (vkAccessTokenCallback != null) {
                vkAccessTokenCallback.passToken(vkAccessToken != null ? vkAccessToken.accessToken : "");
            }
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        vkAccessTokenTracker.startTracking();
        VKSdk.initialize(this);
    }
}
