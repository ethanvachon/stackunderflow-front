import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/question/:id',
    name: 'QuestionPage',
    component: loadPage('QuestionPage')
  },
  {
    path: '/profile/:id',
    name: 'ProfilePage',
    component: loadPage('ProfilePage')
  },
  {
    path: '/profiles/',
    name: 'ProfilesPage',
    component: loadPage('ProfilesPage')
  },
  {
    path: '/feed/',
    name: 'FeedPage',
    component: loadPage('FeedPage'),
    beforeEnter: authGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
