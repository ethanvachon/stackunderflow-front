import { AppState } from '../AppState'
import { api } from './AxiosService'

class QuestionsService {
  async getQuestions() {
    const res = await api.get('api/questions')
    AppState.questions = res.data
  }

  async getOne(id) {
    const res = await api.get('api/questions/' + id)
    console.log(res.data)
  }

  async createQuestion(newQuestion) {
    newQuestion.posted = new Date()
    await api.post('api/questions', newQuestion)
  }

  async editQuestion(newQuestion, id) {
    await api.put('api/questions/' + id, newQuestion)
  }

  async deleteQuestion(id) {
    await api.delete('api/questions' + id)
  }
}

export const questionsService = new QuestionsService()
