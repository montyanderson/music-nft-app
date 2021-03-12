<template>
	<div v-if="!releasesLoading">
		<div class="outer-container">
			<img v-bind:src="release.imageUrl" alt="album art" />
			<div class="album-info">
				<h1>{{ release.name }}</h1>
				<h2>
					By <a href="#">{{ release.artist }}</a>
				</h2>
				<h2>2021, {{ release.tracks.length }} tracks</h2>
				<div class="album-buttons">
					<button class="btn-b">Play</button>
				</div>
			</div>
		</div>

		<table class="tracklist">
			<tr class="track-header">
				<th>#</th>
				<th>TITLE</th>
			</tr>

			<tr
				v-for="(track, index) in release.tracks"
				v-bind:key="index"
				class="track"
			>
				<td>{{ index + 1 }}</td>
				<td>{{ track.name }}</td>
			</tr>
		</table>

		<div class="sidebar">
			<div class="buy-container">
				<div class="line-wrapper">
					<p class="eth">0.01</p>
					<p class="eth-eth eth">&nbsp; ETH</p>
					<p class="available">
						{{ release.availableCopies }} available
					</p>
				</div>
				<div class="currency-wrapper">
					<p class="dollar">$18.37</p>
					<p class="supply">{{ release.totalCopies }} in supply</p>
				</div>
				<div class="btn-cont">
					<button class="btn-a" v-on:click="buy">Buy now</button>

					<p class="own-warning" v-if="release.availableCopies === 0">
						sold out
					</p>
					<p class="own-warning" v-else>
						You already own 1 of these!
					</p>
				</div>
			</div>
			<div class="owner-container">
				<h3>Owners</h3>
				<div class="owners">
					<p v-for="owner in release.owners">{{ owner.address }}</p>
				</div>
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
		walletConnected() {
			return this.$store.state.walletConnected;
		}
	},
	methods: {
		async buy() {
			await this.$store.dispatch("buy", this.release.id);
		}
	}
};
</script>

<style scoped>
/* stuff inside  owner section */
.owners {
	margin-top: 29px;
	margin-left: 24px;
}
.owners p {
	font-size: 10px;
	overflow: hidden;
}

.owner-container {
	align-self: center;
	width: 310px;
	background-color: #282626;
	border-radius: 15px;
	margin-bottom: 20px;
	background-color: rgb(40, 38, 38, 0.3);
	border: 1px solid rgb(74, 74, 74, 0.3);

	display: flex;
	flex-direction: column;
	padding-bottom: 20px;
}
h3 {
	margin-top: 31px;
	margin-left: 24px;
	font-size: 30px;
}
/* stuff inside  owner section */

/* stuff inside buy button */
.own-warning {
	margin-top: 42px;
	font-size: 18px;
	padding-bottom: 26px;
}
.btn-cont {
	align-items: center;
	display: flex;
	flex-direction: column;
	margin-top: 47px;
}
.btn-a {
	font-size: 18px;
	width: 201px;
	height: 55px;
	cursor: pointer;
	border: none;
	color: white;
	background: linear-gradient(262.53deg, #608dff 3.6%, #3f74fb 100%);
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 30px #134ad3,
		inset 0px 0px 10px #3f74fb;
	border-radius: 120px;
}
.supply {
	font-size: 18px;
	margin-left: 160px;
	position: absolute;
}

.dollar {
	font-size: 26px;
	color: #b7b7b7;
}
.available {
	font-size: 18px;
	margin-left: 165px;
	position: absolute;
}
.currency-wrapper {
	margin-left: 24px;
	margin-top: 11px;
}

.currency-wrapper,
.line-wrapper {
	display: flex;
	align-items: center;
}
.line-wrapper {
	margin-top: 28px;
	margin-left: 24px;
}

.eth {
	font-size: 32px;
	font-weight: bold;
}
.buy-container {
	align-self: center;
	margin-top: 110px;
	margin-bottom: 20px;
	width: 310px;
	height: 305px;
	border-radius: 15px;
	background-color: rgb(40, 38, 38, 0.3);
	border: 1px solid rgb(74, 74, 74, 0.3);
}

/* stuff inside buy button */

/* stuff inside sidebar */
.wallet-id {
	margin-left: 32px;
	margin-top: 3px;
}
.wallet-value {
	margin-top: 14px;
	margin-left: 59px;
	margin-bottom: 5px;
	font-weight: bold;
	font-size: 20px;
	line-height: 24px;
}
.eth-eth {
	margin-left: 4px;
	font-weight: 200;
}

.sidebar {
	display: flex;
	flex-direction: column;
	position: fixed;
	width: 360px;
	height: 100%;
	top: 0;
	background: #171717;
	right: 0;
}

.owners p {
	font-family: "Roboto Mono", monospace;
	font-size: 10px;
	margin-bottom: 5px;
}
/* stuff inside sidebar */

/* main release page items */

.outer-container {
	display: flex;
	flex-direction: row;
	margin-top: 0px;
}
.outer-container img {
	width: 290px;
	height: 290px;
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
	font-size: 55px;
}
h2 {
	color: #b7b7b7;
	margin-top: 9px;
	font-size: 18px;
}
h2,
h3 {
	font-weight: 500;
}
a {
	text-decoration: none;
	color: #ffffff;
}

.album-buttons {
	display: flex;
	flex-direction: row;
	margin-top: 17px;
}

.btn-a:disabled {
	background: linear-gradient(
		180deg,
		rgba(96, 141, 255, 0.5) 0%,
		rgba(23, 23, 23, 0) 100%
	);
	box-shadow: none;
}

.btn-b {
	width: 160px;
	height: 52px;
	border: none;
	color: #ffffff;
	font-size: 18px;
	cursor: pointer;
	top: 20px;
	position: relative;
	border-radius: 120px;

	background: linear-gradient(262.53deg, #608dff 3.6%, #3f74fb 100%);
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 30px #134ad3,
		inset 0px 0px 10px #3f74fb;
	border-radius: 120px;
	border-radius: 120px;
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

/* track list */

.tracklist {
	width: calc(90% - 350px);
	margin-left: 62px;
	margin-top: 25px;
	border-collapse: collapse;
}

.track-header {
	height: 80px;
}

.track {
	height: 60px;
	left: 55px;
	top: 20px;
	border: solid #6d6d6d;
	border-width: 1px 0;
	font-size: 1rem;
	font-weight: 500;
}

.track:first-child {
	border-top: none;
}
.track:last-child {
	border-bottom: none;
}
/* track list */

/* main release page items */
</style>
