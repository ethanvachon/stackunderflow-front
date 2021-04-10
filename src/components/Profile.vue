<template>
  <div class="col-4 my-4">
    <router-link :to="{name: 'ProfilePage', params: {id: profile.id}}">
      <div class="my-1 flex items-center bg-white rounded shadow p-2">
        <img :src="profile.picture" class="rounded-full h-12">
        <h1 class="pl-2">
          {{ profile.name }}
        </h1>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['profile'],
  setup(props) {
    return {

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
