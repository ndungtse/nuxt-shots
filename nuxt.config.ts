// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-icon', '@pinia/nuxt'],
  css: ['@/assets/css/main.css','nprogress/nprogress.css'],
  srcDir: 'src/',
  devServer: {
    port: 5252,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_KEY: process.env.NUXT_PUBLIC_API_KEY,
    },
  },
})
