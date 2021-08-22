<template>
	<div class="my-8">
		<v-chip
			class="mr-2 font-weight-bold"
			color="deep-purple"
			dark
			@click.stop="$emit('openDialog')"
		>
			<v-icon left> mdi-plus-circle </v-icon>
			Create
		</v-chip>
		<v-chip class="mr-2 font-weight-bold" color="deep-purple" outlined>
			<v-icon left> mdi-calendar </v-icon>
			Your events
		</v-chip>
		<v-chip class="mr-2 font-weight-bold" color="deep-purple" dark>
			<v-icon small> mdi-bell </v-icon>
		</v-chip>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	@Component
	export default class ActionChips extends Vue {}
</script>

<style>
</style>