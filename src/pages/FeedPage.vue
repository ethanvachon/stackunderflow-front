<template>
  <div class="container">
    <div class="mt-2 flex">
      <select class="p-1" v-model="state.display">
        <option @click="state.display = 'questions'">
          Questions
        </option>
        <option @click="state.display = 'answers'">
          Answers
        </option>
      </select>
      <span class="pl-3 pr-2">Sort by:</span>
      <select class="p-1" v-model="state.sort" @change="sort()">
        <option @click="state.sort = 'Recent'">
          Recent
        </option>
        <option @click="state.sort = 'Rating'">
          Rating
        </option>
      </select>
    </div>
    <div class="mb-3" v-if="state.display == 'Questions'">
      <div class="my-3" v-for="question in state.feedQuestions" :key="question.id">
        <question :question="question" />
      </div>
    </div>
    <div class="mb-3" v-if="state.display == 'Answers'">
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
      sort: 'Recent',
      feedQuestions: computed(() => AppState.questionFeed),
      feedAnswers: computed(() => AppState.answerFeed)
    })
    onMounted(async() => {

    })
    return {
      state,
      sort() {
        if (state.sort === 'Recent') {
          AppState.questionFeed = state.feedQuestions.sort((a, b) => a.id - b.id).reverse()
          AppState.answerFeed = state.feedAnswers.sort((a, b) => a.id - b.id).reverse()
        } else if (state.sort === 'Rating') {
          AppState.questionFeed = state.feedQuestions.sort((a, b) => a.rating - b.rating).reverse()
          AppState.answerFeed = state.feedAnswers.sort((a, b) => a.rating - b.rating).reverse()
        }
      }
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
