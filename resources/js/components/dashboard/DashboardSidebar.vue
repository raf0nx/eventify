<template>
	<v-card class="dashboard__sidebar" tile elevation="4">
		<v-list class="px-4" flat>
			<v-card-title class="headline font-weight-bold px-0 py-1"
				>Events</v-card-title
			>
			<v-autocomplete
				class="mt-2"
				placeholder="Search for events"
				dense
				filled
				rounded
				prepend-inner-icon="mdi-magnify"
				color="deep-purple"
			/>
			<v-divider />
			<v-list-item-group
				class="pt-2 pb-16"
				multiple
				active-class="deep-purple--text text--darken-4"
			>
				<v-list-item>
					<template v-slot:default="{ active }">
						<v-list-item-icon>
							<v-icon>mdi-web</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>Online</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<v-switch
								:input-value="active"
								color="deep-purple"
								inset
							></v-switch>
						</v-list-item-action>
					</template>
				</v-list-item>
				<v-list-item>
					<template v-slot:default="{ active }">
						<v-list-item-icon>
							<v-icon>mdi-cash-100</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>Paid</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<v-switch
								:input-value="active"
								color="deep-purple"
								inset
							></v-switch>
						</v-list-item-action>
					</template>
				</v-list-item>
				<v-list-group prepend-icon="mdi-map-marker">
					<template v-slot:activator>
						<v-list-item-title>Location</v-list-item-title>
					</template>
					<v-autocomplete
						class="px-4 py-2"
						placeholder="Select a city"
						dense
						filled
						rounded
						prepend-inner-icon="mdi-magnify"
						color="deep-purple"
						hide-details
					></v-autocomplete>
				</v-list-group>
				<v-list-group prepend-icon="mdi-calendar">
					<template v-slot:activator>
						<v-list-item-title>Dates</v-list-item-title>
					</template>
					<template v-for="(date, idx) in dates">
						<v-list-item :key="idx">
							<template v-slot:default="{ active }">
								<v-list-item-content>
									<v-list-item-title
										v-text="date"
									></v-list-item-title>
								</v-list-item-content>

								<v-list-item-action>
									<v-checkbox
										:input-value="active"
										color="deep-purple"
										inset
									></v-checkbox>
								</v-list-item-action>
							</template>
						</v-list-item>
					</template>
				</v-list-group>
				<v-list-group prepend-icon="mdi-format-list-bulleted">
					<template v-slot:activator>
						<v-list-item-title>Categories</v-list-item-title>
					</template>
					<template v-for="(category, idx) in categories">
						<v-list-item :key="idx">
							<template v-slot:default="{ active }">
								<v-list-item-content>
									<v-list-item-title
										v-text="category"
									></v-list-item-title>
								</v-list-item-content>

								<v-list-item-action>
									<v-checkbox
										:input-value="active"
										color="deep-purple"
										inset
									></v-checkbox>
								</v-list-item-action>
							</template>
						</v-list-item>
					</template>
				</v-list-group>
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	@Component
	export default class DashboardSidebar extends Vue {
		categories = [
			"Charity",
			"Concert",
			"Dance",
			"Drinks",
			"Education",
			"Fitness",
			"Food",
			"Games",
			"Health",
			"Lifestyle",
			"Literature",
			"Movies",
			"Music",
			"Other",
			"Party",
			"Religion",
			"Shopping",
			"Sport",
		];
		dates = [
			"Today",
			"Tomorrow",
			"This week",
			"This weekend",
			"Next week",
			"Next weekend",
			"Next month",
		];
	}
</script>

<style>
	.dashboard__sidebar {
		position: sticky !important;
		top: 64px;
		height: 100vh;
		overflow: auto;
	}
	.dashboard__sidebar
		.v-text-field--rounded
		> .v-input__control
		> .v-input__slot {
		padding: 0 12px;
	}
</style>