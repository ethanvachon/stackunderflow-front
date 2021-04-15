// import { AppState } from '../AppState'
import { api } from './AxiosService'

class FollowingService {
  async FollowUser(newFollowing) {
    await api.post('api/followings', newFollowing)
  }
}

export const followingService = new FollowingService()
