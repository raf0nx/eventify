<template>
	<v-stepper v-model="currentStep" color="deep-purple" vertical>
		<v-stepper-step
			color="deep-purple"
			:complete="currentStep > 1"
			step="1"
		>
			Choose a name for your event
		</v-stepper-step>

		<v-stepper-content step="1">
			<v-text-field
				v-model="eventData.name"
				color="deep-purple"
				label="Event name"
				filled
				shaped
				counter
				maxlength="255"
				clearable
			></v-text-field>
			<v-btn
				color="deep-purple"
				class="white--text font-weight-bold"
				@click="currentStep++"
			>
				Continue
			</v-btn>
			<v-btn color="deep-purple" text @click="closeDialog()">
				Cancel
			</v-btn>
		</v-stepper-content>

		<v-stepper-step
			color="deep-purple"
			:complete="currentStep > 2"
			step="2"
		>
			Write something about it
		</v-stepper-step>

		<v-stepper-content step="2">
			<v-textarea
				v-model="eventData.description"
				color="deep-purple"
				label="Description"
				hint="Write something fancy about your event!"
				rows="6"
				filled
				shaped
				counter
				no-resize
				auto-grow
				clearable
			></v-textarea>
			<v-btn
				color="deep-purple"
				class="white--text font-weight-bold"
				@click="currentStep++"
			>
				Continue
			</v-btn>
			<v-btn @click="currentStep--" color="deep-purple" text>
				Go back
			</v-btn>
		</v-stepper-content>

		<v-stepper-step
			color="deep-purple"
			:complete="currentStep > 3"
			step="3"
		>
			Select an image for your event
		</v-stepper-step>

		<v-stepper-content step="3">
			<v-img
				src="https://wallpapercave.com/wp/wp2686927.jpg"
				class="mb-8"
				max-height="350px"
			>
				<!-- <v-overlay
					v-if="eventData.image.length === 0"
					absolute
					value="true"
				>
					<v-file-input
						v-model="eventData.image"
						class="pointer"
						prepend-icon=""
						filled
						rounded
						dense
						:clearable="false"
						placeholder="Add event photo"
					>
						<template v-slot:prepend-inner>
							<v-icon class="mr-1">mdi-plus-box-multiple</v-icon>
						</template>
					</v-file-input>
				</v-overlay>
				<v-speed-dial
					v-else
					v-model="fab"
					bottom
					left
					absolute
					open-on-hover
					direction="top"
					transition="slide-y-reverse-transition"
				>
					<template v-slot:activator>
						<v-btn v-model="fab" color="deep-purple" small dark fab>
							<v-icon v-if="fab"> mdi-close </v-icon>
							<v-icon v-else> mdi-pencil </v-icon>
						</v-btn>
					</template>
					<v-btn
						@click="removeImage()"
						fab
						dark
						x-small
						color="red accent-2"
					>
						<v-icon>mdi-delete</v-icon>
					</v-btn>
					<v-btn fab dark x-small color="green">
						<v-file-input
							v-model="eventData.image"
							class="pt-0 mt-0 ml-2"
							prepend-icon="mdi-plus-box-multiple"
							hide-input
						>
						</v-file-input>
					</v-btn>
				</v-speed-dial> -->
			</v-img>
			<v-btn
				color="deep-purple"
				class="white--text font-weight-bold"
				@click="currentStep++"
			>
				Continue
			</v-btn>
			<v-btn @click="currentStep--" color="deep-purple" text>
				Go back
			</v-btn>
		</v-stepper-content>

		<v-stepper-step color="deep-purple" step="4">
			Tell when your event will start
		</v-stepper-step>
		<v-stepper-content step="4">
			<v-row class="mb-8">
				<v-col cols="6">
					<v-date-picker
						v-model="eventData.start_datetime"
						:min="currentDate"
						color="deep-purple"
						show-current
						show-adjacent-months
					></v-date-picker>
				</v-col>
				<v-col cols="6">
					<v-time-picker
						:min="currentTime"
						format="24hr"
						color="deep-purple"
					></v-time-picker>
				</v-col>
			</v-row>
			<v-btn
				color="deep-purple"
				class="white--text font-weight-bold"
				@click="createEvent()"
			>
				Create
			</v-btn>
			<v-btn @click="currentStep--" color="deep-purple" text>
				Go back
			</v-btn>
		</v-stepper-content>
	</v-stepper>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import moment from "moment";

	import { Event as EventModel } from "@/models/Event";
	import EventService from "@/services/EventService";

	@Component
	export default class EventStepper extends Vue {
		currentStep = 1;
		fab = false;
		// startDate = moment().format("YYYY-MM-DD");
		// startTime = moment().format("HH:MM");
		eventData: EventModel = {
			name: "",
			description: "",
			start_datetime: moment().format("YYYY-MM-DD"),
		};
		currentDate = moment().format("YYYY-MM-DD");
		currentTime = moment().format("HH:MM");

		createEvent(): void {
			EventService.createEvent(this.eventData);
		}

		removeImage(): void {
			this.eventData.image = [];
		}

		closeDialog(): void {
			this.$emit("closeDialog");
		}
	}
</script>

<style>
	.pointer > .v-input__control > .v-input__slot {
		cursor: pointer !important;
	}
</style>