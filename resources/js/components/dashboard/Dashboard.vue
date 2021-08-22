<template>
	<v-main class="dashboard">
		<div class="container-fluid">
			<v-row class="pr-4">
				<v-col cols="3"><v-spacer></v-spacer></v-col>
				<transition name="scale" mode="out-in">
					<router-view />
				</transition>
			</v-row>
		</div>
	</v-main>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	@Component
	export default class Dashboard extends Vue {}
</script>

<style>
</style>