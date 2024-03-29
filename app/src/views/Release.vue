<template @keydown.esc="close">
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
					<button class="btn-b" v-on:click="play(track)">Play</button>
				</div>
			</div>
		</div>

		<table class="tracklist" @mouseleave="hover = null">
			<tr class="track-header">
				<th>#</th>
				<th>TITLE</th>
				<th>TIME</th>
			</tr>
			<div class="table-spacing"></div>
			<tr
				v-for="(track, index) in release.tracks"
				v-bind:key="index"
				class="track"
				@mouseover="hover = index"
				:class="{ activeItem: hover === index }"
			>
				<td v-if="hover === index || playerTrack === track">
					<div
						class="play-track"
						v-on:click="
							playerTrack === track ? playPause() : play(track)
						"
					>
						<div class="svg-cont">
							<svg
								v-if="!(isPlaying && playerTrack === track)"
								class="play-item"
								width="8"
								height="12"
								viewBox="0 0 8 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8 6L0.5 11.1962L0.500001 0.803847L8 6Z"
									fill="black"
								/>
							</svg>
							<svg
								v-else
								xmlns="http://www.w3.org/2000/svg"
								width="15"
								height="15"
								fill="black"
								class="play-item"
								viewBox="0 0 16 16"
							>
								<path
									d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
								/>
							</svg>
							<svg
								class="play-hover"
								width="35"
								height="35"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g filter="url(#filter0_i)">
									<circle
										cx="20"
										cy="20"
										r="20"
										fill="white"
									/>
								</g>
								<defs>
									<filter
										id="filter0_i"
										x="0"
										y="0"
										width="40"
										height="40"
										filterUnits="userSpaceOnUse"
										color-interpolation-filters="sRGB"
									>
										<feFlood
											flood-opacity="0"
											result="BackgroundImageFix"
										/>
										<feBlend
											mode="normal"
											in="SourceGraphic"
											in2="BackgroundImageFix"
											result="shape"
										/>
										<feColorMatrix
											in="SourceAlpha"
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											result="hardAlpha"
										/>
										<feOffset />
										<feGaussianBlur stdDeviation="10" />
										<feComposite
											in2="hardAlpha"
											operator="arithmetic"
											k2="-1"
											k3="1"
										/>
										<feColorMatrix
											type="matrix"
											values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
										/>
										<feBlend
											mode="normal"
											in2="shape"
											result="effect1_innerShadow"
										/>
									</filter>
								</defs>
							</svg>
						</div>
					</div>
				</td>
				<td v-else>{{ index + 1 }}</td>

				<td>{{ track.name }}</td>
				<td v-on:click="play(track)"></td>
			</tr>
		</table>

		<div class="sidebar">
			<div class="buy-container">
				<h4>{{ ethPrice }} <span> ETH </span></h4>
				<h5>${{ usdPrice }}</h5>
				<div class="center-cont">
					<button
						class="btn-a confetti-button"
						:class="{ animate: animate }"
						v-on:click="buy"
						@click="anim"
					>
						Buy now
					</button>
					<p class="info-1">
						This is a limited-release digital token, available as an
						<a href="javascript:null" @click="openNFTModal">
							NFT.</a
						>
						You can purchase this using
						<a href="javascript:null" v-on:click="openEthereumModal"
							>Ethereum</a
						>.
					</p>
					<p class="info-2">
						Once purchased, it will be available in
						<router-link to="/library" exact> Library.</router-link>
						It may be available for trade at a future date.
					</p>
				</div>
			</div>
		</div>
		<modal id="ethereum">
			<h1>Ethereum</h1>

			<p>
				Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
				consectetur, adipisci velit. Neque porro quisquam est qui
				dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
			</p>
		</modal>
		<modal id="openNFTModal">
			<h1>NFT</h1>

			<p>
				Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
				consectetur, adipisci velit. Neque porro quisquam est qui
				dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
			</p>
		</modal>
		<div class="rel-pad"></div>
	</div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
	data() {
		return {
			hover: null,
			animate: false
		};
	},
	watch: {
		animate: function () {
			if (this.animate === true) {
				setTimeout(() => {
					this.animate = false;
				}, 500);
			}
		}
	},
	computed: {
		isPlaying() {
			return this.$store.state.player.isPlaying;
		},
		release() {
			if (this.releasesLoading === true) {
				return {};
			}

			return this.$store.state.releases.find(
				(release) => String(release.id) === this.$route.params.id
			);
		},
		ethPrice() {
			return this.release.price / 2e17;
		},
		usdPrice() {
			return (this.ethPrice * this.$store.state.ethPrice).toFixed(2);
		},
		releasesLoading() {
			return this.$store.state.releasesLoading;
		},
		walletConnected() {
			return this.$store.state.walletConnected;
		},
		playerTrack() {
			return this.$store.getters["player/track"] || {};
		}
	},
	methods: {
		close() {
			console.log("hell");
			this.$store.state.modal.active = null;
		},
		anim() {
			this.animate = true;
		},
		async buy() {
			await this.$store.dispatch("buy", this.release.id);
		},
		play(track) {
			this.$store.commit("player/start", {
				playlist: this.release.tracks,
				index: this.release.tracks.indexOf(track)
			});
		},
		playPause() {
			this.$store.commit("player/playPause");
		},

		openEthereumModal() {
			this.$store.commit("modal/open", "ethereum");
		},
		openNFTModal() {
			this.$store.commit("modal/open", "openNFTModal");
		}
	},
	components: {
		Modal
	}
};
</script>

<style scoped>
.rel-pad {
	padding-bottom: 170px;
}
.confetti-button {
	cursor: pointer;
	position: relative;
	transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
}

.confetti-button:focus {
	outline: 0;
}

