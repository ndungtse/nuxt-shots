<!-- <script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import { useAppStore } from '~/stores/app';
import { Photo } from '~/types';
import { Video } from '~/types/videos';

useSeoMeta({
    title: "Nuxt Gallery - Favorites",
})
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const tab = ref(route.query.tab ?? "photos");
const cols = ref(3);
const { width } = useWindowSize()
const favData = ref({
    photos: new Set(),
    videos: new Set(),
} as { photos: Set<Photo[]>, videos: Set<Video[]> })

const favorites = computed(() => {
    return appStore.favorites
})


onMounted(() => {
    console.log("Favorites Page Mounted", route.query)
    tab.value = route.query.tab ?? "photos";
})

// change tab value when route changes
watch(router.currentRoute, (newVal) => {
    console.log("route changed", newVal)
    tab.value = newVal.query.tab ?? "photos";
})

// change cols if screen size changes
watch(width, (newVal) => {
    console.log("width changed", newVal)
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


// change photos if favData changes
watch([favorites, cols], (newVal) => {
    console.log("photo or video set changed", newVal);
    if (newVal) {
        if (!newVal[0]) return;
        const newFavs = {
            photos: new Set(putDataInCols(favorites.value.photos, cols.value)),
            videos: new Set(putDataInCols(favorites.value.videos, cols.value))
        }
        console.log("newFavs", newFavs)
        favData.value = newFavs;

    }
})
</script> -->

<template>
    <div class="flex w-full flex-col">
        <!-- <div class="flex flex-col lg:max-w-[1300px] mx-auto py-11 w-full gap-y-5">
            <div class="flex flex-row max--[500px] mx-auto">
                <RouterLink :to="{ query: { tab: 'photos' } }" class="flex-1">
                    <div class="flex flex-row items-center justify-center py-2 px-4 rounded-md cursor-pointer"
                        :class="{ 'bg-gray-100': tab === 'photos' }">
                        <span class="text-sm font-medium text-gray-500">Photos</span>
                    </div>
                </RouterLink>
                <RouterLink :to="{ query: { tab: 'videos' } }" class="flex-1">
                    <div class="flex flex-row items-center justify-center py-2 px-4 rounded-md cursor-pointer"
                        :class="{'bg-gray-100': tab === 'videos' }">
                        <span class="text-sm font-medium text-gray-500">Videos</span>
                    </div>
                </RouterLink>
            </div>
            <div class="flex flex-col w-full gap-y-5">
                <div v-if="tab === 'photos'" class="flex">
                    <Photos :photos="favData.photos" />
                </div>
                <div v-if="tab === 'videos'">
                    <Videos :videos="favData.videos" />
                </div>
            </div>

        </div> -->
    </div>
</template>