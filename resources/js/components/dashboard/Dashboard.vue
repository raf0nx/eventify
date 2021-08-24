<template>
	<v-main class="dashboard">
		<v-container fluid>
			<v-row class="pr-4 flex-nowrap">
				<v-col cols="3" class="py-0 pl-0"><dashboard-sidebar /></v-col>
				<transition name="scale" mode="out-in">
					<router-view />
				</transition>
			</v-row>
		</v-container>
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