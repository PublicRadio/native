package com.publicradio;

import android.app.Activity;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ViewManager;
import com.publicradio.player.BackgroundPlayer;
import com.publicradio.utils.ReduxSender;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

class ProjectModulesPackage implements ReactPackage {
    private final Activity currentActivity;

    public ProjectModulesPackage(Activity activity) {
        currentActivity = activity;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new BackgroundPlayer(reactContext, currentActivity));
        modules.add(new LinkOpener(reactContext));
        modules.add(new VKInterface(reactContext, currentActivity));
        // Exception in native call from JS
        // 01-27 11:06:53.187 2396-2396/com.publicradio E/unknown:React: java.lang.ClassCastException: android.app.Application cannot be cast to com.publicradio.DefaultApplication
//        DefaultApplication application = (DefaultApplication) currentActivity.getApplication();
//        application.setVkAccessTokenCallback((String token)->{
//            WritableMap params = Arguments.createMap();
//            params.putString("token", token);
//            ReduxSender.sendEvent(reactContext, "AccessTokenUpdate", params);
//        });
        return modules;
    }

    public interface Callback {
        void passToken(String token);
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.asList();
    }
}

