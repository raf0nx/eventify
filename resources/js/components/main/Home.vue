<template>
	<v-main>
		<div class="container-fluid" style="height: 1500px">
			<div class="display-1">Home</div>
			<v-btn @click="logout()">Logout</v-btn>
			<v-btn @click="getUser()">Get User</v-btn>
		</div>
	</v-main>
</template>

<script>
	import AuthService from "../../services/AuthService";
	export default {
		methods: {
			logout() {
				this.$store.dispatch("auth/logout");
			},
			async getUser() {
				const user = await AuthService.getAuthUser();
				console.log(user);
			},
		},
	};
</script>

<style>
</style>