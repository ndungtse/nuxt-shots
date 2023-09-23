<script setup lang="ts">
import { PhotosResponse, VideoResponse } from '~/types';
// import { VideoResponse } from '@/types/';
import { searchPhotos } from '~/utils/api';
import { putDataInCols } from '~/utils/funcs';
import { useWindowSize } from '@vueuse/core'
const { width, height } = useWindowSize()

useSeoMeta({
    title: "Nuxt Gallery - Photos",
})

// props
const props = defineProps({
    category: {
        type: String,
    }
})

// state
const photosData = ref<PhotosResponse | null>(null)
const videosData = ref<VideoResponse[] | null>(null)
const photos = ref<Set<PhotosResponse['photos']>>(new Set())
const page = ref(1);
const cols = ref(3);

const runtimeConfig = useRuntimeConfig()

const getPhotos = async () => {
    const photos = await searchPhotos(props.category ?? "popular", { per_page: 20, page: page.value });
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

watch([photosData, cols], (newVal) => {
    if (newVal) {
        console.log("photosData changed", newVal);
        if (!newVal[0]?.photos) return;
        photos.value = new Set(putDataInCols(newVal[0]?.photos, cols.value));

    }
})

// change cols if screen size changes
watch(width, (newVal) => {
    if (newVal < 350) {
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
            <div v-for="colPhotos in photos" class="flex flex-col w-full gap-y-5">
                <div v-for="photo in colPhotos" class="flex relative cursor-pointer flex-col w-full">
                    <template v-if="photo !== undefined">
                        <img :src="photo.src.original" loading="lazy" :alt="photo.photographer" />
                    </template>
                    <div
                        class=" absolute text-black top-0 opacity-0 flex flex-col justify-between sm:p-4 p-2 bottom-0 right-0 left-0 duration-300 hover:opacity-100 bg-gradient-to-b from-black/30 via-black/0 to-black/30">
                        <!-- clickable div -->
                        <div class=" absolute top-0 left-0 bottom-0 right-0" @click="console.log('div')"></div>
                        <div class="flex items-center gap-x-2 justify-end">
                            <button @click="console.log('buton')"
                                class="flex sm:p-2 z-10 p-1 bg-white hover:bg-stone-300 duration-300 rounded-md">
                                <Icon name="mdi:bookmark" class="w-5 h-5" />
                            </button>
                            <button class="flex sm:p-2 z-10 p-1 bg-white hover:bg-stone-300 duration-300 rounded-md">
                                <Icon name="mdi:heart" class="w-5 h-5" />
                            </button>
                        </div>
                        <div class="flex items-center gap-x-2 justify-end">
                            <button class="flex sm:p-2 z-10 p-1 bg-white hover:bg-stone-300 duration-300 rounded-md">
                                <Icon name="mdi:fullscreen" class="w-5 h-5" />
                            </button>
                            <button class="flex sm:p-2 z-10 p-1 bg-white hover:bg-stone-300 duration-300 rounded-md">
                                <Icon name="mdi:download" class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>