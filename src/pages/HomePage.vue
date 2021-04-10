<template>
  <div class="flex-grow-1 container">
    <div class="mt-3" v-for="question in state.questions" :key="question.id">
      <question :question="question" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { questionsService } from '../services/QuestionsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      questions: computed(() => AppState.questions)
    })
    onMounted(async() => {
      try {
        await questionsService.getQuestions()
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

<style scoped lang="scss">
@import '../assets/tailwind.css';
</style>
