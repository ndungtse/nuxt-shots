<script setup lang="ts">
import { VideoResponse } from '~/types';
// import { VideoResponse } from '@/types/';
import { putDataInCols } from '~/utils/funcs';
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

useSeoMeta({
    title: "Nuxt Gallery - videos",
})

// props
const props = defineProps({
    category: {
        type: String,
    }
})

// state
const videosData = ref<VideoResponse | null>(null)
const videos = ref<Set<VideoResponse['videos']>>(new Set())
const page = ref(1);
const cols = ref(3);

const runtimeConfig = useRuntimeConfig()

const getVideos = async () => {
    const videos = await getCuratedVideos({ per_page: 20, page: page.value });
    console.log(videos)
    videosData.value = { ...videos, videos: [...videosData.value?.videos ?? [], ...videos.videos] };
}

onMounted(() => {
    console.log("Home Page Mounted", runtimeConfig.public.API_KEY)
    getVideos();
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
        await getVideos();
        console.log(videos)
        page.value++;
    }
}

watch([videosData, cols], (newVal) => {
    if (newVal) {
        console.log("videosData changed", newVal);
        if (!newVal[0]?.videos) return;
        videos.value = new Set(putDataInCols(newVal[0]?.videos, cols.value));

    }
})

// change cols if screen size changes
watch(width, (newVal) => {
    if (newVal < 300) {
        cols.value = 1;
    } else if (newVal < 768) {
        cols.value = 2;
    } else if (newVal < 1792) {
        cols.value = 3;
    } else {
        cols.value = 5;
    }
})
</script>
<template>
     <div>
        <div class="flex lg:max-w-[1300px] mx-auto py-11 w-full gap-x-5">
            <div v-for="colVideos in videos" class="flex flex-col w-full gap-y-5">
                <div v-for="video in colVideos" class="flex cursor-pointer flex-col w-full">
                    <template v-if="video !== undefined">
                        <img :src="video.image" loading="lazy" :alt="video.user.name" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>