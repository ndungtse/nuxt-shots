<script lang="ts" setup>
const navs = ref<string[]>(["home", "about", "contact", "gallery"]);
</script>

<template>
    <nav class="lg:w-11/12 2xl:w-4/5 w-full md:px-6 2xl:px-0 py-2 mx-auto h-16 hidden sm:flex items-center justify-between">
        <RouterLink
          to="/"
          class="2xl:ml-6 hover:text-blue-700 hover:dark:text-blue-500 transition-colors duration-300"
        >
          <img
            src="/logo.jpeg"
            alt="logo"
            class="rounded-full h-10 w-10 object-cover"
          />
        </RouterLink>

        <ul
          class="flex items-center border px-4 rounded-full shadow-sm h-full gap-8 dark:border-gray-700 dark:bg-grey-900 dark:bg-opacity-40"
        >
            <li v-for="e in navs" :key="e" class="h-full flex items-center">
              <RouterLink
                class="hover:text-blue-700 hover:dark:text-blue-500 transition-colors capitalize text-sm cursor-pointer"
                :to="`/${e}`"
              >
                {{ e }}
              </RouterLink>
            </li>
        </ul>
        <div class=""></div>
      </nav>
</template>