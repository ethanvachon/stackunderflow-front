<template>
  <div class="container">
    <div class="bg-white rounded shadow flex justify-around">
      <p>Questions</p>
      <p>Answers</p>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      feedQuestions: computed(() => AppState.questionFeed),
      feedAnswers: computed(() => AppState.answerFeed)
    })
    onMounted(async() => {

    })
    return {
      state
    }
  }
}
</script>

<style scoped>

</style>
