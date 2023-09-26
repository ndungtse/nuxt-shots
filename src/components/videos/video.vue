<script setup lang="ts">
import { useAppStore } from '~/stores/app';
import { Video } from '~/types/videos';
const appStore = useAppStore();
const isFullScreen = ref(false);
const isOnFavorites = computed(() => {
    return appStore.favorites.videos.some((video) => video?.id === props.video?.id);
});
const isBookmarked = computed(() => {
    return appStore.bookmarks.videos.some((video) => video?.id === props.video?.id);
});

const props = defineProps({
    video: {
        type: Object as PropType<Video>,
        required: true,
    }
})

const video = ref<Video>(props.video)
</script>

<template>
    <div class="flex relative cursor-pointer flex-col w-full">
        <template v-if="video !== undefined">
            <img :src="video.image" loading="lazy" :alt="video.user.name" />
        </template>
        <div
            class=" absolute text-black top-0 opacity-0 flex flex-col justify-between sm:p-4 p-2 bottom-0 right-0 left-0 duration-300 hover:opacity-100 bg-gradient-to-b from-black/30 via-black/0 to-black/30">
            <!-- clickable div -->
            <div class=" absolute top-0 left-0 bottom-0 right-0" @click="console.log('div')"></div>
            <div class="flex items-center gap-x-2 justify-end">
                <button @click="appStore.toggleBookmarkVideo(video)"
                    class="flex sm:p-2 z-10 p-1 bg-white hover:bg-stone-300 duration-300 rounded-md">
                    <Icon v-if="isBookmarked" name="mdi:bookmark" class="w-5 h-5" />
                    <Icon v-else name="mdi:bookmark-outline" class="w-5 h-5" />
                </button>
                <button class="flex sm:p-2 z-10 p-1 bg-white hover:bg-stone-300 duration-300 rounded-md"
                    @click="appStore.toggleFavoriteVideo(video)">
                    <Icon v-if="isOnFavorites" name="mdi:heart" class="w-5 h-5"
                        :class="{ 'text-red-600': isOnFavorites }" />
                    <Icon v-else name="mdi:heart-outline" class="w-5 h-5" />
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
</template>