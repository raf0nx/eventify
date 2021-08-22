<template>
	<v-main class="dashboard">
		<div class="container-fluid">
			<v-row class="pr-4">
				<v-col cols="3"><dashboard-sidebar /></v-col>
				<transition name="scale" mode="out-in">
					<router-view />
				</transition>
			</v-row>
		</div>
	</v-main>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import DashboardSidebar from "@components/dashboard/DashboardSidebar.vue";

	@Component({ components: { DashboardSidebar } })
	export default class Dashboard extends Vue {}
</script>

<style>
</style>