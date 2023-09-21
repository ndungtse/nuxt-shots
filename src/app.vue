<script setup>

useSeoMeta({
  title: "Nuxt Gallery",
  description: "A simple Nuxt Photo & Video Gallery",
  ogImage: "/logo.jpeg",
})
</script>

<template>
  <div class="flex flex-col w-full min-h-screen">
    <NuxtPage />
    <Footer />
  </div>
</template>
