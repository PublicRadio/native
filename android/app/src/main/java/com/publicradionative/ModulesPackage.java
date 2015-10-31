package com.publicradionative.modules;

import java.util.ArrayList;
import com.publicradionative.modules.BackgroundPlayer;
import com.facebook.react.ReactPackage;

public class ModulesPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new BackgroundPlayer(reactContext));
    return modules;
  }
}
