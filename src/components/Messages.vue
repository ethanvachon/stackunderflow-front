<template>
  <div class="bg-white p-2 rounding w-72 transition-all" :class="{ 'h-10' : state.expanded == false, 'h-96' : state.expanded == true}">
    <div class="flex justify-between pb-2" @click="state.expanded = !state.expanded">
      <h1 class="font-bold text-md">
        Messages
      </h1>
      <div class="flex items-center">
        <i class="fas fa-edit pr-4"></i>
        <i v-if="state.expanded == false" class="fas fa-chevron-down"></i>
        <i v-if="state.expanded == true" class="fas fa-chevron-up"></i>
      </div>
    </div>
    <div v-if="state.expanded == true" class="border-top">
      test
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      expanded: false
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
.rounding {
  border-radius: 5px 5px 0px 0px;
}
</style>
