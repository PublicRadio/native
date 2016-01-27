package com.publicradionative;

import android.app.Activity;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ViewManager;
import com.publicradionative.player.BackgroundPlayer;
import com.publicradionative.utils.ReduxSender;

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
        DefaultApplication application = (DefaultApplication) currentActivity.getApplication();
        application.setVkAccessTokenCallback((String token)->{
            WritableMap params = Arguments.createMap();
            params.putString("token", token);
            ReduxSender.sendEvent(reactContext, "AccessTokenUpdate", params);
        });
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

