<template>
	<h1>Welcome from event details</h1>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import { Event as EventModel } from "@/models/Event";
	import EventService from "@/services/EventService";

	@Component
	export default class EventDetails extends Vue {
		eventID: number | null = null;
		event: EventModel | null = null;

		async created() {
            this.eventID = +this.$route.params.id;

			const response = await EventService.getEvent(this.eventID);
			this.event = response.data;
		}
	}
</script>

<style>
</style>