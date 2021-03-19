<style scoped>
.releaseText {
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 70px;
	line-height: 82px;
	/* identical to box height */

	color: #ffffff;

	margin-left: 4.9vw;
	margin-top: 100px;
}

.releases {
	margin-top: 1rem;
  position: relative;

	width: 95vw;
	display: table;
	margin-left: 4.9vw;
	margin-right: auto;
	display: flex;
	flex-direction: row;
	flex-grow: 2;

	flex-wrap: wrap;
	grid-gap: 3vw;
}

.release {
	cursor: pointer;
}

.release .image, .release .image * {
	width: calc(23vw - 2.8vw);
	height: calc(23vw - 2.8vw);
	margin-top: 30px;
}

.header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 80px;
}

.name {
	font-size: 30px;
	text-align: left;
	margin-top: 1rem;
}
.artist{
	font-size: 15px;
	margin-top: 2px;
}

.available{
	margin-top: 20px;
	font-size: 17px;
	color: #878787;
}

@media only screen and (max-width: 1150px) {
	.releases {
	}
}
@media only screen and (max-width: 750px) {
	.releases {
		width: 95vw;
		margin-left: 3.5vw;
		grid-gap: 3vw;
	}
	.release .image, .release .image * {
		width: 45vw;
	}
	.releaseText {
		font-size: 60px;
		margin-left: 3.5vw;
	}
}

@media only screen and (max-width: 500px) {
	.releases {
		flex-direction: column;
		flex-wrap: nowrap;
		margin-left: 2.5vw;
		margin-top: 100px;
	}
	.release .image, .release .image * {
		width: 90px;
		margin-top: -70px;
	}
	.releaseText {
		font-size: 50px;
		margin-top: 80px;
		margin-left: 2.5vw;
	}
	.name {
		position: relative;
		top: -91px;
		left: 110px;
		font-weight: 600;
		font-size: 1.4rem;
		text-align: left;
		margin-top: 1rem;
	}
	.artist {
		position: relative;
		top: -87px;
		left: 110px;
	}
}

@media only screen and (max-width: 300px) {
	.releaseText {
		font-size: 40px;
	}
}
</style>

<template>
	<div class="home">
		<h1 class="releaseText">Releases</h1>
		<div class="header"></div>

		<div class="releases" v-if="releases.length > 0">
			<div
				class="release"
				v-for="release in releases"
				v-on:click="goToRelease(release)"
			>
				<img class="image" v-bind:src="release.imageUrl" />
				<p class="name">{{ release.name }}</p>
				<p class="artist">{{ release.artist }}</p>
				<p class="available" v-if="release.availableCopies === 0">
					sold out
				</p>
				<p class="available" v-else>
					{{ release.availableCopies }} available
				</p>
			</div>
		</div>

		<div class="releases" v-else>
			<div class="release">
					<content-placeholders>
						<div class="image">
							<content-placeholders-img />
						</div>

						<p class="name"><content-placeholders-heading /></p>


					</content-placeholders>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		releases() {
			return this.$store.state.releases;
		},
		releasesLoading() {
			return this.$store.state.releasesLoading;
		}
	},
	methods: {
		goToRelease({ id }) {
			this.$router.push({
				path: `/release/${id}`
			});
		}
	}
};
</script>
