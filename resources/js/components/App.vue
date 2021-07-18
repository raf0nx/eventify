<template>
	<v-app>
		<alert></alert>
		<snackbar></snackbar>
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

	import Snackbar from "@components/utils/Snackbar.vue";
	import Alert from "@components/utils/Alert.vue";
	import { UtilsModule } from "@/store/modules/Utils";

	@Component({
		components: {
			Snackbar,
			Alert,
		},
	})
	export default class App extends Vue {
		get loader(): boolean {
			return UtilsModule.loader;
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