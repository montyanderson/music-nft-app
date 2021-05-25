<template>
	<div class="releases-container">
		<p class="no-releases" v-if="releases.length === 0">
				Nothing to see here :(
			</p>
		<div class="releases" v-if="releasesLoading === false">
		

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
				<content-placeholders :rounded="true">
					<div class="image">
						<content-placeholders-img />
					</div>

					<p class="name">
						<content-placeholders-heading />
					</p>
				</content-placeholders>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		releases: Array
	},
	computed: {
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

<style scoped>

.no-releases {
}
.releases {
	display: grid;
	row-gap: 20px;
	column-gap: 50px;
justify-content: center;
  grid-template-columns: repeat(auto-fill, 15rem);

}
@media screen and (min-width: 1320px) {
	.releases {
		grid-template-columns: repeat(4, 15rem);
	}
 
}

.release {
	cursor: pointer;
}

.release .image,
.release .image * {
	height: 15rem;
	width: 15rem;
	margin-top: 30px;
	border-radius: 1px;
}

.name {
	font-size: 30px;
	text-align: left;
	margin-top: 1rem;
}

.artist {
	font-size: 15px;
	margin-top: 2px;
}

.available {
	margin-top: 20px;
	font-size: 17px;
	color: #878787;
}


</style>
