import { AppState } from '../AppState'
import { api } from './AxiosService'

class QuestionsService {
  async getQuestions() {
    const res = await api.get('api/questions')
    AppState.questions = res.data
  }

  async getOne(id) {
    const res = await api.get('api/questions/' + id)
    AppState.question = res.data
  }

  async createQuestion(newQuestion) {
    newQuestion.posted = new Date()
    await api.post('api/questions', newQuestion)
  }

  async editQuestion(newQuestion, id) {
    await api.put('api/questions/' + id, newQuestion)
  }

  async deleteQuestion(id) {
    await api.delete('api/questions/' + id)
    this.getQuestions()
  }

  async upvote(id) {
    await api.put('api/questions/' + id + '/up')
    this.getQuestions()
  }

  async downvote(id) {
    await api.put('api/questions/' + id + '/down')
    this.getQuestions()
  }
}

export const questionsService = new QuestionsService()
