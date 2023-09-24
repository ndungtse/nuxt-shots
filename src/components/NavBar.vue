<script lang="ts" setup>
const navs = ref<{ name: string, path: string }[]>([{ name: "home", path: '/' },{ name: "photos", path: '/photos' }, { name: "videos", path: '/videos' }, { name: "favorites", path: '/favorites' }, { name: "bookmarks", path: '/bookmarks' }]);
const path = ref<string>('/');
const router = useRouter();

const changeTheme = () => {
  const html = document.querySelector('html');
  html?.classList.toggle('dark');
  // save to localStorage
  const isDark = html?.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

watch(() => router.currentRoute.value.path, (newVal) => {
  console.log('path', newVal);
  path.value = newVal;
})

onMounted(() => {
  path.value = router.currentRoute.value.path;
})

</script>

<template>
  <nav
    class="lg:w-11/12 text-gray-500 2xl:w-4/5 w-full md:px-6 2xl:px-0 py-2 mx-auto h-16 hidden sm:flex items-center justify-between">
    <RouterLink to="/" class="2xl:ml-6 hover:text-black hover:dark:text-white transition-colors duration-300">
      <img src="/logo.jpeg" alt="logo" class="rounded-full h-10 w-10 object-cover" />
    </RouterLink>

    <ul
      class="flex items-center border px-4 rounded-full shadow-sm h-full gap-8 dark:border-gray-700 dark:bg-grey-900 dark:bg-opacity-40">
      <li v-for="e in navs" :key="e.name" class="h-full flex items-center">
        <RouterLink class="hover:text-black hover:dark:text-white transition-colors capitalize text-sm cursor-pointer"
          :class="path === e.path ? 'text-black dark:text-white' : ''"
          :to="e.path">
          {{ e.name }}
        </RouterLink>
      </li>
    </ul>
    <div class="flex gap-x2 items-center">
      <!-- <button class="flex p-2 rounded-md hover:text-black hover:dark:text-white duration-300">
        <Icon name="mdi:bookmark" class="w-5 h-5" />
      </button>
      <button class="flex p-2 rounded-md hover:text-black hover:dark:text-white duration-300">
        <Icon name="mdi:heart" class="w-5 h-5" />
      </button> -->
      <label class="swap swap-rotate">
        <input type="checkbox" />
        <svg @click="changeTheme" class="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <svg @click="changeTheme" class="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
    </div>
  </nav>
</template>