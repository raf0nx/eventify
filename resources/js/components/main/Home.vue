<template>
  <div class="container-fluid">
    <div class="display-1">Home</div>
    <v-btn @click="logout()">Logout</v-btn>
    <v-btn @click="getUser()">Get User</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await axios.post("/logout");
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.log(error);
      }
    },
    async getUser() {
      const user = await axios.get("api/user");
      console.log(user);
    }
  },
};
</script>

<style>
</style>