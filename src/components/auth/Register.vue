<template>
    <div class="sheet" v-if="true">
      <div class="sheet-content">
        <h1 class="sheet-title">Register</h1>

          <v-text-field
            label="Email"
            v-model="email"
            color="#43ba9b"
            :disabled="$store.state.auth.loading"
            :rules="[rules.required]"
            hint="Use any email">
          </v-text-field>

          <v-text-field
            label="First Name"
            v-model="firstName"
            color="#43ba9b"
            :rules="[rules.required]">
          </v-text-field>

          <v-text-field
            label="Last Name"
            v-model="lastName"
            color="#43ba9b"
            :rules="[rules.required]">
          </v-text-field>

          <v-text-field
            v-model="password"
            color="#43ba9b"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="Use any password"
            :rules="[rules.required]"
            :disabled="$store.state.auth.loading"
            @click:append="showPassword = !showPassword">
          </v-text-field>

          <v-text-field
            v-model="reEnterPassword"
            color="#43ba9b"
            :append-icon="showReEnterPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showReEnterPassword ? 'text' : 'password'"
            label="Re-enter Password"
            :rules="[rules.required, rules.passwordMatch]"
            :disabled="$store.state.auth.loading"
            @click:append="showReEnterPassword = !showReEnterPassword">
          </v-text-field>

          <div class="sheet-actions">
            <v-btn
              depressed
              text
              x-large
              :disabled="$store.state.auth.loading"
              @click="$router.push('login')">
              Back
            </v-btn>

            <v-btn
              dark color="#43ba9b"
              depressed
              x-large>
              Register
            </v-btn>
          </div>

      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      reEnterPassword: '',
      showPassword: false,
      showReEnterPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        passwordMatch: value =>
          value !== this.password ? 'The paswords you entered don\'t match' : true
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
