<template>
  <div>
    {{ state.profiles }}
  </div>
</template>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
export default {
  setup() {
    const state = reactive({
      profiles: computed(() => AppState.profiles)
    })
    onMounted(async() => {
      await profilesService.getProfiles()
    })
    return {
      state
    }
  }
}
</script>

<style scoped>

</style>
