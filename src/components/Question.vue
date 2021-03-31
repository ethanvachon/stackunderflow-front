<template>
  <div class="bg-white rounded shadow p-3 flex">
    <div class="w-14 flex flex-col justify-center items-center border-right py-2 pr-3 pl-0 mr-2">
      <i class="fas fa-sort-up text-yellow-500 text-2xl"></i>
      <p class="font-bold">{{ question.rating }}</p>
      <i class="fas fa-sort-down text-red-500 text-2xl"></i>
    </div>
    {{ question }}
  </div>
</template>
<script>
export default {
  props: ['question']
}
</script>

<style scoped>
@import '../assets/tailwind.css';

</style>
