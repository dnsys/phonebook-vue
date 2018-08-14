<template>
  <div id="app">
    <v-app id="inspire">
      <nav-bar></nav-bar>
      <v-content>
        <v-container fluid fill-height>
            <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {NavBar}
}
</script>

<style scoped>
  @import "../node_modules/animate.css/animate.css";
</style>
