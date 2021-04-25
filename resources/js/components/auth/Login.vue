<template>
  <v-main class="d-flex align-center">
    <v-container class="d-flex justify-center" fluid>
      <v-col cols="12" md="6">
        <v-card class="pa-12" elevation="12">
          <v-form>
            <v-text-field
              color="purple"
              type="email"
              label="Email"
              outlined
              v-model="formData.email"
            ></v-text-field>
            <v-text-field
              color="purple"
              type="password"
              label="Password"
              outlined
              v-model="formData.password"
            ></v-text-field>
            <v-btn
              color="purple"
              type="submit"
              large
              dark
              @click.prevent="loginUser()"
              >Login</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/login", this.formData);
        this.$router.push({ name: "Home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>