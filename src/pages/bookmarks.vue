<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import { useAppStore } from '~/stores/app';
import { Photo } from '~/types';
import { Video } from '~/types/videos';

useSeoMeta({
    title: "Nuxt Gallery - Bookmarks",
})
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const tab = ref(route.query.tab ?? "photos");
const cols = ref(3);
const { width } = useWindowSize()
const bookData = ref({
    photos: new Set(),
    videos: new Set(),
} as { photos: Set<Photo[]>, videos: Set<Video[]> })

const bookmarks = computed(() => {
    return appStore.bookmarks
})


onMounted(() => {
    console.log("bookmarks Page Mounted", route.query)
    tab.value = route.query.tab ?? "photos";
    if (bookmarks.value) {
        const bookPhotos = bookmarks.value.photos;
        const bookVideos = bookmarks.value.videos;
        const newBooks = {
            photos: bookPhotos.length > 0? new Set(putDataInCols(bookPhotos, cols.value)) : new Set([]),
            videos: bookVideos.length > 0? new Set(putDataInCols(bookVideos, cols.value)) : new Set([])
        }
        console.log("newBooks", newBooks)
        bookData.value = newBooks;
    }
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


// change photos if bookData changes
watch([appStore, cols], (newVal) => {
    console.log("photo or video set changed", newVal);
    if (newVal) {
        if (!newVal[0]) return;
        const bookPhotos = newVal[0].bookmarks.photos;
        const bookVideos = newVal[0].bookmarks.videos;
        const newBooks = {
            photos: bookPhotos.length > 0? new Set(putDataInCols(bookPhotos, cols.value)) : new Set([]),
            videos: bookVideos.length > 0? new Set(putDataInCols(bookVideos, cols.value)) : new Set([])
        }
        console.log("newBooks", newBooks)
        bookData.value = newBooks;
    }
})
</script>

<template>
    <div class="flex w-full flex-col">
        <div class="flex flex-col lg:max-w-[1300px] mx-auto py-11 w-full gap-y-5">
            <div class="flex flex-row max--[500px] mx-auto">
                <RouterLink :to="{ query: { tab: 'photos' } }" class="flex-1">
                    <div class="flex flex-row items-center justify-center py-2 px-4 rounded-md cursor-pointer"
                        :class="{ 'bg-gray-100': tab === 'photos' }">
                        <span class="text-sm font-medium text-gray-500">Photos</span>
                    </div>
                </RouterLink>
                <RouterLink :to="{ query: { tab: 'videos' } }" class="flex-1">
                    <div class="flex flex-row items-center justify-center py-2 px-4 rounded-md cursor-pointer"
                        :class="{ 'bg-gray-100': tab === 'videos' }">
                        <span class="text-sm font-medium text-gray-500">Videos</span>
                    </div>
                </RouterLink>
            </div>
            <div class="flex flex-col w-full gap-y-5">
                <div v-if="tab === 'photos'" class="flex w-full gap-5">
                    <Photos :photos="bookData.photos" />
                </div>
                <div v-if="tab === 'videos'" class="flex w-full gap-5">
                    <Videos :videos="bookData.videos" />
                </div>
            </div>
            <!-- show no favs -->
            <div v-if="tab === 'photos' && bookData.photos.size === 0" class="flex flex-col items-center justify-center">
                <Icon name="mdi:heart" class="w-16 h-16 text-gray-300" />
                <span class="text-lg font-medium text-gray-500">No Bookmarks</span>
            </div>
            <div v-if="tab === 'videos' && bookData.videos.size === 0" class="flex flex-col items-center justify-center">
                <Icon name="mdi:bookmark" class="w-16 h-16 text-gray-300" />
                <span class="text-lg font-medium text-gray-500">No Bookmarks</span>
            </div>
        </div>
    </div>
</template>