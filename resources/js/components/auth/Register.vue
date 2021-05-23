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
			<ValidationObserver ref="form" v-slot="{ passes, invalid }">
				<v-form class="py-12" @submit.prevent="passes(registerUser)">
					<ValidationProvider
						v-slot="{ errors }"
						rules="required|alpha_spaces"
						name="Name"
						vid="name"
					>
						<v-text-field
							color="deep-purple"
							type="text"
							label="Your Name"
							:error-messages="errors"
							v-model="formData.name"
						></v-text-field>
					</ValidationProvider>
					<ValidationProvider
						v-slot="{ errors }"
						rules="required|email"
						name="E-mail"
						vid="email"
					>
						<v-text-field
							color="deep-purple"
							type="email"
							label="Your Email"
							:error-messages="errors"
							v-model="formData.email"
						></v-text-field>
					</ValidationProvider>
					<ValidationObserver>
						<ValidationProvider
							v-slot="{ errors }"
							rules="required|min:8"
							name="Password"
						>
							<v-text-field
								color="deep-purple"
								label="Password"
								type="password"
								:error-messages="errors"
								v-model="formData.password"
							></v-text-field>
						</ValidationProvider>
						<ValidationProvider
							v-slot="{ errors }"
							rules="required|confirmed:Password"
							name="Password Confirmation"
						>
							<v-text-field
								color="deep-purple"
								type="password"
								label="Confirm password"
								:error-messages="errors"
								v-model="formData.password_confirmation"
							></v-text-field>
						</ValidationProvider>
					</ValidationObserver>
					<v-btn
						color="deep-purple"
						type="submit"
						class="white--text font-weight-bold mt-12"
						large
						block
						:disabled="invalid"
						>Create account</v-btn
					>
				</v-form>
			</ValidationObserver>
			<p class="text-center">
				Already have an account?
				<v-btn :to="{ name: 'Login' }" plain text small>
					Sign In
				</v-btn>
			</p>
		</v-card>
	</v-col>
</template>

<script lang="ts">
	import { ValidationProvider, ValidationObserver } from "vee-validate";
	import { Vue, Component } from "vue-property-decorator";

	import AuthService from "@/services/AuthService";
	import { UtilsModule } from "@modules/Utils";
	import { RegisterFormData } from "./types";

	@Component({ components: { ValidationProvider, ValidationObserver } })
	export default class Register extends Vue {
		formData: RegisterFormData = {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		};

		$refs!: {
			form: InstanceType<typeof ValidationObserver>;
		};

		async registerUser(): Promise<void> {
			UtilsModule.setLoading(true);
			try {
				await AuthService.registerUser(this.formData);
				this.$router.push({ name: "Home" });
			} catch (error) {
				const errorsData = error.response.data.errors;
				this.$refs.form.setErrors({
					name: errorsData.name,
					email: errorsData.email,
					Password: errorsData.password,
				});
			}
			UtilsModule.setLoading(false);
		}
	}
</script>

<style>
</style>