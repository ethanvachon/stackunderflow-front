<template>
  <div class="container" v-if="state.loaded">
    <div class="row">
      <profile v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
    </div>
  </div>
</template>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
export default {
  setup() {
    const state = reactive({
      profiles: computed(() => AppState.profiles),
      loaded: false
    })
    onMounted(async() => {
      await profilesService.getProfiles()
      state.loaded = true
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
@import '../assets/tailwind.css';
</style>
