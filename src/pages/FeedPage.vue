<template>
  <div class="container">
    <div class="flex justify-center">
      <div class="bg-white rounded shadow flex justify-around mt-3 sizing">
        <h1 class="p-2 m-3 hover:text-white hover:bg-black rounded">
          Questions
        </h1>
        <h1 class="p-2 m-3 hover:text-white hover:bg-black rounded">
          Answers
        </h1>
      </div>
    </div>
    <div v-if="state.display == 'questions'">
      <div class="my-3" v-for="question in state.feedQuestions" :key="question.id">
        <question :question="question" />
      </div>
    </div>
    <div v-if="state.display == 'answers'">
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      display: 'questions',
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
.sizing {
  width: fit-content;
  height: fit-content;
}
</style>
