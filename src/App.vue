<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <Messages class="position" v-if="user.isAuthenticated" />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f2f2f2
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(177, 177, 177);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(146, 146, 146);
}

.position {
  position: fixed;
  bottom: 0px;
  right: 20px;
  border: black 1px solid;
  border-bottom: 0px;
}
</style>
