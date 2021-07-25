<template>
	<v-app-bar color="deep-purple" dark elevate-on-scroll>
		<v-app-bar-nav-icon @click="setNavDrawer"></v-app-bar-nav-icon>
		<v-icon class="white--text mr-1">mdi-buffer</v-icon>
		<v-toolbar-title>Eventify</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon>
			<v-icon>mdi-magnify</v-icon>
		</v-btn>
		<v-btn class="mr-2" icon>
			<v-icon>mdi-heart</v-icon>
		</v-btn>
		<v-menu open-on-hover offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-badge
					bordered
					bottom
					color="green accent-4"
					dot
					offset-x="10"
					offset-y="10"
				>
					Hi, {{ username }}
					<v-avatar size="40" v-bind="attrs" v-on="on">
						<v-img
							src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
						></v-img>
					</v-avatar>
				</v-badge>
			</template>
			<v-list dense>
				<v-list-item-group
					active-class="deep-purple--text text--darken-4"
				>
					<v-list-item @click="true">
						<v-list-item-icon>
							<v-icon>mdi-chat</v-icon>
						</v-list-item-icon>
						<v-list-item-content>Notifications</v-list-item-content>
					</v-list-item>
					<v-list-item @click="true">
						<v-list-item-icon>
							<v-icon>mdi-tools</v-icon>
						</v-list-item-icon>
						<v-list-item-content>Preferences</v-list-item-content>
					</v-list-item>
					<v-list-item @click="logout()">
						<v-list-item-icon>
							<v-icon>mdi-logout</v-icon>
						</v-list-item-icon>
						<v-list-item-content>Logout</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</v-app-bar>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import { UtilsModule } from "@modules/Utils";
	import { AuthModule } from "@modules/Auth";

	@Component
	export default class Navbar extends Vue {
		get username(): string {
			return AuthModule.authUser ? AuthModule.authUser.name : "";
		}

		setNavDrawer(): void {
			UtilsModule.setNavDrawer(!UtilsModule.isNavDrawer);
		}

		logout(): void {
			AuthModule.logout();
		}
	}
</script>

<style>
</style>