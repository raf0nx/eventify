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
			<ValidationObserver ref="form" v-slot="{ passes, invalid }">
				<v-form class="py-12" @submit.prevent="passes(loginUser)">
					<ValidationProvider
						v-slot="{ errors }"
						rules="required|email"
						name="Email"
					>
						<v-text-field
							color="deep-purple"
							type="email"
							label="Email Address"
							:error-messages="errors"
							v-model="formData.email"
						></v-text-field>
					</ValidationProvider>
					<ValidationProvider
						v-slot="{ errors }"
						rules="required"
						name="Password"
						vid="password"
					>
						<v-text-field
							color="deep-purple"
							type="password"
							label="Password"
							:error-messages="errors"
							v-model="formData.password"
						></v-text-field>
					</ValidationProvider>
					<v-btn
						color="deep-purple"
						type="submit"
						class="white--text font-weight-bold mt-12"
						large
						block
						:disabled="invalid"
						>Continue</v-btn
					>
				</v-form>
			</ValidationObserver>
			<p class="text-center">
				Don't have an account?
				<v-btn :to="{ name: 'Register' }" plain text small>
					Sign up
				</v-btn>
			</p>
		</v-card>
	</v-col>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import { ValidationProvider, ValidationObserver } from "vee-validate";

	import * as AuthService from "@/services/AuthService.ts";
	import { AuthModule } from "@modules/Auth.ts";
	import { UtilsModule } from "@modules/Utils.ts";

	@Component({
		components: { ValidationProvider, ValidationObserver },
	})
	export default class Login extends Vue {
		formData = { email: "", password: "" };
		$refs!: {
			form: InstanceType<typeof ValidationObserver>;
		};

		async loginUser(): Promise<void> {
			UtilsModule.setLoading(true);
			try {
				await AuthService.loginUser(this.formData);
				const authUser = await AuthModule.getAuthUser();
				if (authUser) {
					this.$router.push({ name: "Home" });
				} else {
					throw new Error("Cannot authenticate user");
				}
			} catch (error) {
				const errorsData = error.response.data.errors;
				this.$refs.form.setErrors({
					password: errorsData.password,
				});
			}
			UtilsModule.setLoading(false);
		}
	}
</script>

<style scoped>
</style>