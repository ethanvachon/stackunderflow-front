import { AppState } from '../AppState'
import { api } from './AxiosService'

class QuestionsService {
  async getQuestions() {
    const res = await api.get('api/questions')
    AppState.questions = res.data
  }
}

export const questionsService = new QuestionsService()
