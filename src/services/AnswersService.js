import { AppState } from '../AppState'
import { api } from './AxiosService'

class AnswersService {
  async getAnswersByQuestion(id) {
    const res = await api.get('api/questions/' + id + '/answers')
    AppState.answers = res.data
  }

  async returnAnswersByQuestion(id) {
    const res = await api.get('api/questions/' + id + '/answers')
    return res.data
  }

  async getOne(id) {
    await api.get('api/answers/' + id)
  }

  async createAnswer(newAnswer) {
    await api.post('api/answers', newAnswer)
    this.getAnswersByQuestion(newAnswer.questionId)
  }

  async editAnswer(newAnswer, id) {
    await api.put('api/answers/' + id, newAnswer)
  }

  async deleteAnswer(id, questionId) {
    await api.delete('api/answers/' + id)
    this.getAnswersByQuestion(questionId)
  }

  async upvote(id, questionId) {
    await api.put('api/answers/' + id + '/up')
    const newRating = {
      answerId: id,
      Rating: true
    }
    await api.post('api/answerratings/', newRating)
    this.getAnswersByQuestion(questionId)
  }

  async downvote(id, questionId) {
    await api.put('api/answers/' + id + '/down')
    const newRating = {
      answerId: id,
      Rating: false
    }
    await api.post('api/answerratings/', newRating)
    this.getAnswersByQuestion(questionId)
  }
}

export const answersService = new AnswersService()
