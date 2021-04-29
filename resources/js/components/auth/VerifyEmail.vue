<template>
	<v-main class="d-flex align-center">
		<v-container class="d-flex justify-center" fluid>
			<v-btn @click="resendVerificationLink()">Resend email verification link<v-btn>
		</v-container>
	</v-main>
</template>

<script>
	import AuthService from "../../services/AuthService";
	export default {
		computed: {
			userId() {
				const authUser = this.$store.getters["auth/authUser"];
				return authUser.id;
			},
		},
		methods: {
			async resendVerificationLink() {
				try {
					await AuthService.sendVerification(this.userId);
					console.log("Sent!");
				} catch (error) {
					console.log(error);
				}
			},
		},
	};
</script>

<style>
</style>