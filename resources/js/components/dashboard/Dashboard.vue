<template>
	<v-main>
		<div class="container-fluid">
			<v-row>
				<v-col cols="4"><v-spacer></v-spacer></v-col>
				<v-col cols="4">
					<div class="display-2 mt-4 grey--text text--darken-4">
						Events
					</div>
					<v-chip
						class="mr-2 mt-4 font-weight-bold"
						color="deep-purple"
						dark
					>
						<v-icon left> mdi-plus-circle </v-icon>
						Create
					</v-chip>
					<v-chip
						class="mr-2 mt-4 font-weight-bold"
						color="deep-purple"
						outlined
					>
						<v-icon left> mdi-calendar </v-icon>
						Your events
					</v-chip>
					<v-chip
						class="mr-2 mt-4 font-weight-bold"
						color="deep-purple"
						dark
					>
						<v-icon small> mdi-bell </v-icon>
					</v-chip>
					<template v-if="events">
						<div v-for="event in events" :key="event.name">
							<event :event="event" />
						</div>
					</template>
					<template v-else>
						<v-skeleton-loader
							v-for="i in 10"
							:key="i"
							type="image, article, actions"
							class="my-12"
							elevation="8"
						></v-skeleton-loader>
					</template>
				</v-col>
				<v-col cols="4"></v-col>
			</v-row>
		</div>
	</v-main>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import Event from "@components/dashboard/Event.vue";
	import { Event as EventModel } from "@/models/Event";
	import EventService from "@/services/EventService";

	@Component({
		components: {
			Event,
		},
	})
	export default class Dashboard extends Vue {
		events: EventModel[] | null = null;

		async created(): Promise<void> {
			const response = await EventService.getEvents();
			this.events = response.data;
		}
	}
</script>

<style>
</style>