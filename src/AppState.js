import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  // profile data for ratings and following
  ratings: [],
  following: [],
  // data for the feed page
  questionFeed: [],
  answerFeed: [],
  // all profiles on profiles page
  profiles: [],
  // profile being viewed on profile page
  currentProfile: {},
  // all questions on home page
  questions: [],
  // profile page answers/questions
  profileQuestions: [],
  profileAnswers: [],
  //  single question for question page
  question: {},
  // answers displayed on question page
  answers: []
})
