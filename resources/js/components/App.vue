<template>
	<v-app>
		<v-alert
			v-if="showAlert"
			class="rounded-0 font-weight-bold text-center white--text"
			color="orange"
			elevation="2"
			dense
		>
			Email not verified! Check your inbox at {{ userEmail }}
			<v-btn
				:to="{ name: 'VerifyEmail' }"
				plain
				text
				class="white--text font-weight-bold"
				small
			>
				Resend link
			</v-btn>
		</v-alert>
		<router-link :to="{ name: 'Home' }" exact>Home</router-link>
		<router-link :to="{ name: 'Login' }">Login</router-link>
		<router-link :to="{ name: 'Register' }">Register</router-link>
		<router-view></router-view>
	</v-app>
</template>

<script>
	export default {
		computed: {
			showAlert() {
				return this.$store.getters["auth/showAlert"];
			},
			userEmail() {
				const userObj = this.$store.getters["auth/authUser"];
				return userObj ? userObj.email : null;
			},
		},
	};
</script>

<style scoped>
</style>