<template>
  <div class="sheet">
    <div>
      <h1 text-align="center">Login</h1>

      <v-text-field
        id="username"
        label="Username"
        v-model="username"
        :rules="[rules.required]"
        color="#43ba9b"
        :disabled="$store.state.auth.loading"
        hint="Use any username">
      </v-text-field>

      <v-text-field
        id="password"
        v-model="password"
        color="#43ba9b"
        :rules="[rules.required]"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        hint="Use any password"
        :disabled="$store.state.auth.loading"
        @click:append="showPassword = !showPassword">
      </v-text-field>

      <div class="sheet-actions">
        <v-btn
          id="register"
          depressed
          text
          x-large
          :disabled="$store.state.auth.loading"
          @click="$router.push('register')">
          Register
        </v-btn>

        <v-btn
          id="login"
          :dark="valid()" color="#43ba9b"
          depressed
          x-large
          :loading="$store.state.auth.loading"
          @click="login({username,password})"
          :disabled="!valid()">
          Sign in
        </v-btn>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: '',
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  components: {
  },
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn'
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    valid () {
      return !!(this.username.trim() && this.password.trim())
    }
  }
}
</script>

<style scoped lang="scss">
  @import "@/sass/_sheet.scss";

  .sheet {
    max-width: 450px;
  }

  .sheet-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    height: 50px;
  }

  .sheet-actions > *{
      margin: 10px;
  }

</style>