.confetti-button:before,
.confetti-button:after {
	position: absolute;
	content: "";
	display: block;
	width: 200px;
	height: 50px;
	left: 2px;
	z-index: -1000;
	transition: all ease-in-out 0.5s;
	background-repeat: no-repeat;
}

.confetti-button:before {
	display: none;
	top: -75%;
	background-image: radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, transparent 20%, #3f74fb 20%, transparent 30%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, transparent 10%, #3f74fb 15%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%);
	background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%,
		15% 15%, 10% 10%, 18% 18%;
}

.confetti-button:after {
	display: none;
	bottom: -75%;
	background-image: radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, transparent 10%, #3f74fb 15%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%),
		radial-gradient(circle, #3f74fb 20%, transparent 20%);
	background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
		20% 20%;
}

.confetti-button:active {
	transform: scale(0.9);
}

.confetti-button.animate:before {
	z-index: 900000;
	display: block;
	animation: topBubbles ease-in-out 0.75s forwards;
}

.confetti-button.animate:after {
	z-index: 900000;

	display: block;
	animation: bottomBubbles ease-in-out 0.75s forwards;
}
@keyframes topBubbles {
	0% {
		background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
			40% 90%, 55% 90%, 70% 90%;
	}
	50% {
		background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
			50% 50%, 65% 20%, 90% 30%;
	}
	100% {
		background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
			50% 40%, 65% 10%, 90% 20%;
		background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	}
}
@keyframes bottomBubbles {
	0% {
		background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
			70% -10%, 70% 0%;
	}
	50% {
		background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%,
			95% 60%, 105% 0%;
	}
	100% {
		background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%,
			95% 70%, 110% 10%;
		background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
	}
}
/* anim */

/* stuff inside  owner section */

/* stuff inside  owner section */

/* stuff inside buy button */

.btn-a {
	font-size: 18px;
	width: 201px;
	height: 55px;
	cursor: pointer;
	border: none;
	color: white;
	outline: none;
	background: linear-gradient(262.53deg, #608dff 3.6%, #3f74fb 100%);
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 30px #134ad3,
		inset 0px 0px 10px #3f74fb;
	border-radius: 120px;
}
.btn-a:hover {
	transform: scale(1.05);
}
.btn-a:active {
	transform: scale(0.9);
}
.buy-container {
	position: relative;
	align-self: center;
	margin-top: 90px;
	margin-bottom: 20px;
	width: 310px;
	height: 746px;
	border-radius: 30px;
	background: linear-gradient(61.43deg, #05262f 60.43%, #3895ad 211.6%);
	box-shadow: 0px 15px 100px -5px rgba(3, 5, 10, 0.7);
}

/* stuff inside buy button */

/* stuff inside sidebar */

.info-1 a,
.info-2 a {
	color: #194fda !important;
}
.info-2 {
	font-size: 15px;
	width: 234px;
	margin-top: 15px;
	padding-bottom: 58px;
}
.info-1 {
	font-size: 15px;
	width: 234px;
	margin-top: 30px;
}

.center-cont {
	align-items: center;
	display: flex;
	margin-top: 24px;
	flex-direction: column;
}
.buy-container h5 {
	margin-top: 17px;
	margin-left: 40px;
	font-size: 18px;
	line-height: 22px;
	color: #9ca9ac;
}
.buy-container h4 {
	font-weight: 700;
	font-size: 40px;
	margin-top: 40px;
	margin-left: 40px;
}
.buy-container span {
	font-weight: normal;
	margin-left: 4px;
}

.sidebar {
	display: flex;
	flex-direction: column;
	position: fixed;
	width: 360px;
	height: 100%;
	top: 0;
	background: rgb(5, 28, 34, 0.5);
	right: 0;
}

/* stuff inside sidebar */

/* main release page items */
.outer-container {
	display: flex;
	flex-direction: row;
	margin-top: 0px;
}
.outer-container img {
	z-index: 60px;
	width: 290px;
	height: 290px;
	margin-top: 54px;
	margin-left: 62px;
	border-radius: 1px;
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
	outline: none;

	background: linear-gradient(262.53deg, #608dff 3.6%, #3f74fb 100%);
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 30px #134ad3,
		inset 0px 0px 10px #3f74fb;
	border-radius: 120px;
	border-radius: 120px;
	transition: all 0.1s;
}
.btn-b:hover {
	transform: scale(1.05);
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
.play-item {
	z-index: 500000;
	position: absolute;
}
.activeItem {
	color: #5a86f5;
}

.play-track {
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-left: 5px;
}
.svg-cont {
	display: flex;
	justify-content: center;
	align-items: center;
}

.play-hover {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tracklist {
	width: calc(90% - 350px);
	margin-left: 62px;
	margin-top: 56px;
	border-collapse: collapse;
}
.table-spacing {
	margin-bottom: 20px;
	margin-left: 15px;
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

tr:nth-child(3) {
	border-top: none;
}
.track:last-child {
	border-bottom: none;
}
/* track list */

/* main release page items */

@media only screen and (max-width: 450px) {
	.sidebar {
		display: none;
	}
	.tracklist {
		width: 75%;
		margin-left: 20px;
		border-collapse: separate;
	}
	.outer-container {
		margin-top: 40px;
	}
	.outer-container img {
		margin-left: 20px;
		width: 120px;
		height: 120px;
		align-self: center;
	}
	.album-info {
		margin-left: 20px;
		align-self: center;
		margin-top: 50px;
	}
	.album-info h1 {
		font-size: 30px;
	}

	.album-info h2 {
		font-size: 16px;
		margin-top: 7px;
	}
	.album-buttons {
		margin-top: 0px;
	}
	.btn-b {
		margin-top: 0px;
		width: 128px;
		height: 48px;
	}
}
</style>
