<template>
	<v-app>
		<v-alert
			v-if="showAlert"
			border="left"
			colored-border
			color="deep-purple accent-4"
			elevation="2"
			dense
			dismissible
			>{{ message }}</v-alert
		>
		<router-link :to="{ name: 'Home' }" exact>Home</router-link>
		<router-link :to="{ name: 'Login' }">Login</router-link>
		<router-link :to="{ name: 'Register' }">Register</router-link>
		<router-view></router-view>
	</v-app>
</template>

<script>
	export default {
		computed: {
			message() {
				return this.$store.getters["alert/message"];
			},
			showAlert() {
				return this.$store.getters["alert/showAlert"];
			},
		},
	};
</script>

<style scoped>
</style>