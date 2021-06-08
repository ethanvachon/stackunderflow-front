import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
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
    try {
      const newRating = {
        RatedId: id,
        Rating: true
      }
      await api.post('api/ratings/', newRating)
      await api.put('api/questions/' + id + '/up')
      this.getQuestions()
    } catch (error) {
      logger.log(error)
    }
  }

  async downvote(id) {
    try {
      const newRating = {
        RatedId: id,
        Rating: false
      }
      await api.post('api/ratings/', newRating)
      await api.put('api/questions/' + id + '/down')
      this.getQuestions()
    } catch (error) {
      logger.log(error)
    }
  }

  // referenced on question page for different get req
  async downvoteqp(id) {
    try {
      const newRating = {
        RatedId: id,
        Rating: false
      }
      await api.post('api/ratings/', newRating)
      await api.put('api/questions/' + id + '/down')
      this.getOne(id)
    } catch (error) {
      logger.log(error)
    }
  }

  // referenced on question page for different get req
  async upvoteqp(id) {
    try {
      const newRating = {
        RatedId: id,
        Rating: true
      }
      await api.post('api/ratings/', newRating)
      await api.put('api/questions/' + id + '/up')
      this.getOne(id)
    } catch (error) {
      logger.log(error)
    }
  }

  async getRatings(id) {
    const res = await api.get('api/questions/' + id + '/ratings')
    return res.data
  }
}

export const questionsService = new QuestionsService()
