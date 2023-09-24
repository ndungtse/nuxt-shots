<script lang="ts" setup>
import { Photo } from '~/types';

const isFullScreen = ref(false);

const props = defineProps({
    photo: {
        type: Object as PropType<Photo>,
        required: true
    }
})
const photo = ref<Photo>(props.photo)
</script>

<template>
    <div class="flex relative cursor-pointer flex-col w-full">
        <template v-if="photo !== undefined">
            <img :src="photo.src.original" loading="lazy" :alt="photo.photographer" />
        </template>
        <div
            class=" absolute text-black top-0 opacity-0 flex flex-col justify-between sm:p-4 p-2 bottom-0 right-0 left-0 duration-300 hover:opacity-100 bg-gradient-to-b from-black/30 via-black/0 to-black/30">
            <!-- clickable div -->
            <div class=" absolute top-0 left-0 bottom-0 right-0" @click="isFullScreen = true"></div>
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
    <!-- fullscreen modal -->
    <div v-if="isFullScreen" class="fixed top-0 p-6 left-0 bottom-0 overflow-y-auto right-0 bg-black/80 z-50">
        <div class="flex">
            <div class="flex w-full flex-col items-center justify-center">
                <div class="flex w-full fixed top-0 left-0 justify-end">
                    <button @click="isFullScreen = false"
                        class="flex p-2 rounded-md bg-white dark:bg-black hover:text-black hover:dark:text-white duration-300">
                        <Icon name="mdi:close" class="w-5 h-5" />
                    </button>
                </div>
                <img :src="photo.src.original" class=" w-full mt-2" loading="lazy" :alt="photo.photographer" />
            </div>
        </div>
    </div>
</template>