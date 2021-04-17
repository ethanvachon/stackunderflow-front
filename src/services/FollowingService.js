import { AppState } from '../AppState'
import { api } from './AxiosService'
import { profilesService } from '../services/ProfilesService'

class FollowingService {
  async FollowUser(newFollowing) {
    await api.post('api/followings', newFollowing)
    await profilesService.getFollowingsByProfile(AppState.account.id)
  }

  async deleteFollowing(id) {
    await api.delete('api/followings/' + id)
    await profilesService.getFollowingsByProfile(AppState.account.id)
  }
}

export const followingService = new FollowingService()
