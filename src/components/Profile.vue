<template>
  <div class="col-4 my-4">
    <div class="my-1 flex bg-white rounded shadow p-2">
      <img :src="profile.picture" class="rounded-full h-12">
      <h1>{{ profile.name }}</h1>
    </div>
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
</style>
