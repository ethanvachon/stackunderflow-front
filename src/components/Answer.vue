<template>
  <div class="bg-white rounded shadow my-3 card">
    <div class="flex justify-center border-bottom pr-1 font-bold posted">
      <p class="posted">
        {{ answer.posted }}
      </p>
    </div>
    <div class="flex">
      <div class="w-14 flex flex-col justify-center items-center py-2 px-2 pl-0 mr-3 border-right">
        <i class="fas fa-sort-up text-yellow-500 text-3xl" @click="upvote()"></i>
        <p class="font-bold" :class="{ 'text-yellow-500': answer.rating > 0, 'text-red-500': answer.rating < 0 }">
          {{ answer.rating }}
        </p>
        <i class="fas fa-sort-down text-red-500 text-3xl" @click="downvote()"></i>
      </div>
      {{ answer.body }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['answer']
}
</script>

<style scoped>
@import '../assets/tailwind.css';
</style>
