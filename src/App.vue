<template>
    <v-app class="app">
      <app-bar></app-bar>
      <v-content class="content">
        <v-container class="container">
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import AppBar from './components/AppBar'

export default {
  name: 'App',
  components: {
    AppBar
  }
}
</script>

<style>

body {
  background-image: url(./assets/bg1.png);
  background-repeat: repeat;

}

body::before {
  content: '';
  position: absolute;
  background-image: url(./assets/space1.jpg);
  background-size: cover;
  box-shadow: inset 0px -5px 10px rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid #161616;
  width: 100%;
  height: 400px;
}

.container {
  display: flex;
  justify-content: center;
}

.app {
  background: transparent !important;
}

</style>
