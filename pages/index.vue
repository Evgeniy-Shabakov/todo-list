<script setup>
import { todoList, removeTodo, removeSubTodo, upTodo, downTodo } from '~/js/todo-list'
import { formatDate, isToday, isTomorrow, isPaste } from '~/js/date-helper'
import { imagesForIcons } from '~/js/images-helper'

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

               <div class="flex items-center gap-2">

                  <img v-if="todo.imgIndex === 1"
                       class="h-6 w-6"
                       src="~/assets/images/img_1.png">

                  <img v-else-if="todo.imgIndex === 2"
                       class="h-6 w-6"
                       src="~/assets/images/img_2.png">

                  <img v-else-if="todo.imgIndex === 3"
                       class="h-6 w-6"
                       src="~/assets/images/img_3.png">

                  <img v-else-if="todo.imgIndex === 4"
                       class="h-6 w-6"
                       src="~/assets/images/img_4.png">

                  <img v-else-if="todo.imgIndex === 5"
                       class="h-6 w-6"
                       src="~/assets/images/img_5.png">

                  <img v-else-if="todo.imgIndex === 6"
                       class="h-6 w-6"
                       src="~/assets/images/img_6.png">

                  <img v-else-if="todo.imgIndex === 7"
                       class="h-6 w-6"
                       src="~/assets/images/img_7.png">

                  <img v-else-if="todo.imgIndex === 8"
                       class="h-6 w-6"
                       src="~/assets/images/img_8.png">

                  <img v-else-if="todo.imgIndex === 9"
                       class="h-6 w-6"
                       src="~/assets/images/img_9.png">

                  <img v-else-if="todo.imgIndex === 10"
                       class="h-6 w-6"
                       src="~/assets/images/img_10.png">

                  <img v-else-if="todo.imgIndex === 11"
                       class="h-6 w-6"
                       src="~/assets/images/img_11.png">

                  <img v-else-if="todo.imgIndex === 12"
                       class="h-6 w-6"
                       src="~/assets/images/img_12.png">

                  <img v-else-if="todo.imgIndex === 13"
                       class="h-6 w-6"
                       src="~/assets/images/img_13.png">

                  <img v-else-if="todo.imgIndex === 14"
                       class="h-6 w-6"
                       src="~/assets/images/img_14.png">

                  <img v-else-if="todo.imgIndex === 15"
                       class="h-6 w-6"
                       src="~/assets/images/img_15.png">

                  <img v-else-if="todo.imgIndex === 16"
                       class="h-6 w-6"
                       src="~/assets/images/img_16.png">

                  <img v-else-if="todo.imgIndex === 17"
                       class="h-6 w-6"
                       src="~/assets/images/img_17.png">

                  <img v-else-if="todo.imgIndex === 18"
                       class="h-6 w-6"
                       src="~/assets/images/img_18.png">

                  <img v-else
                       class="h-6 w-6"
                       src="~/assets/images/img_0.png">

                  <div>
                     {{ todo.title }}
                  </div>
                  <div class="flex gap-1 ml-auto">
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