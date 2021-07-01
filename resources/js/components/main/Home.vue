<template>
	<v-main>
		<div class="container-fluid" style="height: 1500px">
			<div class="display-1">Home</div>
			<v-btn @click="logout()" data-cy="logout_button">Logout</v-btn>
			<v-btn @click="getUser()">Get User</v-btn>
		</div>
	</v-main>
</template>

<script lang="ts">
	import { Vue, Component } from "vue-property-decorator";

	import AuthService from "@/services/AuthService";
	import { AuthModule } from "@modules/Auth";

	@Component({})
	export default class Home extends Vue {
		logout(): void {
			AuthModule.logout();
		}

		async getUser(): Promise<void> {
			const user = await AuthService.getAuthUser();
			console.log(user);
		}
	}
</script>

<style>
</style>