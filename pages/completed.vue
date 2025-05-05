<script setup>
import { todoListCompleted, restoreTodo } from '~/js/todo-list'
import { formatDate, isToday } from '~/js/date-helper'

</script>

<template>
   <div>

      <div class="mb-14">
         <div v-for="(todo, index) in todoListCompleted"
              :key="todo.id"
              class='opacity-80'>

            <div v-if="index == 0 || index != 0 && todo.date != todoListCompleted[index - 1].date"
                 class="text-center"
                 :class="{ 'mt-5': index !== 0 }">
               <div v-if="isToday(todo.date)">Сегодня</div>
               <div class="text-xs">{{ formatDate(todo.date) }}</div>
            </div>

            <div class="bg-green-500 rounded-md p-3 mt-3 text-green-900">

               <div class="
                 flex
                 items-center
                 justify-between">
               <div>
                  {{ todo.title }}
               </div>

               <IconTrashArrowUp class="text-violet-900 opacity-100"
                                 @click="restoreTodo(index)" />

            </div>

         </div>

         <div class="mt-0.5 rounded-md space-y-3 text-sm p-3 bg-violet-300"
              v-if="todo.subTodoList.length > 0">
            <div v-for="(subTodo, index) in todo.subTodoList"
                 :key="index">
               {{ subTodo }}
            </div>
         </div>

      </div>
   </div>

   <button class="fixed bottom-0 left-0 w-full p-3 bg-violet-600 text-white"
           @click="navigateTo('/')">
      Назад
   </button>

   </div>
</template>

<style scoped></style>