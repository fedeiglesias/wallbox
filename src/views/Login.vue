<template>
  <v-container class="view">
    <Login />
  </v-container>
</template>

<script>
import Login from '@/components/auth/Login'

export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>

<style scoped lang="scss">
  @import "@/sass/_view.scss";
</style>