<template>
  <div class="container flex flex-col" v-if="state.loaded">
    <div class="flex justify-center">
      <div class="bg-white rounded p-2 px-5 mt-3 fit-content">
        <div class="flex justify-center">
          <img :src="state.profile.picture" class="rounded-full mr-3 my-3">
          <div class="flex justify-center flex-col">
            <h1 class="text-xl">
              {{ state.profile.name }}
            </h1>
            <h1 class="py-2 font-bold">
              Rating: {{ state.profile.rating }}
            </h1>
            <button class="text-yellow-500 hover:bg-yellow-500 hover:text-white py-1 mt-1 rounded border-yellow-500 border-2 transition-all" @click="followUser()">
              Follow
              <i class="fas fa-user-plus pl-2"></i>
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
    </div>
    <div v-if="state.display == 'questions' && state.questions.length > 0">
      <div class="my-3" v-for="question in state.questions" :key="question.id">
        <question :question="question" />
      </div>
    </div>
    <div class="flex items-center justify-center flex-col flex-grow font-bold" v-if="state.display == 'questions' && state.questions.length == 0">
      no questions
    </div>
    <div v-if="state.display == 'answers' && state.answers.length > 0">
      <div class="my-3 mb-5" v-for="answer in state.answers" :key="answer.id">
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
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { followingService } from '../services/FollowingService'
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
      state,
      followUser() {
        const newFollow = {
          FollowerId: state.profile.id
        }
        followingService.FollowUser(newFollow)
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
img {
  height: 10vh
}
.fit-content {
  width: fit-content
}
</style>
