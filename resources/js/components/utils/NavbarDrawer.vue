<template>
	<v-navigation-drawer v-model="navDrawer" app temporary bottom>
		<template v-slot:prepend>
			<v-list-item two-line>
				<v-badge
					bordered
					bottom
					color="green accent-4"
					dot
					offset-x="26"
					offset-y="24"
				>
					<v-list-item-avatar>
						<img
							src="https://randomuser.me/api/portraits/women/81.jpg"
						/>
					</v-list-item-avatar>
				</v-badge>
				<v-list-item-content>
					<v-list-item-title>{{ username }}</v-list-item-title>
					<v-list-item-subtitle>Active</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</template>

		<v-divider></v-divider>

		<v-list nav dense>
			<v-list-item-group active-class="deep-purple--text text--darken-4">
				<v-list-item :to="{ name: 'Dashboard' }">
					<v-list-item-icon>
						<v-icon>mdi-view-dashboard</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Dashboard</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-icon>
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Profile</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-icon>
						<v-icon>mdi-heart</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Favourites</v-list-item-content>
				</v-list-item>

				<v-list-item>
					<v-list-item-icon>
						<v-icon>mdi-cogs</v-icon>
					</v-list-item-icon>
					<v-list-item-content>Settings</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>

		<template v-slot:append>
			<v-btn
				color="deep-purple"
				class="white--text font-weight-bold mt-12"
				block
				tile
				@click="logout()"
				data-cy="logout_button"
			>
				<v-icon class="mr-1">mdi-logout</v-icon>
				Logout
			</v-btn>
		</template>
	</v-navigation-drawer>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import { UtilsModule } from "@modules/Utils";
	import { AuthModule } from "@modules/Auth";

	@Component
	export default class NavbarDrawer extends Vue {
		get navDrawer(): boolean {
			return UtilsModule.isNavDrawer;
		}

		set navDrawer(value: boolean) {
			UtilsModule.setNavDrawer(value);
		}

		get username(): string {
			return AuthModule.authUser ? AuthModule.authUser.name : "unidentified";
		}

		logout(): void {
			AuthModule.logout();
		}
	}
</script>

<style>
</style>