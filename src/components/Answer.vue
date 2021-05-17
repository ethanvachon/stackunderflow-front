<template>
  <div class="bg-white rounded shadow my-3 card">
    <div class="flex justify-center border-bottom pr-1 posted">
      <p class="posted font-bold">
        {{ answer.posted }}
      </p>
      <div class="dropdown" v-if="state.user.name == answer.creator.name">
        <h6>
          ...
        </h6>
        <div class="dropdown-content">
          <p @click="deleteAnswer()">
            delete
          </p>
        </div>
      </div>
    </div>
    <div class="flex border-bottom">
      <div class="w-14 flex flex-col justify-center items-center py-2 px-2 pl-0 mr-3 border-right">
        <i class="fas fa-sort-up text-3xl" v-if="state.tempRating == null" @click="upvote()" :class="{ 'text-yellow-500' : !state.rating || state.rating.rating == true, 'text-gray-400' : state.rating && state.rating.rating == false }"></i>

        <i v-if="state.tempRating != null" class="fas fa-sort-up text-3xl" :class="{ 'text-yellow-500' : state.tempRating , 'text-gray-400' : state.tempRating == false }"></i>

        <p class="font-bold" :class="{ 'text-yellow-500': answer.rating > 0, 'text-red-500': answer.rating < 0 }">
          {{ answer.rating }}
        </p>

        <i class="fas fa-sort-down text-red-500 text-3xl" v-if="state.tempRating == null" @click="downvote()" :class="{ 'text-red-500' : !state.rating || state.rating.rating == false, 'text-gray-400' : state.rating && state.rating.rating == true }"></i>

        <i v-if="state.tempRating != null" class="fas fa-sort-down text-3xl" :class="{ 'text-red-500' : state.tempRating == false, 'text-gray-400' : state.tempRating }"></i>
      </div>
      {{ answer.body }}
    </div>
    <router-link :to="{name: 'ProfilePage', params: {id: answer.creator.id}}">
      <div class="flex justify-around">
        <p>{{ answer.creator.name }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { answersService } from '../services/AnswersService'
import { AppState } from '../AppState'
import { reactive, computed } from 'vue'
export default {
  props: ['answer'],
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      rating: computed(() => AppState.answerRatings.find(r => r.profileId === state.account.id && r.answerId === props.answer.id)),
      rated: false,
      tempRating: null
    })
    return {
      state,
      deleteAnswer() {
        answersService.deleteAnswer(props.answer.id, props.answer.questionId)
      },
      upvote() {
        if (state.user.isAuthenticated && state.rated === false && !state.rating) {
          answersService.upvote(props.answer.id, props.answer.questionId)
          state.rated = true
          state.tempRating = true
        }
      },
      downvote() {
        if (state.user.isAuthenticated && state.rated === false && !state.rating) {
          answersService.downvote(props.answer.id, props.answer.questionId)
          state.rated = true
          state.tempRating = false
        }
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/tailwind.css';
.dropdown {
  position: absolute;
  display: inline-block;
  top: 0px;
  right: 10px;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
a {
  text-decoration: none;
}
a:hover {
  color: black;
}
</style>
