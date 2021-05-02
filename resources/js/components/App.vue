<template>
	<v-app>
		<v-system-bar
			v-if="showAlert"
			color="orange darken-1"
			class="font-weight-bold justify-center white--text"
			app
			window
		>
			<v-icon class="white--text">mdi-alert</v-icon>
			Email not verified! Check your inbox at {{ userEmail }}
			<v-btn
				:to="{ name: 'VerifyEmail' }"
				plain
				text
				class="white--text font-weight-bold"
				small
			>
				Resend link
			</v-btn>
		</v-system-bar>
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
	export default {
		computed: {
			...mapGetters("auth", ["showAlert", "isLoading", "authUser"]),
			userEmail() {
				return this.authUser ? this.authUser.email : null;
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