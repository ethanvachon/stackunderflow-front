<template>
  <div class="container">
    <div class="mt-2">
      <select class="p-1" v-model="state.display">
        <option @click="state.display = 'questions'">
          Questions
        </option>
        <option @click="state.display = 'answers'">
          Answers
        </option>
      </select>
      <!-- <div class="bg-white rounded shadow flex justify-around mt-3 sizing">
        <h1 class="p-2 m-3 hover:text-white hover:bg-black rounded" @click="state.display = 'questions'">
          Questions
        </h1>
        <h1 class="p-2 m-3 hover:text-white hover:bg-black rounded" @click="state.display = 'answers'">
          Answers
        </h1>
      </div> -->
    </div>
    <div v-if="state.display == 'Questions'">
      <div class="my-3" v-for="question in state.feedQuestions" :key="question.id">
        <question :question="question" />
      </div>
    </div>
    <div v-if="state.display == 'Answers'">
      <div class="my-3" v-for="answer in state.feedAnswers" :key="answer.id">
        <answer :answer="answer" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      display: 'Questions',
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
