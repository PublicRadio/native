package com.publicradionative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

class TokenCallback {
    ReactApplicationContext context;

    public TokenCallback(ReactApplicationContext ctx) {context = ctx;}

    void callbackCall(String token) {
        WritableMap params = Arguments.createMap();
        params.putString("token", token);

        ReduxSender.sendEvent(context, "AccessTokenUpdate", params);
    }
}