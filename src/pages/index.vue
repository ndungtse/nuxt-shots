<script setup lang="ts">
import { PhotosResponse, VideoResponse } from '~/types';
// import { VideoResponse } from '@/types/';
import { searchPhotos } from '~/utils/api';

useSeoMeta({
    title: "Nuxt Gallery",
})
const photosData = ref<PhotosResponse | null>(null)
const videosData = ref<VideoResponse | null>(null)

const runtimeConfig = useRuntimeConfig()

onMounted(async () => {
    console.log("Home Page Mounted", runtimeConfig.public.API_KEY)
    const photos = await searchPhotos("nature");
    console.log(photos)
    photosData.value = photos;
    const popularVid = await getCuratedVideos();
    console.log(popularVid)
    videosData.value = popularVid;
})

</script>

<template>
    <div>
        <h1>Home Page</h1>
        <!-- map photos -->
        <div class="grid grid-cols-3 gap-4">
            <div v-for="photo in photosData?.photos" :key="photo.id">
                <img :src="photo.src.medium" />
            </div>
        </div>
    </div>
</template>