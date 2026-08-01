// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
   compatibilityDate: '2024-11-01',
   devtools: { enabled: false },
   ssr: false,
   css: ['~/assets/css/main.css'],
   vite: {
      plugins: [
         tailwindcss(),
      ],
   },
   app: {
      baseURL: '/todo-list/',
      head: {
         title: 'Todo List',
         link: [
            { rel: 'manifest', href: 'manifest.webmanifest' }
         ]
      }
   },
})
