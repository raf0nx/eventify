<template>
	<v-app>
		<v-system-bar
			v-if="showAlert"
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
			v-model="snackbarNotify.showSnackbar"
			fixed
			bottom
			color="deep-purple"
			class="mb-12"
		>
			<div class="d-flex align-center">
				<v-icon color="white">mdi-check-circle</v-icon>
				<span class="font-weight-bold ml-1">{{
					snackbarNotify.message
				}}</span>
			</div>
		</v-snackbar>
		<v-overlay :value="isLoading">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
		<transition name="scale" mode="out-in" appear>
			<router-view></router-view>
		</transition>
	</v-app>
</template>

<script>
	import { mapGetters } from "vuex";

	import AuthService from "../services/AuthService";

	export default {
		computed: {
			...mapGetters("auth", ["authUser"]),
			...mapGetters("utils", ["showAlert", "isLoading", "snackbarNotify"]),
			userEmail() {
				return this.authUser ? this.authUser.email : null;
			},
			userId() {
				return this.authUser ? this.authUser.id : null;
			},
		},
		methods: {
			async resendVerificationLink() {
				this.$store.commit("utils/SET_LOADING", true);
				try {
					await AuthService.sendVerification(this.userId);
					this.$store.dispatch("utils/setSnackbar", {
						showSnackbar: true,
						message: "Verification Link resend successfully!",
					});
				} catch (error) {
					console.log(error);
				}
				this.$store.commit("utils/SET_LOADING", false);
			},
		},
	};
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