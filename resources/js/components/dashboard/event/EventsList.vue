<template>
	<v-col cols="9">
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
		<v-sheet
			class="mt-4 d-flex align-center rounded-lg justify-space-between"
			elevation="6"
			height="60"
		>
			<div
				class="headline grey--text text--darken-4 font-weight-bold ml-6"
			>
				Discover events
			</div>
			<v-tabs class="flex-grow-0 flex-shrink-0 mr-6" color="deep-purple">
				<v-tab class="font-weight-bold">Starting soon</v-tab>
				<v-tab class="font-weight-bold">Most popular</v-tab>
				<v-tab class="font-weight-bold">This week</v-tab>
			</v-tabs>
		</v-sheet>
		<action-chips @openDialog="showDialog = true" />
		<template v-if="events">
			<v-row>
				<event
					v-for="event in events"
					:event="event"
					:key="event.name"
				/>
			</v-row>
		</template>
		<template v-else>
			<v-row class="pr-4">
				<v-col
					v-for="i in 24"
					:key="i"
					class="col-xs-12 col-sm-6 col-lg-4 col-xl-3"
				>
					<v-skeleton-loader
						class="rounded-lg"
						type="image, text, article, table-cell, table-tfoot"
						:types="{
							article: 'heading, text',
							'table-tfoot': 'button@2, table-cell, avatar',
						}"
						max-height="480px"
						elevation="8"
					/>
				</v-col>
			</v-row>
		</template>
	</v-col>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import Event from "@/components/dashboard/event/Event.vue";
	import EventStepper from "@/components/dashboard/event/EventStepper.vue";
	import ActionChips from "@/components/dashboard/event/ActionChips.vue";
	import { Event as EventModel } from "@/models/Event";
	import EventService from "@/services/EventService";

	@Component({
		components: {
			Event,
			EventStepper,
			ActionChips,
		},
	})
	export default class EventsList extends Vue {
		events: EventModel[] | null = null;
		showDialog = false;

		async created(): Promise<void> {
			this.getEvents();
		}

		private async getEvents(): Promise<void> {
			const response = await EventService.getEvents();
			this.events = response.data;
		}
	}
</script>

<style>
	.dashboard .v-tabs {
		width: auto;
	}
	.dashboard .v-skeleton-loader__image {
		max-height: 200px !important;
	}
	.dashboard .v-skeleton-loader > .v-skeleton-loader__text {
		width: 75%;
		margin: 16px 16px 0;
	}
	.dashboard
		.v-skeleton-loader
		> .v-skeleton-loader__article
		> .v-skeleton-loader__heading {
		margin: 24px 0 24px 16px;
	}
	.dashboard
		.v-skeleton-loader
		> .v-skeleton-loader__article
		> .v-skeleton-loader__text {
		margin: 0 16px;
	}
	.dashboard .v-skeleton-loader > .v-skeleton-loader__table-cell {
		width: 124px;
		margin-left: 16px;
	}
	.dashboard .v-skeleton-loader > .v-skeleton-loader__table-tfoot {
		justify-content: unset;
	}
	.dashboard
		.v-skeleton-loader
		> .v-skeleton-loader__table-tfoot
		> .v-skeleton-loader__table-cell {
		flex: 1 1 auto;
		height: 0;
	}
	.dashboard
		.v-skeleton-loader
		> .v-skeleton-loader__table-tfoot
		.v-skeleton-loader__button:first-child {
		margin-left: 0;
	}
	.dashboard
		.v-skeleton-loader
		> .v-skeleton-loader__table-tfoot
		.v-skeleton-loader__button {
		width: 128px;
	}
	.dashboard
		.v-skeleton-loader
		> .v-skeleton-loader__table-tfoot
		> .v-skeleton-loader__avatar {
		flex: 1 0 auto;
	}
</style>