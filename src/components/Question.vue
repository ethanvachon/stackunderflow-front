<template>
  <div class="bg-white rounded shadow px-2 flex" id="card">
    <div class="w-14 flex flex-col justify-center items-center border-right py-2 pr-2 pl-0">
      <i class="fas fa-sort-up text-yellow-500 text-3xl" @click="upvote()"></i>
      <p class="font-bold" :class="{ 'text-yellow-500': question.rating > 0, 'text-red-500': question.rating < 0 }">
        {{ question.rating }}
      </p>
      <i class="fas fa-sort-down text-red-500 text-3xl" @click="downvote()"></i>
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
        <div class="flex justify-between border-bottom mb-1 p-1 items-center">
          <p>{{ question.posted }}</p>
          <h1>{{ question.title }}</h1>
          <p></p>
        </div>
        <div class="flex-grow overflow-elip">
          <p>{{ question.body }}</p>
        </div>
      </router-link>
      <router-link :to="{name: 'ProfilePage', params: {id: question.creator.id}}">
        <div class="flex justify-between border-top mt-1 p-1 items-center">
          <div v-if="state.answers" class="font-bold">
            <h1>{{ state.answers.length }} Answers</h1>
          </div>
          <div>
            {{ question.creator.name }}
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
      user: computed(() => AppState.user),
      ratings: [],
      rated: false
    })
    onMounted(async() => {
      try {
        state.answers = await answersService.returnAnswersByQuestion(props.question.id)
        state.ratings = await questionsService.getRatings(props.question.id)
        if (state.ratings.find(r => r.profileId === state.user.id)) {
          state.rated = true
        }
        console.log(state.rated)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      upvote() {
        if (state.rated === false) {
          questionsService.upvote(props.question.id)
          state.rated = true
        }
      },
      downvote() {
        if (state.rated === false) {
          questionsService.downvote(props.question.id)
          state.rated = true
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
