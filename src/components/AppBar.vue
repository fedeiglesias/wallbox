<template>
  <v-app-bar
    fixed dark
    color="rgba(20, 20, 20, 0.9)">
    <div class="container">
      <img src="../assets/logo.svg" class="logo">

      <v-spacer></v-spacer>

      <div v-show="loggedIn()">
        <v-tooltip bottom color="rgba(0,0,0,0.8)">
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
              @click="showAddDialog">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add Book</span>
        </v-tooltip>
      </div>

      <v-tooltip bottom color="rgba(0,0,0,0.8)">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            href="http://linkedin.fedeiglesias.com">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </template>
        <span>About me</span>
      </v-tooltip>

      <v-tooltip bottom color="rgba(0,0,0,0.8)">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            href="https://github.com/fedeiglesias/wallbox">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>
        <span>Git Project</span>
      </v-tooltip>

    <div v-show="loggedIn()">
      <v-tooltip bottom color="rgba(0,0,0,0.8)" v-if="loggedIn()">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </div>

    </div>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions({
      showAddDialog: 'books/showAddDialog',
      logout: 'auth/logout'
    }),
    ...mapGetters({
      loggedIn: 'auth/loggedIn'
    })
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .logo {
    height: 90%;
  }
</style>
