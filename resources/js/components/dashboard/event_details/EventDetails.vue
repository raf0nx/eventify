<template>
	<div class="details flex-grow-1 flex-shrink-0">
		<v-card elevation="4" width="100%" class="px-16">
			<v-img
				lazy-src="https://picsum.photos/id/11/10/6"
				src="https://picsum.photos/id/11/500/300"
				max-width="60%"
				max-height="400px"
				class="rounded-b-lg rounded-t-0 mx-auto"
			></v-img>
			<v-card-subtitle
				class="pt-6 py-0 subtitle-1 red--text accent-2 font-weight-bold"
				>{{ formattedEventDate }}</v-card-subtitle
			>
			<v-card-title
				class="
					pt-0
					display-1
					font-weight-bold
					grey--text
					text--darken-4
				"
				>{{ event.name }}</v-card-title
			>
			<v-divider />
			<div class="pt-2 d-flex justify-space-between">
				<v-tabs v-model="currentTab" color="deep-purple">
					<v-tab class="font-weight-bold">Information</v-tab>
					<v-tab class="font-weight-bold">Discussion</v-tab>
				</v-tabs>
				<div class="details__buttons">
					<v-btn
						class="font-weight-bold mr-1"
						color="deep-purple"
						outlined
						><v-icon left>mdi-star</v-icon>Interested</v-btn
					>
					<v-btn
						class="font-weight-bold mr-1"
						color="deep-purple"
						outlined
						><v-icon left>mdi-check-circle</v-icon>Going</v-btn
					>
					<v-btn
						class="font-weight-bold mr-1"
						color="deep-purple"
						outlined
						><v-icon left>mdi-email</v-icon>Invite</v-btn
					>
					<v-btn color="deep-purple" dark
						><v-icon>mdi-share</v-icon></v-btn
					>
				</div>
			</div>
		</v-card>
		<v-tabs-items v-model="currentTab" class="px-16 mt-2">
			<v-tab-item class="my-2">
				<v-row>
					<v-col cols="7">
						<v-card elevation="4">
							<v-card-title
								class="
									headline
									font-weight-bold
									grey--text
									text--darken-4
								"
								>Details</v-card-title
							>
							<v-list>
								<v-list-item>
									<v-list-item-icon class="mr-4"
										><v-icon
											>mdi-account-multiple</v-icon
										></v-list-item-icon
									>
									<v-list-item-content
										>{{ event.users.length }} users
										replied</v-list-item-content
									>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon class="mr-4"
										><v-icon
											>mdi-flag</v-icon
										></v-list-item-icon
									>
									<v-list-item-content
										>Admin event</v-list-item-content
									>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon class="mr-4"
										><v-icon
											>mdi-web</v-icon
										></v-list-item-icon
									>
									<v-list-item-content
										>Public &bull; Anyone on or off
										Eventify</v-list-item-content
									>
								</v-list-item>
							</v-list>
							<v-card-text
								class="
									details__description
									pt-2
									px-6
									text-justify
								"
							>
								<vue-show-more-text
									:text="event.description"
									:lines="4"
									additional-container-css="padding: 0;"
									additional-anchor-css="text-align: center; color: #673ab7; margin: 0 auto; width: fit-content;"
								/>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="5">
						<v-card elevation="4">
							<v-card-title
								class="
									headline
									font-weight-bold
									grey--text
									text--darken-4
								"
								>Invite people</v-card-title
							>
							<div class="d-flex align-center justify-center">
								<v-btn
									class="
										details__activityButton
										font-weight-bold
										title
										py-10
									"
									elevation="0"
									text
									x-large
								>
									0
									<span
										class="
											text-upper
											subtitle-2
											grey--text
											text--darken-1
										"
										>Going</span
									>
								</v-btn>
								<v-btn
									class="
										details__activityButton
										font-weight-bold
										title
										py-10
									"
									elevation="0"
									text
									x-large
								>
									{{ event.users.length }}
									<span
										class="
											text-upper
											subtitle-2
											grey--text
											text--darken-1
										"
										>Interested</span
									>
								</v-btn>
							</div>
							<v-divider class="my-2 mx-auto" />
							<v-list>
								<v-list-item>
									<v-list-item-avatar>
										<v-img
											src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
										></v-img>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title
											>Jason Oner</v-list-item-title
										>
									</v-list-item-content>
									<v-list-item-action>
										<v-btn
											class="font-weight-bold"
											color="deep-purple"
											outlined
										>
											<v-icon left>mdi-email</v-icon>
											Invite</v-btn
										>
									</v-list-item-action>
								</v-list-item>
								<v-list-item>
									<v-list-item-avatar>
										<v-img
											src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
										></v-img>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title
											>Travis Howard</v-list-item-title
										>
									</v-list-item-content>
									<v-list-item-action>
										<v-btn
											class="font-weight-bold"
											color="deep-purple"
											outlined
										>
											<v-icon left>mdi-email</v-icon>
											Invite</v-btn
										>
									</v-list-item-action>
								</v-list-item>
								<v-list-item>
									<v-list-item-avatar>
										<v-img
											src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
										></v-img>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title
											>Alice Connors</v-list-item-title
										>
									</v-list-item-content>
									<v-list-item-action>
										<v-btn
											class="font-weight-bold"
											color="deep-purple"
											outlined
										>
											<v-icon left>mdi-email</v-icon>
											Invite</v-btn
										>
									</v-list-item-action>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
			</v-tab-item>
			<v-tab-item class="my-2">
				<v-row>
					<v-col cols="7">
						<v-card elevation="4">
							<v-card-title
								class="
									headline
									font-weight-bold
									grey--text
									text--darken-4
								"
								>Discussion</v-card-title
							>
						</v-card>
					</v-col>
					<v-col cols="5">
						<v-card elevation="4">
							<v-card-title
								class="
									headline
									font-weight-bold
									grey--text
									text--darken-4
								"
								>Details</v-card-title
							>
							<v-list>
								<v-list-item>
									<v-list-item-icon class="mr-4"
										><v-icon
											>mdi-account-multiple</v-icon
										></v-list-item-icon
									>
									<v-list-item-content
										>{{ event.users.length }} users
										replied</v-list-item-content
									>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon class="mr-4"
										><v-icon
											>mdi-flag</v-icon
										></v-list-item-icon
									>
									<v-list-item-content
										>Admin event</v-list-item-content
									>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon class="mr-4"
										><v-icon
											>mdi-web</v-icon
										></v-list-item-icon
									>
									<v-list-item-content
										>Public &bull; Anyone on or off
										Eventify</v-list-item-content
									>
								</v-list-item>
							</v-list>
							<v-card-text
								class="
									details__description
									pt-2
									px-6
									text-justify
								"
							>
								<vue-show-more-text
									:text="event.description"
									:lines="4"
									additional-container-css="padding: 0;"
									additional-anchor-css="text-align: center; color: #673ab7; margin: 0 auto; width: fit-content;"
								/>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import moment from "moment";
	// @ts-ignore
	import vueShowMoreText from "vue-show-more-text";

	import { Event as EventModel } from "@/models/Event";
	import EventService from "@/services/EventService";

	@Component({ components: { vueShowMoreText } })
	export default class EventDetails extends Vue {
		eventID: number | null = null;
		event: EventModel = {
			name: "",
			description: "",
			start_datetime: "",
			users: [],
		};
		currentTab = 0;

		get formattedEventDate(): string {
			return moment(this.event.start_datetime)
				.format("dddd, D MMMM YYYY AT HH:mm UTC+02")
				.toUpperCase();
		}

		async created() {
			this.eventID = +this.$route.params.id;

			const response = await EventService.getEvent(this.eventID);
			Object.assign(this.event, response.data);
		}
	}
</script>

<style>
	.details .details__description {
		max-width: fit-content;
	}
	.details .details__activityButton {
		flex: 1 0 50%;
	}
	.details .details__activityButton .v-btn__content {
		flex-direction: column;
	}
	.details hr {
		max-width: 90%;
	}
</style>