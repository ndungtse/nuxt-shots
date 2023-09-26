<script setup lang="ts">
const showModalPage = ref(false);
const router = useRouter();

router.beforeEach((to, from, next) =>{
  if (to.name === "photo-id") {
    showModalPage.value = true;
  } else {
    next();
  }
})
</script>

<template>
    <div class="flex w-full flex-col">
        <slot />
        <ModalPage v-if="showModalPage" @close="showModalPage = false" />
    </div>
</template>
  