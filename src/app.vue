<script setup lang="ts">
import { useAppStore } from './stores/app';

const appStore = useAppStore()
useSeoMeta({
  title: "Nuxt Gallery",
  description: "A simple Nuxt Photo & Video Gallery",
  ogImage: "/logo.jpeg",
})

onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  appStore.loadBookmarks()
  appStore.loadFavorites()
})
</script>

<template>
  <div class="flex bg-white dark:bg-slate-900 flex-col w-full min-h-screen">
    <NavBar />
    <NuxtPage />
    <Footer />
  </div>
</template>
