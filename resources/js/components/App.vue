<template>
	<v-app>
		<template v-if="user">
			<div class="sticky">
				<alert></alert>
				<navbar></navbar>
			</div>
			<snackbar></snackbar>
			<navbar-drawer></navbar-drawer>
		</template>
		<v-overlay z-index="999" :value="loader">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
		<transition name="scale" mode="out-in" appear>
			<router-view></router-view>
		</transition>
	</v-app>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import Snackbar from "@components/utils/Snackbar.vue";
	import Alert from "@components/utils/Alert.vue";
	import Navbar from "@components/utils/Navbar.vue";
	import NavbarDrawer from "@components/utils/NavbarDrawer.vue";
	import { UtilsModule } from "@/store/modules/Utils";
	import { AuthModule } from "@/store/modules/Auth";
	import { User } from "@/models/User";

	@Component({
		components: {
			Snackbar,
			Alert,
			Navbar,
			NavbarDrawer,
		},
	})
	export default class App extends Vue {
		get loader(): boolean {
			return UtilsModule.loader;
		}

		get user(): User | null {
			return AuthModule.authUser ?? null;
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
	.sticky {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>