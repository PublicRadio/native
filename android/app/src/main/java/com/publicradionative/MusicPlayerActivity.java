/*
 * Copyright (C) 2014 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.publicradionative;

import android.content.ComponentName;
import android.media.MediaMetadata;
import android.media.browse.MediaBrowser;
import android.media.session.MediaController;
import android.media.session.PlaybackState;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.List;

/**
 * An Activity to browse and play media.
 */
public class MusicPlayerActivity extends AppCompatActivity  implements DefaultHardwareBackBtnHandler {
    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    private MediaBrowser mMediaBrowser;

    private final MediaBrowser.ConnectionCallback mConnectionCallback =
            new MediaBrowser.ConnectionCallback() {
                @Override
                public void onConnected() {
                    mMediaBrowser.subscribe(mMediaBrowser.getRoot(), mSubscriptionCallback);
                    MediaController mediaController = new MediaController(
                            MusicPlayerActivity.this, mMediaBrowser.getSessionToken());
                    updatePlaybackState(mediaController.getPlaybackState());
                    updateMetadata(mediaController.getMetadata());
                    mediaController.registerCallback(mMediaControllerCallback);
                    setMediaController(mediaController);

                    getMediaController().getTransportControls().playFromMediaId("Jazz_In_Paris", null);
                }
            };

    // Receive callbacks from the MediaController. Here we update our state such as which queue
    // is being shown, the current title and description and the PlaybackState.
    private final MediaController.Callback mMediaControllerCallback = new MediaController.Callback() {
        @Override
        public void onMetadataChanged(MediaMetadata metadata) {
            updateMetadata(metadata);
        }

        @Override
        public void onPlaybackStateChanged(PlaybackState state) {
            updatePlaybackState(state);
        }

        @Override
        public void onSessionDestroyed() {
            updatePlaybackState(null);
        }
    };

    private final MediaBrowser.SubscriptionCallback mSubscriptionCallback =
        new MediaBrowser.SubscriptionCallback() {
            @Override
            public void onChildrenLoaded(String parentId, List<MediaBrowser.MediaItem> children) {
            }
        };


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new VectorIconsPackage())
                .addPackage(new ProjectModulesPackage(this))
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "PublicRadioNative", null);

        setContentView(mReactRootView);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this);
        }
    }

    @Override
    public void onStart() {
        super.onStart();

        mMediaBrowser = new MediaBrowser(this,
               new ComponentName(this, MusicService.class), mConnectionCallback, null);
        mMediaBrowser.connect();
    }

    @Override
    public void onStop() {
        super.onStop();
        try {
            getMediaController().unregisterCallback(mMediaControllerCallback);
            mMediaBrowser.unsubscribe(mMediaBrowser.getRoot());
        } finally {
            mMediaBrowser.disconnect();
        }
    }

    private void updatePlaybackState(PlaybackState state) {
//        if (state == null || state.getState() == PlaybackState.STATE_PAUSED ||
//                state.getState() == PlaybackState.STATE_STOPPED) {
//            mPlayPause.setImageDrawable(getDrawable(R.drawable.ic_play_arrow_black_36dp));
//        } else {
//            mPlayPause.setImageDrawable(getDrawable(R.drawable.ic_pause_black_36dp));
//        }
//        mPlaybackControls.setVisibility(state == null ? View.GONE : View.VISIBLE);
    }

    private void updateMetadata(MediaMetadata metadata) {

//        mTitle.setText(metadata == null ? "" : metadata.getDescription().getTitle());
//        mSubtitle.setText(metadata == null ? "" : metadata.getDescription().getSubtitle());
//        mAlbumArt.setImageBitmap(metadata == null ? null : MusicLibrary.getAlbumBitmap(this,
//                metadata.getDescription().getMediaId()));
    }

//    private final View.OnClickListener mPlaybackButtonListener = new View.OnClickListener() {
//        @Override
//        public void onClick(View v) {
//            final int state = mCurrentState == null ?
//                    PlaybackState.STATE_NONE : mCurrentState.getState();
//            if (state == PlaybackState.STATE_PAUSED ||
//                    state == PlaybackState.STATE_STOPPED ||
//                    state == PlaybackState.STATE_NONE) {
//
//                if (mCurrentMetadata == null) {
//                    mCurrentMetadata = MusicLibrary.getMetadata(MusicPlayerActivity.this,
//                            MusicLibrary.getMediaItems().get(0).getMediaId());
//                    updateMetadata(mCurrentMetadata);
//                }
//                getMediaController().getTransportControls().playFromMediaId(
//                        mCurrentMetadata.getDescription().getMediaId(), null);
//
//            } else {
//                getMediaController().getTransportControls().pause();
//            }
//        }
//    };
}
