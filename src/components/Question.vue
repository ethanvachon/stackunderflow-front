<template>
  <router-link :to="{name: 'QuestionPage', params: {id: question.id}}">
    <div class="bg-white rounded shadow px-2 flex">
      <div class="w-14 flex flex-col justify-center items-center border-right py-2 pr-2 pl-0">
        <i class="fas fa-sort-up text-yellow-500 text-2xl"></i>
        <p class="font-bold">{{ question.rating }}</p>
        <i class="fas fa-sort-down text-red-500 text-2xl"></i>
      </div>
      <div class="px-2 flex flex-col w-100">
        <div class="flex justify-between border-bottom mb-1 p-1 items-center">
          <h1>{{ question.title }}</h1>
          <p>Asked: {{ question.posted }}</p>
        </div>
        <div class="flex-grow">
          <p>{{ question.body }}</p>
        </div>
        <div class="flex justify-between border-top mt-1 p-1 items-center">
          <div v-if="state.answers">
            <h1>Answers: {{ state.answers.length }}</h1>
          </div>
          <div>
            {{ question.creator.name }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { logger } from '../utils/Logger'
import { answersService } from '../services/AnswersService'
export default {
  props: ['question'],
  setup(props) {
    const state = reactive({
      answers: []
    })
    onMounted(async() => {
      try {
        state.answers = await answersService.getAnswersByQuestion(props.question.id)
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
.flex-grow {
  min-height: 5vh;
}
a {
  text-decoration: none;
}
a:hover {
  color: black;
}
</style>
