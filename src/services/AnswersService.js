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

  async createAnswer(newAnswer) {
    await api.post('api/answers', newAnswer)
    this.getAnswersByQuestion(newAnswer.questionId)
  }

  async editAnswer(newAnswer, id) {
    await api.put('api/answers/' + id, newAnswer)
  }

  async deleteAnswer(id) {
    await api.delete('api/answers/' + id)
  }

  async upvote(id) {
    await api.put('api/answers/' + id + '/up')
    this.getAnswersByQuestion()
  }

  async downvote(id) {
    await api.put('api/answers/' + id + '/down')
    this.getAnswersByQuestion()
  }
}

export const answersService = new AnswersService()
