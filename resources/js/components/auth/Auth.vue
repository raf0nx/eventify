<template>
	<v-main>
		<v-container class="fill-height py-0" fluid>
			<v-row class="fill-height">
				<v-col cols="12" md="7" class="pa-0 left-panel">
					<div
						class="left-panel-container pa-4 d-flex flex-column justify-space-between"
					>
						<div class="d-flex">
							<v-icon class="white--text mr-1">mdi-buffer</v-icon>
							<span class="logo-text white--text font-weight-bold"
								>Eventify</span
							>
						</div>
						<div class="d-flex flex-column align-center mb-16">
							<h2 class="left-panel-title white--text">
								Welcome back!
							</h2>
							<span
								class="left-panel-subtitle grey--text text--lighten-3 mt-4"
								>Sign In to continue using my application!</span
							>
						</div>
						<div class="d-flex justify-center">
							<span class="white--text font-weight-bold"
								>v. 0.0</span
							>
						</div>
					</div>
				</v-col>
				<transition name="scale" mode="out-in">
					<router-view></router-view>
				</transition>
			</v-row>
		</v-container>
	</v-main>
</template>

<script>
	export default {};
</script>

<style>
	.left-panel {
		background-image: url("https://i.pinimg.com/originals/c4/6f/3c/c46f3cfbff1b198e0276e4d577a4464c.png");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.left-panel-container {
		height: 100%;
	}

	.left-panel-title {
		font-size: 4rem;
	}

	.left-panel-subtitle {
		font-size: 1.5rem;
	}

	.logo-text {
		font-size: 1.5rem;
	}

	.main-title {
		font-size: 3rem;
	}
</style>