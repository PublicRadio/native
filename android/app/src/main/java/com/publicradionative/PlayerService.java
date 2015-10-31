package com.publicradionative;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.IBinder;
import android.os.PowerManager;
¬
import java.util.ArrayList;
import java.util.Random;


import android.os.Binder;


public class PlayerService extends Service implements
        MediaPlayer.OnPreparedListener, MediaPlayer.OnErrorListener, MediaPlayer.OnCompletionListener {

    MediaPlayer player = new MediaPlayer();
    Random random = new Random();
    Context context;
    //song list

    public PlayerService(Context playerContext) {
        context = playerContext;
    }

    public class PlayerBinder extends Binder {
        public PlayerService getService() { return PlayerService.this; }
    }

    private ArrayList<AudioTrack> songs;
    private final IBinder playerBinder = new PlayerBinder();

    @Override
    public IBinder onBind(Intent intent) { return playerBinder; }

    @Override
    public boolean onUnbind(Intent intent) {
        player.stop();
        player.release();
        return false;
    }


    public void setTrackList(ArrayList<AudioTrack> trackList) {
        //todo
    }

    public void play() {

    }

    public void pause() {

    }

    @Override
    public void onCreate() {
        super.onCreate();
        player.setWakeMode(getApplicationContext(), PowerManager.PARTIAL_WAKE_LOCK);
        player.setAudioStreamType(AudioManager.STREAM_MUSIC);
        player.setOnPreparedListener(this);
        player.setOnCompletionListener(this);
        player.setOnErrorListener(this);
    }

    @Override
    public void onCompletion(MediaPlayer mediaPlayer) {

    }

    @Override
    public boolean onError(MediaPlayer mediaPlayer, int i, int i1) {
        return false;
    }

    @Override
    public void onPrepared(MediaPlayer mediaPlayer) {

    }
}
