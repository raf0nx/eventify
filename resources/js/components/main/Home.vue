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
			logout() {
				this.$store.dispatch("auth/logout");
			},
			async getUser() {
				const user = await axios.get("api/user");
				console.log(user);
			},
		},
	};
</script>

<style>
</style>