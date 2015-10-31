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

package com.publicradionative.utils;

import android.media.MediaMetadata;
import android.media.session.MediaSession;
import com.publicradionative.model.MusicProvider;
import java.util.ArrayList;
import java.util.List;


/**
 * Utility class to help on queue related tasks.
 */
public class QueueHelper {
    private static final String TAG = LogHelper.makeLogTag(QueueHelper.class);
//
//    private static List<MediaSession.QueueItem> convertToQueue(
//            Iterable<MediaMetadata> tracks, String... categories) {
//        List<MediaSession.QueueItem> queue = new ArrayList<>();
//        int count = 0;
//        for (MediaMetadata track : tracks) {
//
//            // We create a hierarchy-aware mediaID, so we know what the queue is about by looking
//            // at the QueueItem media IDs.
//            String hierarchyAwareMediaID = MediaIDHelper.createMediaID(track.getDescription().getMediaId(), categories);
//
//            MediaMetadata trackCopy = new MediaMetadata.Builder(track)
//                    .putString(MediaMetadata.METADATA_KEY_MEDIA_ID, hierarchyAwareMediaID)
//                    .build();
//
//            // We don't expect queues to change after created, so we use the item index as the
//            // queueId. Any other number unique in the queue would work.
//            MediaSession.QueueItem item = new MediaSession.QueueItem(
//                    trackCopy.getDescription(), count++);
//            queue.add(item);
//        }
//        return queue;
//    }

    /**
     * Create a random queue.
     *
     * @param musicProvider the provider used for fetching music.
     * @return list containing {@link MediaSession.QueueItem}'s
     */
    public static List<MediaSession.QueueItem> getRandomQueue(MusicProvider musicProvider) {
        List<MediaMetadata> result = new ArrayList<>();

//        for (String genre: musicProvider.getGenres()) {
//            Iterable<MediaMetadata> tracks = musicProvider.getMusicsByGenre(genre);
//            for (MediaMetadata track: tracks) {
//                if (ThreadLocalRandom.current().nextBoolean()) {
//                    result.add(track);
//                }
//            }
//        }
//        LogHelper.d(TAG, "getRandomQueue: result.size=", result.size());
//
//        Collections.shuffle(result);

//        return convertToQueue(result, MEDIA_ID_MUSICS_BY_SEARCH, "random");
        return null;
    }

    public static boolean isIndexPlayable(int index, List<MediaSession.QueueItem> queue) {
        return (queue != null && index >= 0 && index < queue.size());
    }
}