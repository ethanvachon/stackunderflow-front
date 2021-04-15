<template>
  <div class="col-3 my-4">
    <router-link :to="{name: 'ProfilePage', params: {id: profile.id}}">
      <div class="my-1 flex items-center bg-white rounded shadow p-2">
        <div class="w-20 flex justify-center ml-4">
          <img :src="profile.picture" class="rounded-full h-12">
        </div>
        <div class="flex flex-col items-center w-50">
          <h1 class="pl-2 pb-1">
            {{ profile.name }}
          </h1>
          <button class="text-yellow-500 hover:bg-yellow-500 hover:text-white p-1 mt-1 rounded border-yellow-500 border-2" @click="followUser()">
            Follow
            <i class="fas fa-user-plus pl-2"></i>
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { followingService } from '../services/FollowingService'
export default {
  props: ['profile'],
  setup(props) {
    return {
      followUser() {
        const newFollow = {
          FollowerId: props.profile.id
        }
        followingService.FollowUser(newFollow)
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
</style>
