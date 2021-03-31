// import { AppState } from '../AppState'
import { api } from './AxiosService'

class AnswersService {
  async getAnswersByQuestion(id) {
    const res = await api.get('api/questions/' + id + '/answers')
    return res.data
  }

  async getOne(id) {
    const res = await api.get('api/answers/' + id)
    console.log(res.data)
  }

  async createQuestion(newAnswer) {
    newAnswer.posted = new Date()
    await api.post('api/answers', newAnswer)
  }

  async editAnswer(newAnswer, id) {
    await api.put('api/answers/' + id, newAnswer)
  }

  async deleteAnswer(id) {
    await api.delete('api/answers' + id)
  }
}

export const answersService = new AnswersService()
