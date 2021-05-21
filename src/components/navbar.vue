<template>
  <nav class="navbar p-0 navbar-expand-lg border-bottom bg-white flex justify-between">
    <div class="flex">
      <router-link :to="{ name: 'ProfilesPage' }" class="nav-link">
        <h1 class="text-yellow-500">
          Profiles
        </h1>
      </router-link>

      <router-link :to="{ name: 'FeedPage' }" class="nav-link">
        <h1 class="text-yellow-500">
          Feed
        </h1>
      </router-link>
    </div>

    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1 class="text-yellow-500">
          StackUnderflow
        </h1>
      </div>
    </router-link>

    <button class="text-yellow-500 hover:bg-yellow-500 hover:text-white font-bold py-1 px-2 rounded border-yellow-500 border-2" v-if="user.isAuthenticated" data-toggle="modal" data-target="#postQuestion">
      +
    </button>
    <question-post-modal />
    <span class="navbar-text mx-3">
      <button
        class="btn btn-custom text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>

      <div class="dropdown" v-else>
        <div
          class="dropdown-toggle flex items-center"
          @click="state.dropOpen = !state.dropOpen"
        >
          <span class="mx-3 text-yellow-500">{{ user.name }}</span>
        </div>
        <div
          class="dropdown-menu p-0 list-group w-100"
          :class="{ show: state.dropOpen }"
          @click="state.dropOpen = false"
        >
          <router-link :to="{ name: 'Account' }">
            <div class="list-group-item list-group-item-action hoverable">
              Account
            </div>
          </router-link>
          <div
            class="list-group-item list-group-item-action hoverable"
            @click="logout"
          >
            logout
          </div>
        </div>
      </div>
    </span>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/tailwind.css';
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.btn-custom {
  color: rgb(245, 158, 11);
  border-color: rgb(245, 158, 11);
}
</style>
