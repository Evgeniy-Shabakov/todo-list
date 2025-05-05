<script setup>

const burgerMenuIsOpen = ref(false)

function toggleBurgerMenu() {
   if (burgerMenuIsOpen.value) closeBurgerMenu()
   else activateBurgerMenu()
}

function activateBurgerMenu() {
   if (burgerMenuIsOpen.value) return

   burgerMenuIsOpen.value = true

   document.addEventListener('click', closeBurgerMenu)
   document.addEventListener('scroll', closeBurgerMenu)
}

function closeBurgerMenu() {
   burgerMenuIsOpen.value = false
   document.removeEventListener('click', closeBurgerMenu)
   document.removeEventListener('scroll', closeBurgerMenu)
}
</script>

<template>
   <div class="w-7 h-7">

      <button @click="toggleBurgerMenu"
              @click.stop>
         <IconXmark v-if="burgerMenuIsOpen"
                    class="w-7 h-7" />
         <IconBurgerMenu v-else
                         class="w-7 h-7" />

      </button>

      <div v-if="burgerMenuIsOpen"
           class="fixed top-10 p-2 bg-violet-400 rounded-md"
           @click.stop>

         <div class="flex flex-col gap-2 p-1 text-gray-900">

            <NuxtLink @click="navigateTo('/'); burgerMenuIsOpen = false">
               Текущие задачи
            </NuxtLink>
            <NuxtLink @click="navigateTo('/completed'); burgerMenuIsOpen = false">
               Выполненные задачи
            </NuxtLink>

         </div>

      </div>
   </div>

</template>
