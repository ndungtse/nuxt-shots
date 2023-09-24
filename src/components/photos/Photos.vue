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
            <div v-for="colPhotos in photos" class="flex flex-col w-full gap-y-5">
               <PhotosPhotoCard v-for="photo in colPhotos" :key="photo?.id" :photo="photo" />
            </div>
        </div>
    </div>
</template>