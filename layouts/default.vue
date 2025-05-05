<script setup>
import { initialize } from '~/js/todo-list';

const route = useRoute()

const pageTitle = computed(() => {
   if (route.path == '/') return 'Текущие задачи'
   else if (route.path.includes('completed')) return 'Завершенные задачи'
   else if (route.path.includes('create')) return 'Добавление задачи'
   return 'Редактирование задачи'
})

initialize()
</script>

<template>
   <div class="px-3 py-2 bg-gray-200 min-h-dvh">

      <div class="flex items-center gap-1 text-violet-600">
         <BurgerMenu class="z-100" />
         <h1>{{ pageTitle }}</h1>
      </div>

      <slot></slot>

   </div>
</template>
