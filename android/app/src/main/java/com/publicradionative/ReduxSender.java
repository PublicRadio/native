package com.publicradionative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import javax.annotation.Nullable;

public class ReduxSender {
    private static WritableMap createReduxAction(String eventName, @Nullable WritableMap params) {
        WritableMap map = Arguments.createMap();
        map.putString("event", eventName);
        if (params != null) {
            map.putMap("payload", params);
        }

        return map;
    }

    public static void sendEvent(ReactContext reactContext, String eventName,
                                 @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ReduxAction", createReduxAction(eventName, params));
    }
}
