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
				Sign In
			</h1>
			<v-form class="py-12">
				<ValidationProvider v-slot="{ errors }" rules="required|email" name="Email">
					<v-text-field
						color="deep-purple"
						type="email"
						label="Email Address"
                        :error-messages="errors"
						v-model="formData.email"
					></v-text-field>
				</ValidationProvider>
				<ValidationProvider v-slot="{ errors }" rules="required" name="Password">
					<v-text-field
						color="deep-purple"
						type="password"
						label="Password"
                        :error-messages="errors"
						v-model="formData.password"
					></v-text-field>
				</ValidationProvider>
				<v-btn
					color="purple"
					type="submit"
					class="white--text font-weight-bold mt-12"
					large
					block
					@click.prevent="loginUser()"
					>Continue</v-btn
				>
			</v-form>
			<p class="text-center">
				Don't have an account?
				<v-btn :to="{ name: 'Register' }" plain text small>
					Sign up
				</v-btn>
			</p>
		</v-card>
	</v-col>
</template>

<script>
	import { mapGetters } from "vuex";
	import { ValidationProvider } from "vee-validate";

	import AuthService from "../../services/AuthService";

	export default {
		components: {
			ValidationProvider,
		},
		data() {
			return {
				formData: {
					email: "",
					password: "",
				},
			};
		},
		computed: {
			...mapGetters("utils", ["isLoading"]),
		},
		methods: {
			async loginUser() {
				this.$store.commit("utils/SET_LOADING", true);
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
				this.$store.commit("utils/SET_LOADING", false);
			},
		},
	};
</script>

<style scoped>
</style>