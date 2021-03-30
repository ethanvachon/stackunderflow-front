import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  // async getVaultsByProfile(id) {
  //   const res = await api.get('api/profiles/' + id + '/vaults')
  //   AppState.currentVaults = res.data
  // }

  // async getKeepsByProfile(id) {
  //   const res = await api.get('api/profiles/' + id + '/keeps')
  //   AppState.currentKeeps = res.data
  // }

  async getProfile(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.currentProfile = res.data
  }
}

export const profilesService = new ProfilesService()
