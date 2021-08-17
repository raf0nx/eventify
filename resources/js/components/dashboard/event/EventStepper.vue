<template>
	<v-stepper v-model="currentStep" color="deep-purple" vertical>
		<ValidationObserver ref="form" v-slot="{ invalid }">
			<v-stepper-step
				color="deep-purple"
				:complete="currentStep > 1"
				step="1"
			>
				Choose a name for your event
			</v-stepper-step>

			<v-stepper-content step="1">
				<v-form>
					<ValidationProvider
						v-slot="{ errors, invalid }"
						rules="required|min:2|max:255"
						name="Name"
						vid="name"
					>
						<v-text-field
							v-model="event.name"
							color="deep-purple"
							label="Event name"
							filled
							shaped
							counter
							maxlength="255"
							clearable
							@keydown.enter.prevent="
								invalid ? null : currentStep++
							"
							:error-messages="errors"
						></v-text-field>
						<v-btn
							color="deep-purple"
							class="white--text font-weight-bold"
							@click="currentStep++"
							:disabled="invalid"
						>
							Continue
						</v-btn>
						<v-btn color="deep-purple" text @click="closeDialog()">
							Cancel
						</v-btn>
					</ValidationProvider>
				</v-form>
			</v-stepper-content>

			<v-stepper-step
				color="deep-purple"
				:complete="currentStep > 2"
				step="2"
			>
				Write something about it
			</v-stepper-step>

			<v-stepper-content step="2">
				<v-form>
					<ValidationProvider
						v-slot="{ errors, invalid }"
						rules="required|min:10|max:65535"
						name="Description"
						vid="description"
					>
						<v-textarea
							v-model="event.description"
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
							@keydown.enter="invalid ? null : currentStep++"
							:error-messages="errors"
						></v-textarea>
						<v-btn
							color="deep-purple"
							class="white--text font-weight-bold"
							@click="currentStep++"
							:disabled="invalid"
						>
							Continue
						</v-btn>
						<v-btn @click="currentStep--" color="deep-purple" text>
							Go back
						</v-btn>
					</ValidationProvider>
				</v-form>
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
					v-if="event.image.length === 0"
					absolute
					value="true"
				>
					<v-file-input
						v-model="event.image"
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
							v-model="event.image"
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
							v-model="eventDate"
							:min="minEventDate"
							color="deep-purple"
							show-current
							show-adjacent-months
						></v-date-picker>
					</v-col>
					<v-col cols="6">
						<v-time-picker
							v-model="eventTime"
							:min="minEventTime"
							format="24hr"
							color="deep-purple"
						></v-time-picker>
					</v-col>
				</v-row>
				<v-btn
					color="deep-purple"
					class="white--text font-weight-bold"
					@click="createEvent()"
					:disabled="invalid"
				>
					Create
				</v-btn>
				<v-btn @click="currentStep--" color="deep-purple" text>
					Go back
				</v-btn>
			</v-stepper-content>
		</ValidationObserver>
	</v-stepper>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";
	import { ValidationProvider, ValidationObserver } from "vee-validate";
	import moment from "moment";

	import { Event as EventModel } from "@/models/Event";
	import EventService from "@/services/EventService";
	import { UtilsModule } from "@/store/modules/Utils";
	import { SnackbarModel } from "@/models/Snackbar";
	import { EnumSnackbarIcon } from "@/enums/EnumSnackbarIcon";
	import { EnumSnackbarColor } from "@/enums/EnumSnackbarColor";

	@Component({ components: { ValidationProvider, ValidationObserver } })
	export default class EventStepper extends Vue {
		currentStep = 1;
		fab = false;
		eventDate = moment().format("YYYY-MM-DD");
		eventTime = moment().format("HH:mm");
		event: EventModel = {
			name: "",
			description: "",
			start_datetime: "",
			image: "image.png",
		};

		$refs!: {
			form: InstanceType<typeof ValidationObserver>;
		};

		get minEventDate(): string {
			return moment().format("YYYY-MM-DD");
		}

		get minEventTime(): string {
			if (this.eventDate === moment().format("YYYY-MM-DD")) {
				this.eventTime = moment().format("HH:mm");
				return moment().format("HH:mm");
			} else {
				return "00:00";
			}
		}

		async createEvent(): Promise<void> {
			UtilsModule.setLoader(true);

			try {
				await EventService.createEvent(
					Object.assign(this.event, {
						start_datetime: `${this.eventDate} ${this.eventTime}`,
					})
				);

				this.$emit("rerenderEvents");
				this.closeDialog();
				UtilsModule.setSnackbar(
					new SnackbarModel()
						.setShowSnackbar(true)
						.setMessage("Event created successfully!")
						.setIcon(EnumSnackbarIcon.SUCCESS)
						.setColor(EnumSnackbarColor.SUCCESS)
				);
			} catch (error) {
				const errorsData = error.response.data.errors;
				this.setServerSideErrors(errorsData);
				this.setStepAfterValidation(errorsData);

				UtilsModule.setSnackbar(
					new SnackbarModel()
						.setShowSnackbar(true)
						.setMessage(
							errorsData.hasOwnProperty("start_datetime")
								? errorsData.start_datetime[0]
								: "Couldn't create your event. Perhaps you have some errors in the form. If no, reload the page and try again."
						)
						.setIcon(EnumSnackbarIcon.ERROR)
						.setColor(EnumSnackbarColor.ERROR)
				);
			}

			UtilsModule.setLoader(false);
		}

		setServerSideErrors(errorsData: any): void {
			this.$refs.form.setErrors({
				name: errorsData.name,
				description: errorsData.description,
			});
		}

		setStepAfterValidation(errorsData: any): void {
			if (errorsData.hasOwnProperty("name")) {
				this.currentStep = 1;
			} else if (errorsData.hasOwnProperty("description")) {
				this.currentStep = 2;
			}
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