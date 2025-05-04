export const todoList = ref([])

export function addTodo(todo){
   todoList.value.push(todo)
   localStorage.setItem('todo-list', JSON.stringify(todoList.value))
}

export function removeTodo(index){
   if (index >= 0 && index < todoList.value.length) {
      todoList.value.splice(index, 1)
      localStorage.setItem('todo-list', JSON.stringify(todoList.value))
   }
}

export function removeSubTodo(todo, index){
   if (index >= 0 && index < todo.subTodoList.length) {
      todo.subTodoList.splice(index, 1)
      localStorage.setItem('todo-list', JSON.stringify(todoList.value))
   }
}

export function initialize(){
   if (localStorage.getItem('todo-list') == null) return

   todoList.value = JSON.parse(localStorage.getItem('todo-list'))
}