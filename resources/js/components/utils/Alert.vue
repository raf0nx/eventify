<template>
	<v-alert
		v-if="alert.showAlert"
		class="mb-2 font-weight-bold d-flex justify-center"
		data-cy="alert"
		border="bottom"
		tile
		dense
		:type="alert.type"
		:dismissible="alert.dismissible"
	>
		{{ alert.message }}
		<v-btn
			v-if="alert.callback"
			@click="alert.callback"
			outlined
			class="ml-4 font-weight-bold"
			small
		>
			{{ alert.btnText }}
		</v-btn>
	</v-alert>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import { UtilsModule } from "@modules/Utils";
	import { AlertModel } from "@/models/Alert";

	@Component
	export default class Alert extends Vue {
		get alert(): AlertModel {
			return UtilsModule.alert;
		}
	}
</script>

<style scoped>
	.v-alert {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>