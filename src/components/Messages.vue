<template>
  <div class="bg-white p-2 rounding w-72 transition-all" :class="{ 'h-10' : state.expanded == false, 'h-96' : state.expanded == true}">
    <div class="flex justify-between pb-2" @click="state.expanded = !state.expanded">
      <h1 class="font-bold text-md">
        Messages
      </h1>
      <div class="flex items-center">
        <i class="fas fa-edit pr-4" @click="state.expanded = false, state.write = !state.write"></i>
        <i v-if="state.expanded == false" class="fas fa-chevron-down"></i>
        <i v-if="state.expanded == true" class="fas fa-chevron-up"></i>
      </div>
    </div>
    <div v-if="state.expanded == true" class="border-top ovrflw">
      <div v-if="state.write == false">
        <div class="border-top border-bottom py-2 flex items-center" v-for="chat in state.chats" :key="chat.id">
          <img :src="chat.user.picture" class="h-8 mx-2 rounded-full">
          <p class="text-sm">
            {{ chat.user.name }}
          </p>
        </div>
      </div>
      <div v-if="state.write == true">
        <div class="border-top border-bottom py-2 flex items-center" v-for="following in state.followings" :key="following.id">
          <img :src="following.user.picture" class="h-8 mx-2 rounded-full">
          <p class="text-sm">
            {{ following.user.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      chats: computed(() => AppState.chats),
      followings: computed(() => AppState.following),
      expanded: false,
      write: false
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
.ovrflw {
  overflow-y: scroll;
  height: inherit;
}
</style>
