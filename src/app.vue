<script setup lang="ts">
import { useAppStore } from './stores/app';
import NProgress from 'nprogress'

const appStore = useAppStore()
useSeoMeta({
  title: "Nuxt Gallery",
  description: "A simple Nuxt Photo & Video Gallery",
  ogImage: "/logo.jpeg",
})
const router = useRouter();

router.beforeResolve((to,from, next) => {
  if(to.name && (to.name  !== from.name)) {
    NProgress.start();
  }
  next();
})

router.afterEach(() => {
  NProgress.done()
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

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}
/* slide transition */
.slide-enter-from {
  opacity: 0;
  transform: translateX(50%);
}
.slide-leave-to {
  opacity: 1;
  transform: translateX(-100%);
}
</style>