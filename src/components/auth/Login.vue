<template>
    <div class="sheet" v-if="true">
      <div class="sheet-content">
        <h1 class="sheet-title">Login</h1>

          <v-text-field
            label="Username"
            v-model="username"
            :rules="[rules.required]"
            color="#43ba9b"
            :disabled="$store.state.auth.loading"
            hint="Use any username">
          </v-text-field>

          <v-text-field
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
              depressed
              text
              x-large
              :disabled="$store.state.auth.loading"
              @click="$router.push('register')">
              Register
            </v-btn>

            <v-btn
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

<style scoped>
  .sheet {
    margin-top: 200px;
    border-radius: 6px;
    padding: 20px 0px;
    background: rgba(255,255,255, 0.85);
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.7);
    width: 400px;
  }

  .sheet-content {
    display: flex;
    flex-direction: column;
    padding: 30px;
    min-height: 300px;
  }

  .sheet-title {
    font-weight: 200;
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
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

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
