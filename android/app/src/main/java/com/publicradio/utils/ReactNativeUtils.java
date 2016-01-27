package com.publicradio.utils;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;

public class ReactNativeUtils {
    public static ArrayList<ReadableMap> toArrayOfMaps (ReadableArray array) {
        ArrayList<ReadableMap> res = new ArrayList<>();
        int size = array.size();
        for (int i = 0; i < size; i++) {
            res.add(array.getMap(i));
        }
        return res;
    }
}
