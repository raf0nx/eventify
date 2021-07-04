<template>
	<v-app>
		<v-system-bar
			v-if="alert"
			color="orange darken-2"
			class="font-weight-bold justify-center white--text"
			data-cy="system_bar"
			app
			window
		>
			<v-icon class="white--text">mdi-alert</v-icon>
			Email not verified! Check your inbox at {{ userEmail }}
			<v-btn
				@click="resendVerificationLink()"
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

	import AuthService from "@/services/AuthService";
	import { AuthModule } from "@modules/Auth";
	import { Snackbar, UtilsModule } from "@modules/Utils";
	import { User } from "@/models/User";

	@Component
	export default class App extends Vue {
		get authUser(): User | null {
			return AuthModule.authUser;
		}

		get snackbar(): Snackbar {
			return UtilsModule.snackbar;
		}

		get userEmail(): string | null {
			return this.authUser ? this.authUser.email : null;
		}

		get alert(): boolean {
			return UtilsModule.alert;
		}

		get loader(): boolean {
			return UtilsModule.loader;
		}

		get userId(): Number | null {
			return this.authUser ? this.authUser.id : null;
		}

		async resendVerificationLink(): Promise<void> {
			UtilsModule.setLoading(true);
			try {
				await AuthService.sendVerification(this.userId);
				UtilsModule.setSnackbar({
					showSnackbar: true,
					message: "Verification Link resend successfully!",
				});
			} catch (error: unknown) {
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