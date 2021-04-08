<template>
  <div class="container" v-if="state.loaded">
    <div class="bg-white rounded p-2 mt-3">
      <div>
        <img :src="state.profile.picture" class="rounded-full">
        {{ state.profile.name }}
      </div>
      <div class="flex justify-around">
        <p @click="state.display = 'questions'" class="rounded p-1" :class="{ 'bg-black': state.display == 'questions', 'text-white': state.display == 'questions'}">
          Questions {{ state.questions.length }}
        </p>
        <p @click="state.display = 'answers'" class="rounded p-1" :class="{ 'bg-black': state.display == 'answers', 'text-white': state.display == 'answers'}">
          Answers {{ state.answers.length }}
        </p>
      </div>
    </div>
    <div v-if="state.display == 'questions'">
      <div class="mt-3" v-for="question in state.questions" :key="question.id">
        <question :question="question" />
      </div>
    </div>
    <div v-if="state.display == 'answers'">
      <div class="mt-3 mb-5" v-for="answer in state.answers" :key="answer.id">
        <router-link :to="{name: 'QuestionPage', params: {id: answer.question.id}}">
          <div class="bg-white p-2 rounded">
            <p>{{ answer.question.title }}</p>
          </div>
          <answer :answer="answer" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { profilesService } from '../services/ProfilesService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { accountService } from '../services/AccountService'
export default {
  props: ['id'],
  setup(props) {
    const state = reactive({
      profile: computed(() => AppState.account),
      questions: computed(() => AppState.profileQuestions),
      answers: computed(() => AppState.profileAnswers),
      loaded: false,
      display: 'questions'
    })
    onMounted(async() => {
      try {
        await accountService.getAccount()
        await profilesService.getQuestionsByProfile(state.profile.id)
        await profilesService.getAnswersByProfile(state.profile.id)
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
a {
  text-decoration: none;
}
a:hover {
  color: black;
}
</style>
