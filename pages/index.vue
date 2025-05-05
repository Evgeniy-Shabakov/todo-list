<script setup>
import { todoList, removeTodo, removeSubTodo, upTodo, downTodo } from '~/js/todo-list'
import { formatDate, isToday, isTomorrow, isPaste } from '~/js/date-helper'

</script>

<template>
   <div>
      
      <div class="mb-14">
         <div v-for="(todo, index) in todoList"
              :key="todo.id"
              :class="{ 'opacity-70': isPaste(todo.date) }">

            <div v-if="index == 0 || index != 0 && todo.date != todoList[index - 1].date"
                 class="text-center"
                 :class="{ 'mt-5': index !== 0 }">
               <div v-if="isPaste(todo.date)">Просроченные</div>
               <div v-else-if="isToday(todo.date)">Сегодня</div>
               <div v-else-if="isTomorrow(todo.date)">Завтра</div>
               <div class="text-xs">{{ formatDate(todo.date) }}</div>
            </div>

            <div class="bg-green-500 rounded-md p-3 mt-3 text-green-900"
                 @click="navigateTo(`/${todo.id}`)">

               <div class="flex items-center justify-between">
                  <div>
                     {{ todo.title }}
                  </div>
                  <div class="flex gap-1">
                     <IconArrowDown class="text-violet-500"
                                    @click.stop="downTodo(index)" />
                     <IconArrowUp class="text-violet-500 mr-2.5"
                                  @click.stop="upTodo(index)" />
                     <IconTrash class="text-red-500"
                                @click.stop="removeTodo(index)" />
                  </div>

               </div>

            </div>

            <div class="mt-0.5 rounded-md space-y-3 text-sm p-3 bg-violet-300"
                 v-if="todo.subTodoList.length > 0">
               <div v-for="(subTodo, index) in todo.subTodoList"
                    :key="index"
                    class=" flex items-center justify-between">
                  <div>
                     {{ subTodo }}
                  </div>
                  <div @click.stop="removeSubTodo(todo, index)">
                     <IconXmark class="h-4"></IconXmark>
                  </div>
               </div>
            </div>

         </div>
      </div>

      <button class="fixed bottom-0 left-0 w-full p-3 bg-violet-600 text-white"
              @click="navigateTo('/create')">
         Добавить новую задачу
      </button>

   </div>
</template>

<style scoped></style>