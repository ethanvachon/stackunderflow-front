<template>
  <div class="bg-white rounded shadow my-3 card">
    <div class="flex justify-center border-bottom pr-1 posted">
      <p class="posted font-bold">
        {{ answer.posted }}
      </p>
      <div class="dropdown">
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
        <i class="fas fa-sort-up text-yellow-500 text-3xl" @click="upvote()"></i>
        <p class="font-bold" :class="{ 'text-yellow-500': answer.rating > 0, 'text-red-500': answer.rating < 0 }">
          {{ answer.rating }}
        </p>
        <i class="fas fa-sort-down text-red-500 text-3xl" @click="downvote()"></i>
      </div>
      {{ answer.body }}
    </div>
    <div class="flex justify-around">
      <p>{{ answer.creator.name }}</p>
    </div>
  </div>
</template>

<script>
import { answersService } from '../services/AnswersService'
export default {
  props: ['answer'],
  setup(props) {
    return {
      deleteAnswer() {
        answersService.deleteAnswer(props.answer.id)
      },
      upvote() {
        answersService.upvote(props.answer.id)
      },
      downvote() {
        answersService.downvote(props.answer.id)
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
</style>
