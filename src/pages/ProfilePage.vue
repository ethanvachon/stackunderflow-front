<template>
  <div class="container" v-if="state.loaded">
    <div class="bg-white rounded p-2">
      {{ state.profile }}
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  props: ['id'],
  setup(props) {
    const state = reactive({
      profile: computed(() => AppState.currentProfile),
      loaded: false
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        await profilesService.getProfile(route.params.id)
        state.loaded = true
      } catch (error) {
        logger.error(error)
      }
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
