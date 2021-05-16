<template>
  <div class="container" v-if="state.loaded">
    <div class="bg-white rounded p-2 mt-3">
      <div class="flex justify-center">
        <img :src="state.profile.picture" class="rounded-full mr-3 my-3">
        <div class="flex justify-center flex-col">
          <h1 class="text-xl" v-if="state.editMode == false">
            {{ state.profile.name }}
          </h1>
          <form @submit.prevent="edit()" v-if="state.editMode == true">
            <input type="text" class="text-xl" v-model="state.newName">
          </form>
          <button class="text-yellow-500 hover:bg-yellow-500 hover:text-white py-1 mt-1 rounded border-yellow-500 border-2" @click="state.editMode = !state.editMode">
            Edit Name
          </button>
        </div>
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
      display: 'questions',
      editMode: false,
      newName: AppState.account.name
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
      state,
      edit() {
        profilesService.edit(state.newName)
      }
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
