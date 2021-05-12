<template>
  <div class="col-3 my-3">
    <div class="my-1 justify-end bg-white rounded shadow px-2 pb-2">
      <div class="flex items-center justify-around pt-2">
        <router-link :to="{name: 'ProfilePage', params: {id: profile.id}}">
          <img :src="profile.picture" class="rounded-full h-10">
        </router-link>
        <button v-if="!state.followings.find(f => f.followingId == profile.id) && state.following == false" class="text-yellow-500 hover:bg-yellow-500 hover:text-white p-1 mt-1 rounded border-yellow-500 border-2" @click="followUser()">
          Follow
          <i class="fas fa-user-plus pl-2"></i>
        </button>
        <button v-if="state.followings.find(f => f.followingId == profile.id) && state.clicked == false" @click="state.clicked = true" class="bg-yellow-500 p-1 mt-1 rounded border-yellow-500 border-2 text-white">
          Following
          <i class="fas fa-user-check pl-2"></i>
        </button>
        <!-- <button v-if="state.following == true && state.clicked == false" @click="state.clicked = true" class="bg-yellow-500 p-1 mt-1 rounded border-yellow-500 border-2 text-white">
          Following
          <i class="fas fa-user-check pl-2"></i>
        </button> -->
        <button v-if="state.clicked == true" @click="unfollowUser()" class="bg-yellow-500 p-1 mt-1 rounded border-yellow-500 border-2 text-white">
          Unfollow
          <i class="fas fa-user-times pl-2"></i>
        </button>
      </div>

      <router-link :to="{name: 'ProfilePage', params: {id: profile.id}}">
        <div class="flex justify-center items-center pb-1 pt-1">
          <p>{{ profile.name }}</p>
        </div>
      </router-link>
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
      followUser() {
        if (state.following === false && state.user.isAuthenticated) {
          const newFollow = {
            FollowingId: props.profile.id
          }
          followingService.FollowUser(newFollow)
          state.following = true
        }
      },
      unfollowUser() {
        state.clicked = false
        state.following = false
        const toDelete = state.followings.find(f => f.followingId === props.profile.id)
        followingService.deleteFollowing(toDelete.id)
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
