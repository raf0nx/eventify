<template>
	<v-app>
		<v-system-bar
			v-if="alert"
			color="orange darken-2"
			class="font-weight-bold justify-center white--text"
			app
			window
		>
			<v-icon class="white--text">mdi-alert</v-icon>
			Email not verified! Check your inbox at {{ userEmail }}
			<v-btn
				@click="resendVerificationLink"
				plain
				text
				class="white--text font-weight-bold"
				small
			>
				Resend link
			</v-btn>
		</v-system-bar>
		<v-snackbar
			v-model="snackbar.showSnackbar"
			fixed
			bottom
			color="deep-purple"
			class="mb-12"
		>
			<div class="d-flex align-center">
				<v-icon color="white">mdi-check-circle</v-icon>
				<span class="font-weight-bold ml-1">{{
					snackbar.message
				}}</span>
			</div>
		</v-snackbar>
		<v-overlay :value="loader">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
		<transition name="scale" mode="out-in" appear>
			<router-view></router-view>
		</transition>
	</v-app>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import * as AuthService from "@/services/AuthService.ts";
	import { AuthModule } from "@modules/Auth.ts";
	import { UtilsModule } from "@modules/Utils.ts";

	@Component({})
	export default class App extends Vue {
		get authUser() {
			return AuthModule.authUser;
		}

		get snackbar() {
			return UtilsModule.snackbar;
		}

		get userEmail() {
			return this.authUser ? this.authUser.email : null;
		}

		get alert() {
			return UtilsModule.alert;
		}

		get loader() {
			return UtilsModule.loader;
		}

		get userId() {
			return this.authUser ? this.authUser.id : null;
		}

		async resendVerificationLink() {
			UtilsModule.setLoading(true);
			try {
				await AuthService.sendVerification(this.userId);
				UtilsModule.setSnackbar({
					showSnackbar: true,
					message: "Verification Link resend successfully!",
				});
			} catch (error) {
				console.log(error);
			}
			UtilsModule.setLoading(false);
		}
	}
</script>

<style>
	.scale-enter-active,
	.scale-leave-active {
		transition: all 0.5s ease;
	}

	.scale-enter,
	.scale-leave-to {
		opacity: 0;
		transform: scale(0.9);
	}
</style>