<template>
  <div class="modal fade"
       id="postQuestion"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Post a question
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="flex flex-column" @submit.prevent="createQuestion()">
            <input type="text" placeholder="title" class="mb-2 border rounded p-1" v-model="state.newQuestion.title">
            <textarea placeholder="body" class="border rounded p-1" v-model="state.newQuestion.body" />
            <button type="submit" class="text-yellow-500 hover:bg-yellow-500 hover:text-white py-1 px-2 rounded border-yellow-500 border-2">
              Post
            </button>
          </form>
          <div class="flex justify-center mt-2">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { questionsService } from '../services/QuestionsService'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      newQuestion: {}
    })
    return {
      state,
      createQuestion() {
        $('#postQuestion').modal('hide')
        const date = new Date()
        let hours = date.getHours()
        if (hours > 12) {
          hours -= 12
        }
        let minutes = date.getMinutes()
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        state.newQuestion.posted = `${hours}:${minutes} ${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
        questionsService.createQuestion(state.newQuestion)
        state.newQuestion = {}
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/tailwind.css';
</style>
