<template>
	<v-lazy
		v-model="isActive"
		:options="{
			threshold: 0.5,
		}"
        min-height="200"
		transition="fade-transition"
	>
		<v-card class="my-12" elevation="8">
			<v-img
				lazy-src="https://picsum.photos/id/11/10/6"
				src="https://picsum.photos/id/11/500/300"
				height="300"
			></v-img>

			<v-card-subtitle class="pb-0">
				Event starts on {{ eventStartDate }} at {{ eventStartTime }}
			</v-card-subtitle>

			<v-card-title class="font-weight-bold">{{
				event.name
			}}</v-card-title>

			<v-card-text>
				<div>
					{{ event.description }}
				</div>

				<div class="pt-4">
					{{ event.users.length }} interested &bull; 0 going
				</div>
			</v-card-text>

			<v-card-actions class="py-4">
				<v-btn color="deep-purple" text>
					<v-icon left>mdi-star</v-icon>
					Interested
				</v-btn>
				<v-btn color="deep-purple" class="white--text font-weight-bold">
					<v-icon left>mdi-check-circle</v-icon>
					Going
				</v-btn>

				<v-spacer></v-spacer>

				<v-btn icon>
					<v-tooltip top>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-on="on" v-bind="attrs">mdi-heart</v-icon>
						</template>
						<span>Add to favourites</span>
					</v-tooltip>
				</v-btn>

				<v-btn icon>
					<v-tooltip top>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-on="on" v-bind="attrs">
								mdi-share-variant
							</v-icon>
						</template>
						<span>Share</span>
					</v-tooltip>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-lazy>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from "vue-property-decorator";
	import moment from "moment";

	import { Event as EventModel } from "@/models/Event";

	@Component
	export default class Event extends Vue {
		@Prop()
		event!: EventModel;

        isActive = false;

		get eventStartDate(): string {
			return moment(this.event.start_datetime).format("dddd, MMM Do YYYY");
		}

		get eventStartTime(): string {
			return moment(this.event.start_datetime).format("h a");
		}
	}
</script>

<style>
</style>