<template>
  <div class="bg-white rounded shadow px-2 flex" id="card">
    <div class="w-14 flex flex-col justify-center items-center border-right py-2 pr-2 pl-0">
      <i v-if="state.tempRating == null" class="fas fa-sort-up text-3xl" :class="{ 'text-yellow-500' : !state.rating || state.rating.rating == true, 'text-gray-400' : state.rating && state.rating.rating == false }" @click="upvote()"></i>

      <i v-if="state.tempRating != null" class="fas fa-sort-up text-3xl" :class="{ 'text-yellow-500' : state.tempRating , 'text-gray-400' : state.tempRating == false }"></i>

      <p class="font-bold" :class="{ 'text-yellow-500': question.rating > 0, 'text-red-500': question.rating < 0 }">
        {{ question.rating }}
      </p>
      <i v-if="state.tempRating == null" class="fas fa-sort-down text-3xl" :class="{ 'text-red-500' : !state.rating || state.rating.rating == false, 'text-gray-400' : state.rating && state.rating.rating == true }" @click="downvote()"></i>

      <i v-if="state.tempRating != null" class="fas fa-sort-down text-3xl" :class="{ 'text-red-500' : state.tempRating == false, 'text-gray-400' : state.tempRating }"></i>
    </div>
    <div class="px-2 flex flex-col w-100">
      <div class="dropdown">
        <p v-if="state.user.name == question.creator.name">
          ...
        </p>
        <div class="dropdown-content">
          <p @click="deleteQuestion">
            delete
          </p>
        </div>
      </div>
      <router-link :to="{name: 'QuestionPage', params: {id: question.id}}">
        <div class="flex justify-between mb-1 p-1 items-center">
          <p>{{ question.posted }}</p>
          <p></p>
        </div>
        <div class="border-bottom">
          <h1 class="text-xl pb-2">
            {{ question.title }}
          </h1>
        </div>
        <div class="flex-grow p-2">
          <p>{{ question.body }}</p>
        </div>
      </router-link>
      <router-link :to="{name: 'ProfilePage', params: {id: question.creator.id}}">
        <div class="flex justify-between border-top mt-1 p-1 items-center">
          <div v-if="state.answers" class="font-bold">
            <h1>{{ state.answers.length }} Answers</h1>
          </div>
          <div>
            <h1 class="font-bold">
              {{ question.creator.name }}
            </h1>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted, computed } from 'vue'
import { logger } from '../utils/Logger'
import { answersService } from '../services/AnswersService'
import { questionsService } from '../services/QuestionsService'
import { AppState } from '../AppState'
export default {
  props: ['question'],
  setup(props) {
    const state = reactive({
      answers: [],
      user: computed(() => AppState.account),
      rating: computed(() => AppState.ratings.find(r => r.profileId === state.user.id && r.ratedId === props.question.id)),
      rated: false,
      tempRating: null
    })
    onMounted(async() => {
      try {
        state.answers = await answersService.returnAnswersByQuestion(props.question.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      upvote() {
        if (state.rated === false && !state.rating) {
          questionsService.upvote(props.question.id)
          state.rated = true
          state.tempRating = true
        }
      },
      downvote() {
        if (state.rated === false && !state.rating) {
          questionsService.downvote(props.question.id)
          state.rated = true
          state.tempRating = false
        }
      },
      deleteQuestion() {
        questionsService.deleteQuestion(props.question.id)
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/tailwind.css';
.flex-grow {
  min-height: 5vh;
}
a {
  text-decoration: none;
}
a:hover {
  color: black;
}
.dropdown {
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 2vw;
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
#card {
  position: relative;
}
.overflow-elip {
  text-overflow: ellipsis;
}
</style>
