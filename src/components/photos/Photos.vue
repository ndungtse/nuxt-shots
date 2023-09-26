<script setup lang="ts">
import { PhotosResponse } from '~/types';

const props = defineProps({
    // set of photos
    photos: {
        type: Set<PhotosResponse['photos']>,
        required: true,
    }
})
console.log('photos', props.photos);

</script>

<template>
    <div>
        <div class="flex lg:max-w-[1300px] mx-auto py-11 w-full gap-x-5">
            <div v-for="colPhotos in photos" :key="Math.random()" class="flex flex-col w-full gap-y-5 max-w-[500px]">
               <PhotosPhotoCard v-for="photo in colPhotos" :key="photo?.id??Math.random()" :photo="photo" />
            </div>
        </div>
    </div>
</template>