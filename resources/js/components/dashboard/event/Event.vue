<template>
	<v-col class="col-xs-12 col-sm-6 col-lg-4 col-xl-3">
		<v-lazy
			v-model="isActive"
			:options="{
				threshold: 0.5,
			}"
			min-height="240"
			transition="fade-transition"
		>
			<v-hover v-slot="{ hover }">
				<v-card
					ripple
					class="rounded-lg"
					:elevation="hover ? 12 : 4"
					max-height="480"
					@click="goToEventDetails()"
				>
					<v-img
						lazy-src="https://picsum.photos/id/11/10/6"
						src="https://picsum.photos/id/11/500/300"
						max-height="200"
						class="rounded-t-lg"
					></v-img>

					<v-card-subtitle class="pb-0">
						{{ eventStartDate }} at {{ eventStartTime }}
					</v-card-subtitle>

					<v-card-title class="font-weight-bold">
						<router-link
							:to="{ name: 'Event', params: { id: event.id } }"
							class="
								event__link
								black--text
								text-decoration-none text-truncate
							"
							>{{ event.name }}</router-link
						>
					</v-card-title>

					<v-card-text>
						<v-tooltip bottom max-width="320">
							<template v-slot:activator="{ on, attrs }">
								<div
									class="text-truncate"
									v-on="on"
									v-bind="attrs"
								>
									{{ event.description }}
								</div>
							</template>
							<p class="text-justify mb-0">
								{{ event.description }}
							</p>
						</v-tooltip>
						<div class="pt-4">
							{{ event.users.length }} interested &bull; 0 going
						</div>
					</v-card-text>

					<v-card-actions class="pt-2 pb-4">
						<v-btn
							@click.stop="() => true"
							color="deep-purple"
							text
						>
							<v-icon left>mdi-star</v-icon>
							Interested
						</v-btn>
						<v-btn
							@click.stop="() => true"
							color="deep-purple"
							class="white--text font-weight-bold"
						>
							<v-icon left>mdi-check-circle</v-icon>
							Going
						</v-btn>

						<v-spacer></v-spacer>

						<v-btn icon>
							<v-tooltip top>
								<template v-slot:activator="{ on, attrs }">
									<v-icon
										@click.stop="() => true"
										color="red accent-2"
										v-on="on"
										v-bind="attrs"
										>mdi-heart-outline</v-icon
									>
								</template>
								<span>Add to favourites</span>
							</v-tooltip>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-hover>
		</v-lazy>
	</v-col>
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

		goToEventDetails(): void {
			setTimeout(() => {
				this.$router.push({
					name: "Event",
					params: { id: String(this.event.id) },
				});
			}, 200);
		}
	}
</script>

<style scoped>
	.event__link {
		border-bottom: 2px solid white;
		transition: border-bottom linear 0.5s;
	}
	.event__link:hover {
		border-bottom: 2px solid black;
	}
</style>