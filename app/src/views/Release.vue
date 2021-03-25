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
				<td v-if="hover === index">
					<div class="play-track" v-on:click="play(track)">
						<svg
							v-if="isPlaying"
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
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g filter="url(#filter0_i)">
								<circle cx="20" cy="20" r="20" fill="white" />
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
				</td>
				<td v-else>{{ index + 1 }}</td>

				<td>{{ track.name }}</td>
				<td v-on:click="play(track)">Play</td>
			</tr>
		</table>

		<div class="sidebar">
			<div class="buy-container">
				<div class="line-wrapper">
					<p class="eth">{{ ethPrice }}</p>
					<p class="eth-eth eth">&nbsp; ETH</p>
					<p class="available">
						{{ release.availableCopies }} available
					</p>
				</div>
				<div class="currency-wrapper">
					<p class="dollar">${{ usdPrice }}</p>
					<p class="supply">{{ release.totalCopies }} in supply</p>
				</div>
				<div class="btn-cont">
					<button
						class="btn-a confetti-button"
						:class="{ animate: animate }"
						v-on:click="buy"
						@click="anim"
					>
						Buy now
					</button>

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
					<p v-if="release.owners.length === 0">
						no ones owns this yet :(
					</p>
					<p></p>
					<p v-for="owner in release.owners">{{ owner.address }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			hover: null,
			animate: false
		};
	},
	watch: {
		animate: function() {
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
				release => String(release.id) === this.$route.params.id
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
		}
	},
	methods: {
		anim() {
			this.animate = true;
		},
		async buy() {
			await this.$store.dispatch("buy", this.release.id);
		},
		async play(track) {
			this.$store.commit("player/start", {
				playlist: this.release.tracks,
				index: this.release.tracks.indexOf(track)
			});
		}
	}
};
</script>

<style scoped>
.play-item {
	z-index: 500000;
	position: absolute;
}
/* anim */
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
	display: block;
	animation: topBubbles ease-in-out 0.75s forwards;
}

.confetti-button.animate:after {
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
.activeItem {
	color: #3f74fb;
}

.play-track {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	right: 30px;
	cursor: pointer;
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
</style>
