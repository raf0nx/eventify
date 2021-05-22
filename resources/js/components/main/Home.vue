<template>
	<v-main>
		<div class="container-fluid" style="height: 1500px">
			<div class="display-1">Home</div>
			<v-btn @click="logout()">Logout</v-btn>
			<v-btn @click="getUser()">Get User</v-btn>
		</div>
	</v-main>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import * as AuthService from "@/services/AuthService.ts";
	import { AuthModule } from "@modules/Auth.ts";

	@Component({})
	export default class Home extends Vue {
		logout() {
			AuthModule.logout();
		}

		async getUser() {
			const user = await AuthService.getAuthUser();
			console.log(user);
		}
	}
</script>

<style>
</style>