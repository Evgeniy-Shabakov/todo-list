
export function formatDate(dateString) {
   const options = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
   const dateObj = new Date(dateString);
   const formattedDate = dateObj.toLocaleDateString('ru-RU', options);

   // Заменяем запятую на дефис и форматируем
   return formattedDate.replace(',', ' -').replace(/\//g, '.');
}

export function isToday(dateString) {
   const today = new Date();
   const dateToCheck = new Date(dateString);
   
   return today.getFullYear() === dateToCheck.getFullYear() &&
          today.getMonth() === dateToCheck.getMonth() &&
          today.getDate() === dateToCheck.getDate();
}

export function isTomorrow(dateString) {
   const today = new Date();
   const tomorrow = new Date(today);
   tomorrow.setDate(today.getDate() + 1);
   const dateToCheck = new Date(dateString);
   
   return tomorrow.getFullYear() === dateToCheck.getFullYear() &&
          tomorrow.getMonth() === dateToCheck.getMonth() &&
          tomorrow.getDate() === dateToCheck.getDate();
}

export function isPaste(dateString) {
   const today = new Date();
    const dateToCheck = new Date(dateString);
    
    // Сравниваем только дату (без учета времени)
    today.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00:00
    dateToCheck.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00:00
    
    return dateToCheck < today; // Возвращает true, если дата меньше сегодняшней
}