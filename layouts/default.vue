<script setup>
import { initialize } from '~/js/todo-list';

initialize()
</script>

<template>
   <div class="px-3 py-2 bg-gray-200 min-h-dvh">
      
      <slot></slot>

   </div>
</template>

<style scoped></style>