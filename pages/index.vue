<script setup>
import { todoList, removeTodo, removeSubTodo } from '~/js/todo-list'

todoList.value.sort((a, b) => new Date(a.date) - new Date(b.date));


function formatDate(dateString) {
   const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
   const dateObj = new Date(dateString);
   const formattedDate = dateObj.toLocaleDateString('ru-RU', options);

   // Заменяем запятую на дефис и форматируем
   return formattedDate.replace(',', ' -').replace(/\//g, '.');
}
</script>

<template>
   <div>

      <h1 class="py-2 text-xl text-center">Список задач</h1>

      <div v-for="(todo, index) in todoList"
           :key="index">

         <div v-if="index == 0 || index != 0 && todo.date != todoList[index - 1].date"
              class="text-center"
              :class="{ 'mt-5': index !== 0 }">
            {{ formatDate(todo.date) }}
         </div>

         <div class="bg-green-400 rounded-md p-3 mt-3 text-green-900">

            <div class="flex items-center justify-between">
               <div>
                  {{ todo.title }}
               </div>
               <div class="text-red-500"
                    @click="removeTodo(index)">
                  <IconTrash></IconTrash>
               </div>
            </div>

         </div>

         <div class="mt-1 rounded-md space-y-3 text-sm p-3 bg-blue-300"
              v-if="todo.subTodoList.length > 0">
            <div v-for="(subTodo, index) in todo.subTodoList" :key="index"
                 class=" flex items-center justify-between">
               <div>
                  {{ subTodo }}
               </div>
               <div class="text-red-500"
                    @click="removeSubTodo(todo, index)">
                  <IconTrash class="h-4"></IconTrash>
               </div>
            </div>
         </div>

      </div>

      <button class="fixed bottom-10 right-10 bg-green-500 active:bg-green-400 rounded-full p-3 text-white"
              @click="navigateTo('/add')">
         <IconPlus></IconPlus>
      </button>

   </div>
</template>

<style scoped></style>