import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  // all questions on home page
  questions: [],
  // profile page answers/questions
  profileQuestions: [],
  profileAnswers: [],
  //  single question for question page
  question: {}
})
