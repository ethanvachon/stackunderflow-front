<template>
  <div class="col-3 my-3">
    <router-link :to="{name: 'ProfilePage', params: {id: profile.id}}">
      <div class="my-1 justify-end bg-white rounded shadow px-2 pb-2">
        <div class="flex justify-center items-center pb-1 pt-1">
          <p>{{ profile.name }}</p>
        </div>
        <div class="flex items-center justify-around">
          <img :src="profile.picture" class="rounded-full h-10">
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
