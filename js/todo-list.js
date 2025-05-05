export const todoList = ref([])
export const todoListCompleted = ref([])

watchEffect(() => {
   todoList.value.sort((a, b) => new Date(a.date) - new Date(b.date))
})

export function addTodo(todo) {
   todoList.value.push(todo)
   localStorage.setItem('todo-list', JSON.stringify(todoList.value))
}

export function removeTodo(index) {
   if (index >= 0 && index < todoList.value.length) {
      const completedTodo = todoList.value.splice(index, 1)[0];
      todoListCompleted.value.push(completedTodo);

      // Сохраняем обновлённые массивы в localStorage
      localStorage.setItem('todo-list', JSON.stringify(todoList.value))
      localStorage.setItem('todo-list-completed', JSON.stringify(todoListCompleted.value))
   }
}

export function removeSubTodo(todo, index) {
   if (index >= 0 && index < todo.subTodoList.length) {
      todo.subTodoList.splice(index, 1)
      localStorage.setItem('todo-list', JSON.stringify(todoList.value))
   }
}

export function restoreTodo(index) {
   if (index >= 0 && index < todoListCompleted.value.length) {
      const restoredTodo = todoListCompleted.value.splice(index, 1)[0];
      todoList.value.push(restoredTodo);

      // Сохраняем обновлённые массивы в localStorage
      localStorage.setItem('todo-list', JSON.stringify(todoList.value))
      localStorage.setItem('todo-list-completed', JSON.stringify(todoListCompleted.value))
   }
}

export function upTodo(index) {
   if (index > 0 && index < todoList.value.length) {
      const currentItem = todoList.value[index]

      todoList.value[index] = todoList.value[index - 1]
      todoList.value[index - 1] = currentItem
   }
}

export function downTodo(index) {
   if (index >= 0 && index < todoList.value.length - 1) {
      const currentItem = todoList.value[index]

      todoList.value[index] = todoList.value[index + 1]
      todoList.value[index + 1] = currentItem
   }
}

export function initialize() {
   if (localStorage.getItem('todo-list')) {
      todoList.value = JSON.parse(localStorage.getItem('todo-list'))
   }

   if (localStorage.getItem('todo-list-completed')) {
      todoListCompleted.value = JSON.parse(localStorage.getItem('todo-list-completed'))

      if (todoListCompleted.value.length > 50) {
         todoListCompleted.value.splice(0, todoListCompleted.value.length - 50)

         localStorage.setItem('todo-list-completed', JSON.stringify(todoListCompleted.value))
      }
   }

}