<template>
  <div class="container" v-if="state.loaded">
    <div class="bg-white rounded shadow mt-3">
      <div class="flex justify-center pt-1 border-bottom mb-1">
        <p class="font-bold text-sm">
          {{ state.question.posted }}
        </p>
      </div>
      <div class="flex border-bottom mb-1">
        <div class="w-14 flex flex-column justify-center items-center border-right mr-1">
          <i class="fas fa-sort-up text-yellow-500 text-3xl" @click="upvote()"></i>
          <p class="font-bold" :class="{ 'text-yellow-500': state.question.rating > 0, 'text-red-500': state.question.rating < 0 }">
            {{ state.question.rating }}
          </p>
          <i class="fas fa-sort-down text-red-500 text-3xl" @click="downvote()"></i>
        </div>
        <div>
          <div class="flex justify-between text-xl pb-1">
            <h1>{{ state.question.title }}</h1>
          </div>
          <p class="mt-3">
            {{ state.question.body }}
          </p>
        </div>
      </div>
      <div class="flex justify-around">
        <p>{{ state.answers.length }} Answers</p>
        <router-link :to="{name: 'ProfilePage', params: {id: state.question.creator.id}}">
          <p>{{ state.question.creator.name }}</p>
        </router-link>
      </div>
    </div>
    <answer v-for="answer in state.answers" :key="answer.id" :answer="answer" />
  </div>
</template>
<script>
import { questionsService } from '../services/QuestionsService'
import { reactive, onMounted, computed } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { answersService } from '../services/AnswersService'
export default {
  props: ['id'],
  setup(props) {
    const state = reactive({
      question: computed(() => AppState.question),
      answers: [],
      loaded: false
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        await questionsService.getOne(route.params.id)
        state.answers = await answersService.getAnswersByQuestion(route.params.id)
        console.log(state.answers)
        state.loaded = true
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>
<style scoped>
@import '../assets/tailwind.css';
/* .posted {
  position: relative;
  top: 5px;
} */
</style>
