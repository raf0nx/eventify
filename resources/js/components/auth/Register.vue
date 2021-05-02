<template>
	<v-col
		cols="12"
		md="5"
		class="d-flex flex-column justify-center px-12"
		dark
	>
		<v-card elevation="0">
			<h1
				class="main-title font-weight-bold deep-purple--text text--darken-4"
			>
				Create a new account
			</h1>
			<v-form class="py-12">
				<v-text-field
					color="deep-purple"
					type="text"
					label="Your Name"
					v-model="formData.name"
				></v-text-field>
				<v-text-field
					color="deep-purple"
					type="email"
					label="Your Email"
					v-model="formData.email"
				></v-text-field>
				<v-text-field
					color="deep-purple"
					label="Password"
					type="password"
					v-model="formData.password"
				></v-text-field>
				<v-text-field
					color="deep-purple"
					type="password"
					label="Confirm password"
					v-model="formData.password_confirmation"
				></v-text-field>
				<v-btn
					color="purple"
					type="submit"
					class="white--text font-weight-bold mt-12"
					large
					block
					@click.prevent="registerUser()"
					>Create account</v-btn
				>
			</v-form>
			<p class="text-center">
				Already have an account?
				<v-btn :to="{ name: 'Login' }" plain text small>
					Sign In
				</v-btn>
			</p>
		</v-card>
	</v-col>
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
				this.$store.commit("auth/SET_LOADING", true);
				try {
					await AuthService.registerUser(this.formData);
					this.$router.push({ name: "Home" });
				} catch (error) {
					console.log(error);
				}
				this.$store.commit("auth/SET_LOADING", false);
			},
		},
	};
</script>

<style>
</style>