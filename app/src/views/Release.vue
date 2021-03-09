<template>
	<div v-if="!releasesLoading">
		<div class="outer-container">
			<img v-bind:src="release.imageUrl" alt="album art" />
			<div class="album-info">
				<h1>{{ release.name }}</h1>
				<h2>
					By <a href="#">{{ release.artist }}</a>
				</h2>
				<h2>2021, {{ numberTracks }} songs</h2>
				<div class="album-buttons">
					<button class="btn-b">Play</button>
				</div>
			</div>
		</div>
		<div class="tracklist">
			<h4 class="track-num">#</h4>
			<h4 class="track-title">TITLE</h4>
			<h4 class="track-time">TIME</h4>
		</div>

		<ol>
			<li v-for="(track, index) in release.tracks" v-bind:key="index" class="tracks">
				<div class="trackNum">{{ index + 1 }}</div>
				<div class="trackName">{{ track.name }}</div>
				<div class="line"></div>
			</li>
		</ol>
		<div class="sidebar">
			<div class="sidebarContent">
				<h1 class="eth">0.01 ETH</h1>
				<h3 class="dollar">$18.37</h3>
				<h2 class="supply">
					{{release.availableCopies}} available <br />
					{{release.totalCopies}} in supply
				</h2>
				<button class="btn-a">Buy Now</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		release() {
			if (this.releasesLoading === true) {
				return {};
			}

			return this.$store.state.releases.find(
				release => String(release.id) === this.$route.params.id
			);
		},
		releasesLoading() {
			return this.$store.state.releasesLoading;
		},
		numberTracks() {
			return this.release.tracks.length;
		}
	}
};
</script>

<style scoped>
.sidebar {
	position: fixed;
	width: 500px;
	height: 100%;
	top: 0;
	background: #171717;
	right: 0;
}
.eth {
	position: relative;
	font-size: 41px;
	margin-left: 70px;
	top: 60px;
}
.dollar {
	position: relative;
	font-size: 26px;
	margin-top: 8px;
	margin-left: 70px;
	top: 60px;
}
.supply {
	font-size: 26px;
	margin-left: 280px;
	margin-top: -26px;
}
.sidebarContent {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: calc(100% - 150px);
	overflow-y: scroll;
}
.outer-container {
	display: flex;
	flex-direction: row;
	margin-top: 30px;
}
.outer-container img {
	width: 320px;
	height: 320px;
	margin-top: 54px;
	margin-left: 62px;
}
.album-info {
	display: flex;
	flex-direction: column;
	margin-top: 125px;
	margin-left: 32px;
}
h1 {
	font-weight: bold;
	font-size: 70px;
}
h2 {
	color: #b7b7b7;
	margin-top: 9px;
	font-size: 18px;
}
h2,
h3 {
	font-weight: 300;
}
a {
	text-decoration: none;
	color: #ffffff;
}
h3 {
	margin-top: 20px;
	font-size: 22px;
}
.album-buttons {
	display: flex;
	flex-direction: row;
	margin-top: 17px;
}
.btn-a {
	font-size: 18px;
	width: 170px;
	height: 65px;
	margin-left: 70px;
	margin-top: 60px;
	cursor: pointer;
	background: #608dff;
	border: none;
	color: white;
	border-radius: 120px;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 10px #3f74fb;
}
.btn-b {
	width: 170px;
	height: 65px;
	border: none;
	background: #608dff;
	color: #ffffff;
	font-size: 18px;
	cursor: pointer;
	top: 20px;
	position: relative;
	border-radius: 120px;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 10px #3f74fb;
}
.btn-a span {
	font-size: 18px;
}
.trackNum {
	position: absolute;
	margin-left: 10px;
}
.trackName {
	position: absolute;
	margin-left: 104px;
}
.tracks {
	position: relative;
	height: 60px;
	left: 55px;
	top: 20px;
	width: calc(90% - 500px);
}
.tracklist {
	display: flex;
	flex-direction: row;
	margin-left: -26px;
}
.tracklist h4 {
	margin-top: 55px;
	margin-bottom: 14px;
}
.track-num {
	margin-left: 90px;
	margin-right: 103px;
}
.track-title {
	margin-right: 800px;
	margin-left: -20px;
}
.track-time {
	display: none;
}
.line {
	position: relative;
	height: 1px;
	left: 0px;
	width: 100%;
	top: 40px;
	background: #6d6d6d;
}
</style>
