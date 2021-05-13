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
						color="purple"
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
	import "vue-router/types/vue";
	import { mapGetters } from "vuex";
	import { ValidationProvider, ValidationObserver } from "vee-validate";
	import Vue from "vue";
	import Component from "vue-class-component";

	import AuthService from "../../services/AuthService";

	@Component({
		components: { ValidationProvider, ValidationObserver },
		...mapGetters("utils", ["isLoading"]),
	})
	export default class Login extends Vue {

		formData: { email: ""; password: "" };
		$refs!: {
			provider: InstanceType<typeof ValidationProvider>;
		};
        
		async loginUser(): Promise<void> {
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
				const errorsData = error.response.data.errors;
				this.$refs.form.setErrors({
					password: errorsData.password,
				});
			}
			this.$store.commit("utils/SET_LOADING", false);
		}
	}
</script>

<style scoped>
</style>