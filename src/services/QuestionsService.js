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
    await api.post('api/questions', newQuestion)
    this.getQuestions()
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
    const newRating = {
      RatedId: id
    }
    await api.post('api/ratings/', newRating)
    this.getQuestions()
  }

  async downvote(id) {
    await api.put('api/questions/' + id + '/down')
    this.getQuestions()
  }

  async getRatings(id) {
    const res = await api.get('api/questions/' + id + '/ratings')
    return res.data
  }
}

export const questionsService = new QuestionsService()
