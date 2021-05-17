import { AppState } from '../AppState'
import { accountService } from './AccountService'
import { api } from './AxiosService'

class ProfilesService {
  async editName(name) {
    const newProfile = AppState.account
    newProfile.name = name
    await api.put('api/profiles', newProfile)
    await accountService.getAccount()
  }

  async editImage(image) {
    const newProfile = AppState.account
    newProfile.picture = image
    await api.put('api/profiles', newProfile)
    await accountService.getAccount()
  }

  async getAnswersByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/answers')
    AppState.profileAnswers = res.data
  }

  async getQuestionsByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/questions')
    AppState.profileQuestions = res.data
  }

  async getFollowingsByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/following')
    AppState.following = res.data
  }

  async getRatingsByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/ratings')
    AppState.ratings = res.data
  }

  async getAnswerRatingsByProfile(id) {
    const res = await api.get('api/profiles/' + id + '/aratings')
    AppState.answerRatings = res.data
  }

  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.currentProfile = res.data
  }

  async getProfiles() {
    const res = await api.get('api/profiles')
    AppState.profiles = res.data
  }

  async getQuestionFeed() {
    const id = AppState.account.id
    const res = await api.get('api/profiles/' + id + '/questionfeed')
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].map(q => AppState.questionFeed.push(q))
    }
    // AppState.questionFeed = res.data
  }

  async getAnswerFeed() {
    const id = AppState.account.id
    const res = await api.get('api/profiles/' + id + '/answerfeed')
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].map(a => AppState.answerFeed.push(a))
    }
    // AppState.answerFeed = res.data
  }
}

export const profilesService = new ProfilesService()
