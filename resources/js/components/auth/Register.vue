<template>
	<v-main class="d-flex align-center">
		<v-container class="d-flex justify-center" fluid>
			<v-col cols="12" md="6">
				<v-card class="pa-12" elevation="12">
					<v-form>
						<v-text-field
							color="purple"
							type="text"
							label="Name"
							outlined
							v-model="formData.name"
						></v-text-field>
						<v-text-field
							color="purple"
							type="email"
							label="Email"
							outlined
							v-model="formData.email"
						></v-text-field>
						<v-text-field
							color="purple"
							label="Password"
							type="password"
							outlined
							v-model="formData.password"
						></v-text-field>
						<v-text-field
							color="purple"
							type="password"
							label="Confirm password"
							outlined
							v-model="formData.password_confirmation"
						></v-text-field>
						<v-btn
							color="purple"
							type="submit"
							large
							dark
							@click.prevent="registerUser()"
							>Register</v-btn
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
					name: "",
					email: "",
					password: "",
					password_confirmation: "",
				},
			};
		},
		methods: {
			async registerUser() {
				try {
					await AuthService.registerUser(this.formData);
					this.$store.commit("alert/SET_ALERT", `Account verification mail sent to ${this.formData.email}!`);
					this.$router.push({ name: "Login" });
				} catch (error) {
					console.log(error);
				}
			},
		},
	};
</script>

<style>
</style>