<template>
  <div class="container" v-if="state.loaded">
    <div class="bg-white rounded p-2 mt-3">
      <div>
        <img :src="state.profile.picture" class="rounded-full">
        {{ state.profile.name }}
      </div>
      <div class="flex justify-around">
        <p @click="state.display = 'questions'">
          Questions {{ state.questions.length }}
        </p>
        <p @click="state.display = 'answers'">
          Answers {{ state.answers.length }}
        </p>
      </div>
    </div>
    <div v-if="state.display == 'questions'">
      <div class="mt-3" v-for="question in state.questions" :key="question.id">
        <question :question="question" />
      </div>
    </div>
    <div class="mt-3" v-for="answer in state.answers" :key="answer.id">
      <answer :answer="answer" />
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: ['id'],
  setup(props) {
    const state = reactive({
      profile: computed(() => AppState.currentProfile),
      questions: computed(() => AppState.profileQuestions),
      answers: computed(() => AppState.profileAnswers),
      loaded: false,
      display: 'questions'
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        await profilesService.getProfile(route.params.id)
        await profilesService.getQuestionsByProfile(route.params.id)
        await profilesService.getAnswersByProfile(route.params.id)
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
</style>
