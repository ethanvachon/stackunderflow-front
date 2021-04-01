<template>
  <div class="container" v-if="state.question">
    <div class="bg-white rounded shadow p-2 mt-3">
      <div class="flex justify-between">
        <h1>{{ state.question.title }}</h1>
        <h1>{{ state.question.posted }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import { questionsService } from '../services/QuestionsService'
import { reactive, onMounted, computed } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  props: ['id'],
  setup(props) {
    const state = reactive({
      question: computed(() => AppState.question)
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        await questionsService.getOne(route.params.id)
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

</style>
