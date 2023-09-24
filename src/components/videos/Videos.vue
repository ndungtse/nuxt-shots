<script setup lang="ts">
import { Video as VideoType } from '~/types/videos';
import Video from './video.vue';

const props = defineProps({
    // set of photos
    videos: {
        type: Set<VideoType[]>,
        required: true,
    }
})
</script>
<template>
    <div v-for="colVideos in videos" class="flex flex-col w-full gap-y-5">
        <Video v-for="video in colVideos" :key="video?.id" :video="video" />
    </div>
</template>