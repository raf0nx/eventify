<template>
	<v-main>
		<div class="container-fluid">
			<v-row>
				<v-col cols="4"><v-spacer></v-spacer></v-col>
				<v-col cols="4">
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
	import axios from "axios";

	import Event from "@components/dashboard/Event.vue";
	import { Event as EventModel } from "@/models/Event";

	@Component({
		components: {
			Event,
		},
	})
	export default class Dashboard extends Vue {
		events: EventModel[] | null = null;

		async created(): Promise<void> {
			const response = await axios.get("/api/events");
			this.events = response.data;
		}
	}
</script>

<style>
</style>