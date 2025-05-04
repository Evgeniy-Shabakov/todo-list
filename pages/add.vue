<script setup>
import { todoList, removeTodo, addTodo } from '~/js/todo-list'

const title = ref()
const date = ref(new Date().toISOString().split('T')[0]) //устанавливаем текущую дату

const subTodoInput = ref()
const subTodoList = ref([])

const taskInput = ref(null); // Создаем реф для textarea

onMounted(() => {
   taskInput.value.focus(); // Устанавливаем фокус на textarea
});

function btnAddTodoHandler() {
   if (!title.value) return

   const todo = {
      title: title.value,
      date: date.value,
      subTodoList: subTodoList.value
   }

   addTodo(todo)
   navigateTo('/')
}

function addSubTodo() {
   if (!subTodoInput.value) return
   subTodoList.value.push(subTodoInput.value)
   subTodoInput.value = null
}

function removeSubTodo(index) {
   if (index >= 0 && index < subTodoList.value.length) {
      subTodoList.value.splice(index, 1)
   }
}

</script>

<template>
   <div>
      <h1 class="py-2 text-xl text-center">Добавление задачи</h1>

      <div class="mt-2 flex flex-col gap-3">

         <textarea ref="taskInput"
                   class="bg-gray-100 border border-green-500 rounded-md h-40 p-3"
                   v-model="title"
                   placeholder="Введите задачу" />

         <input type="date"
                v-model="date"
                class="bg-gray-100 border border-green-500 rounded-md p-3 w-max">

         <div class="flex items-center justify-between gap-2.5">
            <textarea class="bg-gray-100 border border-green-500 rounded-md w-full p-3"
                      v-model="subTodoInput"
                      placeholder="Введите подзадачу" />

            <button class="bg-green-500 active:bg-green-400 p-3 rounded-full text-gray-100"
                    @click="addSubTodo">
               <IconPlus></IconPlus>
            </button>
         </div>




         <div class="space-y-2">
            <div v-for="(subTodo, index) in subTodoList"
                 class=" bg-green-300 rounded-md p-2 flex items-center justify-between">

               <div>
                  {{ subTodo }}
               </div>
               <div class="text-red-500"
                    @click="removeSubTodo(index)">
                  <IconTrash></IconTrash>
               </div>

            </div>
         </div>


      </div>

      <button class="fixed bottom-10 right-10 bg-green-500 active:bg-green-400 rounded-full p-3 text-white"
              @click="btnAddTodoHandler">
         <IconPlus></IconPlus>
      </button>

   </div>
</template>

<style scoped></style>