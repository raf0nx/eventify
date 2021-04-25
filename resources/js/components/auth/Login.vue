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
	import AuthService from "../../services/AuthService";

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
					await AuthService.loginUser(this.formData);
					const authUser = await this.$store.dispatch("auth/getAuthUser");
					if (authUser) {
						this.$router.push({ name: "Home" });
					} else {
						throw new Error("Cannot authenticate user");
					}
				} catch (error) {
					console.log(error);
				}
			},
		},
	};
</script>

<style>
</style>