<template>
  <div class="bg-white rounded shadow px-3 pt-2 pb-1 flex">
    <div class="w-14 flex flex-col justify-center items-center border-right py-2 pr-3 pl-0">
      <i class="fas fa-sort-up text-yellow-500 text-2xl"></i>
      <p class="font-bold">{{ question.rating }}</p>
      <i class="fas fa-sort-down text-red-500 text-2xl"></i>
    </div>
    <div class="p-2 flex flex-col w-100">
      <div class="flex justify-between border-bottom mb-1">
        <h1>{{ question.title }}</h1>
        <p>Asked: {{ question.posted }}</p>
      </div>
      <div class="flex-grow">
        <p>{{ question.body }}</p>
      </div>
      <div class="flex justify-between border-top mt-1">
        <div>
          <h1>Answers</h1>
        </div>
        <div>
          {{ question.creator.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['question']
}
</script>

<style scoped>
@import '../assets/tailwind.css';
.flex-grow {
  min-height: 5vh;
}
</style>
