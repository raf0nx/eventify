<template>
	<v-main class="dashboard">
		<v-dialog
			v-model="showDialog"
			max-width="750px"
			transition="dialog-top-transition"
		>
			<event-stepper
				@closeDialog="showDialog = false"
				@rerenderEvents="getEvents()"
			></event-stepper>
		</v-dialog>
		<div class="container-fluid">
			<v-row>
				<v-col cols="4"><v-spacer></v-spacer></v-col>
				<v-col cols="4">
					<div class="display-2 mt-4 grey--text text--darken-4">
						Events
					</div>
					<action-chips
						@openDialog="showDialog = true"
					></action-chips>
					<template v-if="events">
						<div v-for="event in events" :key="event.name">
							<event :event="event" />
						</div>
					</template>
					<template v-else>
						<v-skeleton-loader
							v-for="i in 10"
							:key="i"
							type="image, text, article, table-cell, table-tfoot"
                            :types="{ 'table-tfoot': 'button@2, avatar@2' }"
                            min-height="590px"
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

	import Event from "@/components/dashboard/event/Event.vue";
	import EventStepper from "@/components/dashboard/event/EventStepper.vue";
	import ActionChips from "@/components/dashboard/ActionChips.vue";
	import { Event as EventModel } from "@/models/Event";
	import EventService from "@/services/EventService";

	@Component({
		components: {
			Event,
			EventStepper,
			ActionChips,
		},
	})
	export default class Dashboard extends Vue {
		events: EventModel[] | null = null;
		showDialog = false;

		async created(): Promise<void> {
			this.getEvents();
		}

		private async getEvents(): Promise<void> {
            setTimeout(async () => {
                const response = await EventService.getEvents();
                this.events = response.data;
            }, 3000000);
		}
	}
</script>

<style>
.dashboard .v-skeleton-loader > .v-skeleton-loader__text {
    margin: 16px;
}
.dashboard .v-skeleton-loader > .v-skeleton-loader__table-cell {
    margin-left: 16px;
}
.dashboard .v-skeleton-loader > .v-skeleton-loader__table-tfoot {
    justify-content: unset;
}
.dashboard .v-skeleton-loader__image {
    height: 300px !important;
}
</style>