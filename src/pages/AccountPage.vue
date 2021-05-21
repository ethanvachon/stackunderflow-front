<template>
  <div class="container flex flex-col" v-if="state.loaded">
    <div class="flex justify-center">
      <div class="bg-white rounded p-2 px-5 mt-3 fit-content relative">
        <div class="flex justify-center">
          <img :src="state.profile.picture" class="rounded-full mr-3 my-3 max-height">
          <div class="flex justify-center flex-col">
            <h1 class="text-xl width border-bottom pb-1" v-if="state.editName == false && state.editImage == false">
              {{ state.profile.name }}
            </h1>
            <form @submit.prevent="editName()" v-if="state.editName == true">
              <input type="text" class="text-xl border border-2 rounded width p-1" v-model="state.newName">
            </form>
            <form @submit.prevent="editImage()" v-if="state.editImage == true">
              <input type="text" class="text-xl border border-2 rounded width p-1" v-model="state.newImage">
            </form>
            <h1 class="py-2">
              Rating: {{ state.profile.rating }}
            </h1>
            <div class="dropdown">
              <i class="fas fa-cog text-xl"></i>
              <div class="dropdown-content">
                <p class="border-bottom pb-1" @click="state.editName = !state.editName">
                  Edit Name
                </p>
                <p class="pt-1" @click="state.editImage = !state.editImage">
                  Edit Image
                </p>
              </div>
            </div>
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
    </div>
    <div v-if="state.display == 'questions'">
      <div class="mt-3" v-for="question in state.questions" :key="question.id">
        <question :question="question" />
      </div>
    </div>
    <div class="flex items-center justify-center flex-col flex-grow font-bold" v-if="state.display == 'questions' && state.questions.length == 0">
      no questions
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
    <div class="flex items-center justify-center flex-col flex-grow font-bold" v-if="state.display == 'answers' && state.answers.length == 0">
      no answers
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
      editName: false,
      editImage: false,
      newName: 'new name',
      newImage: 'new image'
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
      editName() {
        profilesService.editName(state.newName)
        state.editName = false
      },
      editImage() {
        profilesService.editImage(state.newImage)
        state.editImage = false
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
.fit-content {
  width: fit-content
}
.dropdown {
  display: inline-block;
  position: absolute;
  top: 10px;
  right: 10px;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 100;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.width {
  width: 15vw
}
.max-height {
  max-height: 20vh;
}
</style>
