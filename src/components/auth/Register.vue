<template>
  <div class="sheet">
    <div>
      <h1 text-align="center">Register</h1>

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

<style scoped lang="scss">
  @import "./../../sass/_sheet.scss";

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
