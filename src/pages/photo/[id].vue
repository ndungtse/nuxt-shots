<script lang="ts" setup>
definePageMeta({
    pageTransition: {
        name: "zoom",
        mode: "out-in"
    }
})
import { Photo } from '~/types';

const photo = ref<Photo | null>(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
    console.log("Photo Page Mounted", route.query)
    const photoId = route.params.id;
    if (photoId) {
        const photoData = await getPhoto(photoId.toString());
        if (photoData) {
            photo.value = photoData;
        } else {
            router.push({ name: "404" })
        }
    }
})

</script>

<template>
    <div class="flex flex-col w-full max-w-[1300px] mx-auto ">
        <div class="flex">
            <div class="flex w-full flex-col items-center justify-center">
                <div class="flex w-full ">
                    <button @click="router.back()"
                        class="flex p-2 rounded-md hover:text-black hover:dark:text-white duration-300">
                        <Icon name="mdi:arrow-left-thin" class="w-5 h-5" />
                    </button>
                </div>
                <div class=" w-full h-[90vh] mt-2 flex flex-col">
                    <img :src="photo?.src.original" class=" h-full object-contain" loading="lazy" :alt="photo?.photographer" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* zoom page transition */
.zoom-enter-active {
    animation: zoom-in 0.5s ease-out;
}

.zoom-leave-active {
    animation: zoom-out 0.5s ease-out;
}

@keyframes zoom-in {
    0% {
        opacity: 0;
        transform: scale(0.2);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes zoom-out {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(0.2);
    }
}
</style>