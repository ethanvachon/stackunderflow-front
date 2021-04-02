<template>
  <div>
    test
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
      profile: computed(() => AppState.profile)
    })
    const route = useRoute()
    onMounted(async() => {
      try {
        await profilesService.getProfile(route.params.id)
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
