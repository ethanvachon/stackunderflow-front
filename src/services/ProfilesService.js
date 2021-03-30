import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getAnswersByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/answers')
    AppState.profileAnswers = res.data
  }

  async getQuestionsByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/questions')
    AppState.profileQuestions = res.data
  }

  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.currentProfile = res.data
  }
}

export const profilesService = new ProfilesService()
