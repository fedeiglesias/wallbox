<template>
  <v-container class="view">
    <Register />
  </v-container>
</template>

<script>
import Register from '@/components/auth/Register'

export default {
  name: 'RegisterView',
  components: {
    Register
  }
}
</script>

<style scoped lang="scss">
  @import "@/sass/_view.scss";
</style>