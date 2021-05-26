<template>
	<div class="releases-container">
			<div v-if="releases.length === 0 && !releasesLoading" class="no-items">
			<h1 class="routeTitle" > {{pageTitle}} </h1>
			<p class="no-releases" >
				Nothing to see here :(
			</p>
			</div>
			
		<div class="releases" v-if="releasesLoading === false">
			<div
				class="release"
				v-for="release in releases"
				v-on:click="goToRelease(release)"
			>
					<h1 class="page-title">{{pageTitle}}</h1>

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
		},
		pageTitle() {
			return this.$route.name
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
.no-items {
	top: -80px;
	width: 100%;
	position: absolute;
	margin-left: 12.1vw;
}
.routeTitle {
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 70px;
	line-height: 82px;
	color: #ffffff;
}
@media only screen and (max-width: 450px) {
	.no-items {
		display: flex;
		margin-left: 0px;
		flex-direction: column;
		justify-content: center;
	}
	.routeTitle {
		text-align: center;
		font-size: 50px;
	}
	.no-releases {
	text-align: center;
}
	}
.no-releases {
	color: #dbdbdb;
	font-size: 25px;
}
.releases-container {
	margin-top: 140px;
	position: relative;
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
