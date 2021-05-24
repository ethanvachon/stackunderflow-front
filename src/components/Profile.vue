<template>
  <div class="col-3 my-3">
    <div class="my-1 bg-white rounded shadow px-2 pb-2">
      <div class="flex pt-2">
        <div class="flex justify-center items-center w-16">
          <router-link :to="{name: 'ProfilePage', params: {id: profile.id}}">
            <img :src="profile.picture" class="rounded-full h-12">
          </router-link>
        </div>
        <div class="flex flex-col justify-center pb-1 pt-1 overflow-hidden">
          <router-link :to="{name: 'ProfilePage', params: {id: profile.id}}">
            <p>
              {{ profile.name }}
            </p>
          </router-link>
          <p>Rating: <span class="font-bold">{{ profile.rating }}</span></p>
        </div>
      </div>
      <div class="flex">
        <div class="w-16">
        </div>
        <button v-if="!state.followings.find(f => f.followingId == profile.id) && state.following == false" class="text-yellow-500 hover:bg-yellow-500 hover:text-white text-sm p-1 mt-1 px-3 rounded border-yellow-500 border-2" @click="followUser()">
          Follow
          <i class="fas fa-user-plus pl-2"></i>
        </button>

        <button v-if="state.followings.find(f => f.followingId == profile.id) && state.clicked == false" @click="state.clicked = true" class="bg-yellow-500 p-1 mt-1 px-3 rounded border-yellow-500 border-2 text-white text-sm">
          Following
          <i class="fas fa-user-check pl-2"></i>
        </button>

        <button v-if="state.clicked == true" @click="unfollowUser()" class="bg-yellow-500 p-1 mt-1 px-3 rounded border-yellow-500 border-2 text-white text-sm">
          Unfollow
          <i class="fas fa-user-times pl-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { followingService } from '../services/FollowingService'
export default {
  props: ['profile'],
  setup(props) {
    const state = reactive({
      followings: computed(() => AppState.following),
      user: computed(() => AppState.user),
      following: false,
      clicked: false
    })
    return {
      state,
      async followUser() {
        if (state.following === false && state.user.isAuthenticated) {
          state.following = true
          const newFollow = {
            FollowingId: props.profile.id
          }
          await followingService.FollowUser(newFollow)
        }
      },
      async unfollowUser() {
        state.clicked = false
        state.following = false
        const toDelete = state.followings.find(f => f.followingId === props.profile.id)
        await followingService.deleteFollowing(toDelete.id)
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/tailwind.css';
a {
  text-decoration: none;
}
a:hover {
  color: black;
}
#hover-text-black:hover {
  color: rgb(245, 158, 11);
}
#hover-text-black {
  color: white;
}
</style>
