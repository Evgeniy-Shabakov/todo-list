<script setup>
import { todoList, addTodo } from '~/js/todo-list'

const id = useRoute().params.id

const title = ref()
const date = ref(new Date().toISOString().split('T')[0]) //устанавливаем текущую дату
const imgIndex = ref(0)

const subTodoInput = ref()
const subTodoList = ref([])

let currentTodo

if (id != 'create') {
   currentTodo = todoList.value.find(todo => todo.id == id)

   if (currentTodo) {
      title.value = currentTodo.title
      date.value = currentTodo.date
      imgIndex.value = currentTodo.imgIndex
      subTodoList.value = currentTodo.subTodoList
   }
}

const taskInput = ref(null) // Создаем реф для textarea

onMounted(() => {
   if (id == 'create') taskInput.value.focus()
})

onBeforeUnmount(() => {
   if (currentTodo) {
      currentTodo.title = title.value
      currentTodo.date = date.value
      currentTodo.imgIndex = imgIndex.value

      localStorage.setItem('todo-list', JSON.stringify(todoList.value))
   }
})

function btnAddTodoHandler() {
   if (!title.value) return

   const todo = {
      id: Date.now(),
      title: title.value,
      date: date.value,
      imgIndex: imgIndex.value,
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

      <div class="mt-4 mb-14 flex flex-col gap-3">

         <textarea ref="taskInput"
                   class="bg-gray-100 border border-violet-500 rounded-md h-40 p-3"
                   v-model="title"
                   placeholder="Введите задачу" />

         <input type="date"
                v-model="date"
                class="bg-gray-100 border border-violet-500 rounded-md p-3 w-max">

         <div class="flex gap-2 flex-wrap">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 0 }"
                 @click="imgIndex = 0"
                 src="~/assets/images/todo-list-icon.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 1 }"
                 @click="imgIndex = 1"
                 src="~/assets/images/maney.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 2 }"
                 @click="imgIndex = 2"
                 src="~/assets/images/real-estate.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 3 }"
                 @click="imgIndex = 3"
                 src="~/assets/images/phone.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 4 }"
                 @click="imgIndex = 4"
                 src="~/assets/images/house.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 5 }"
                 @click="imgIndex = 5"
                 src="~/assets/images/soap_shamp.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 6 }"
                 @click="imgIndex = 6"
                 src="~/assets/images/washing.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 7 }"
                 @click="imgIndex = 7"
                 src="~/assets/images/broom.png">

            <img class="h-12 w-12 p-1"
                 :class="{ 'border border-violet-500 rounded-md': imgIndex === 8 }"
                 @click="imgIndex = 8"
                 src="~/assets/images/balloon.png">

         </div>


         <div class="flex items-center justify-between gap-2.5">
            <textarea class="bg-gray-100 border border-violet-500 rounded-md w-full p-3"
                      v-model="subTodoInput"
                      placeholder="Введите подзадачу" />

            <button class="bg-violet-600 p-3 rounded-full text-gray-100"
                    @click="addSubTodo">
               <IconPlus></IconPlus>
            </button>
         </div>

         <div class="space-y-2">
            <div v-for="(subTodo, index) in subTodoList"
                 class=" bg-violet-300 rounded-md p-2 flex items-center justify-between">

               <div>
                  {{ subTodo }}
               </div>
               <div @click="removeSubTodo(index)">
                  <IconXmark></IconXmark>
               </div>

            </div>
         </div>

      </div>

      <button class="fixed bottom-0 left-0 w-full p-3 bg-violet-600 text-white"
              @click="id == 'create' ? btnAddTodoHandler() : navigateTo('/')">
         {{ id == 'create' ? 'Добавить созданную задачу' : 'Сохранить' }}
      </button>

   </div>
</template>

<style scoped></style>