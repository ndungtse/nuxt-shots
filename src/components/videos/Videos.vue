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
    <div v-for="colVideos in videos" :key="Math.random()" class="flex flex-col w-full gap-y-5 max-w-[500px]">
        <Video v-for="video in colVideos" :key="video?.id ?? Math.random()" :video="video" />
    </div>
</template>