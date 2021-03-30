// import { AppState } from '../AppState'
import { api } from './AxiosService'

class QuestionsService {
  async getAnswersByQuestion(id) {
    const res = await api.get('api/questions/' + id + '/answers')
    console.log(res.data)
  }

  async getOne(id) {
    const res = await api.get('api/questions/' + id)
    console.log(res.data)
  }

  async createQuestion(newAnswer) {
    newAnswer.posted = new Date()
    await api.post('api/answers', newAnswer)
  }

  async editQuestion(newAnswer, id) {
    await api.put('api/answer/' + id, newAnswer)
  }

  async deleteQuestion(id) {
    await api.delete('api/questions' + id)
  }
}

export const questionsService = new QuestionsService()
