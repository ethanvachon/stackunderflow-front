import { initialize } from '@bcwdev/auth0provider-client'
import { AppState } from '../AppState'
import { audience, clientId, domain } from '../AuthConfig'
import router from '../router'
import { setBearer } from './AxiosService'
import { accountService } from './AccountService'
import { profilesService } from './ProfilesService'

export const AuthService = initialize({
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }
})

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, async function() {
  setBearer(AuthService.bearer)
  AppState.user = AuthService.user
  await accountService.getAccount()
  // NOTE if there is something you want to do once the user is authenticated, place that here
  await profilesService.getRatingsByProfile(AppState.account.id)
  await profilesService.getAnswerRatingsByProfile(AppState.account.id)
  await profilesService.getFollowingsByProfile(AppState.account.id)
  await profilesService.getChats(AppState.account.id)
  await profilesService.getQuestionFeed()
  await profilesService.getAnswerFeed()
})
