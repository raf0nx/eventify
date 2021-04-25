<template>
  <v-app>
    <router-link :to="{ name: 'Home' }" exact>Home</router-link>
    <router-link :to="{ name: 'Login' }">Login</router-link>
    <router-link :to="{ name: 'Register' }">Register</router-link>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
</style>