<script setup lang="ts">
import { PhotosResponse, VideoResponse } from '~/types';
// import { VideoResponse } from '@/types/';
import { searchPhotos } from '~/utils/api';
import { transformTo2DArrayWithEqualRows } from '~/utils/funcs';

useSeoMeta({
    title: "Nuxt Gallery",
})
const photosData = ref<PhotosResponse | null>(null)
const videosData = ref<VideoResponse[] | null>(null)
const photos = ref<Set<PhotosResponse['photos']>>(new Set())
const page = ref(1);

const runtimeConfig = useRuntimeConfig()

const getPhotos = async () => {
    const photos = await searchPhotos("nature", { per_page: 10, page: page.value });
    console.log(photos)
    photosData.value = { ...photos, photos: [...photosData.value?.photos ?? [], ...photos.photos] };
}

onMounted(() => {
    console.log("Home Page Mounted", runtimeConfig.public.API_KEY)
    getPhotos();
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    }
})

async function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Detect if the user has scrolled to the bottom
    if (scrollY + windowHeight >= documentHeight) {
        console.log("bottom", page.value);
        // if (page.value ÷÷)
        await getPhotos();
        console.log(photos)
        page.value++;
    }
}

watch(photosData, (newVal) => {
    if (newVal) {
        // photos.value = transformTo2DArrayWithEqualRows(newVal.photos, 4);
        photos.value = new Set(transformTo2DArrayWithEqualRows(newVal.photos, 4*page.value));

    }
})
</script>

<template>
    <div>
        <NavBar />
        <!-- map photos -->
        <div class="flex lg:max-w-[1100px] mx-auto py-11 w-full gap-x-5">
            <div v-for="colPhotos in photos" class="flex flex-col w-full gap-y-5">
                <div v-for="photo in colPhotos" class="flex cursor-pointer flex-col w-full">
                    <img :src="photo.src.medium" loading="lazy" :alt="photo.photographer" />
                    <!-- <div class="flex flex-col w-full gap-y-[2%]">
                        <span>{{ photo.photographer }}</span>
                        <span>{{ photo.photographer_url }}</span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>