export const todoList = ref([])
export const todoListCompleted = ref([])
export const templateList = ref([])
export const currentTemplate = ref()

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

   if (localStorage.getItem('template-list')) {
      templateList.value = JSON.parse(localStorage.getItem('template-list'))
   }

}

export function doBackup() {
   const now = new Date();

   // Форматируем компоненты даты по отдельности
   const day = String(now.getDate()).padStart(2, '0');
   const month = String(now.getMonth() + 1).padStart(2, '0');
   const year = now.getFullYear();
   const hours = String(now.getHours()).padStart(2, '0');
   const minutes = String(now.getMinutes()).padStart(2, '0');

   const dateTimeString = `${day}.${month}.${year}-${hours}-${minutes}`;

   // Создаем данные для скачивания
   const data = JSON.stringify(todoList.value, null, 2);
   const blob = new Blob([data], { type: 'application/json' });
   const url = URL.createObjectURL(blob);

   // Создаем и запускаем скачивание
   const a = document.createElement('a');
   a.href = url;
   a.download = `${dateTimeString}-todo_backup.json`;
   a.click();

   // Очищаем память
   URL.revokeObjectURL(url);
}

export function loadBackup() {
   // Создаем input элемент для выбора файла
   const input = document.createElement('input');
   input.type = 'file';
   input.accept = '.json'; // Только JSON файлы

   // Обработчик выбора файла
   input.onchange = (event) => {
      const file = (event.target).files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
         try {
            const content = e.target?.result;
            const parsedData = JSON.parse(content);

            // Валидация данных (проверяем, что это массив)
            if (Array.isArray(parsedData)) {
               todoList.value = parsedData;
               localStorage.setItem('todo-list', JSON.stringify(todoList.value))
               console.log('Данные успешно загружены!');
               // Можно добавить уведомление об успехе
            } else {
               throw new Error('Неверный формат данных');
            }
         } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            alert('Ошибка: файл поврежден или имеет неверный формат');
         }
      };

      reader.readAsText(file);
   };

   // Запускаем выбор файла
   input.click();
}