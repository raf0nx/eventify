<template>
	<v-snackbar
		v-model="snackbar.showSnackbar"
		app
		fixed
		top
		right
		:color="snackbar.color"
	>
		<div class="d-flex align-center">
			<v-icon color="white">{{ snackbar.icon }}</v-icon>
			<span class="font-weight-bold ml-2">{{ snackbar.message }}</span>
		</div>
	</v-snackbar>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import { UtilsModule } from "@modules/Utils";
	import { SnackbarModel } from "@/models/Snackbar";

	@Component
	export default class Snackbar extends Vue {
		get snackbar(): SnackbarModel {
			return UtilsModule.snackbar;
		}
	}
</script>

<style>
</style>