<template>
	<div class="player-container">
		<div class="playbtn" @click="pausePlay">
			<h3 class="play-fill" v-if="isPlaying">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="27"
					height="27"
					fill="currentColor"
					class="bi bi-pause-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"
					/>
				</svg>
			</h3>
			<h3 class="play-fill" v-else id="play-fill">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					fill="currentColor"
					class="bi bi-play-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
					/>
				</svg>
			</h3>
		</div>
		<div class="forward" @click="forward">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="27"
				height="27"
				fill="currentColor"
				class="bi bi-skip-end-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"
				/>
			</svg>
		</div>
		<div class="back" @click="back">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="27"
				height="27"
				fill="currentColor"
				class="bi bi-skip-start-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"
				/>
			</svg>
		</div>

		<input
			type="range"
			class="progress-bar"
			min="0"
			:max="duration"
			step="0.1"
			v-model="inputCurrentTime"
			@mouseup="progressBarClicked = true"
			@mousedown="progressBarClicked = false"
		/>

		<div class="volumeicon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="27"
				height="27"
				fill="currentColor"
				class="bi bi-volume-down-fill"
				viewBox="0 0 16 16"
			>
				<path
					d="M9 4a.5.5 0 0 0-.812-.39L5.825 5.5H3.5A.5.5 0 0 0 3 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 9 12V4zm3.025 4a4.486 4.486 0 0 1-1.318 3.182L10 10.475A3.489 3.489 0 0 0 11.025 8 3.49 3.49 0 0 0 10 5.525l.707-.707A4.486 4.486 0 0 1 12.025 8z"
				/>
			</svg>
		</div>
		<input
			class="volume"
			type="range"
			value="2"
			max="1"
			min="0"
			step="0.01"
			v-model="inputVolume"
		>
		<div class="name">{{ track.name }}</div>
		<div class="artist">{{ track.artist }}</div>
		<img
			class="img"
			v-if="track && track.imageUrl"
			:src="track.imageUrl"
			alt=""
		>
		<div class="current-time">{{ currentTime | displayTime }}</div>
		<div class="duration">{{ duration | displayTime }}</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		inputVolume: 0.1,
		inputCurrentTime: 0,
		progressBarClicked: false
	}),
	watch: {
		inputVolume(volume) {
			this.$store.commit("player/setVolume", volume);
		},
		progressBarClicked(clicked) {
			if(clicked === false) {
				this.$store.commit("player/setCurrentTime", this.inputCurrentTime);
			}
		},
		currentTime(currentTime) {
			if(this.progressBarClicked === false) {
				this.inputCurrentTime = currentTime;
			}
		}
	},
	methods: {
		pausePlay() {
			if (this.isPlaying === true) {
				this.$store.commit("player/pause");
			} else {
				this.$store.commit("player/play");
			}
		},
		forward() {
			this.$store.commit("player/forward");
		},
		back() {
			this.$store.commit("player/back");
		}
	},
	computed: {
		track() {
			return this.$store.getters["player/track"];
		},
		isPlaying() {
			return this.$store.state.player.isPlaying;
		},
		duration() {
			return this.$store.state.player.duration;
		},
		currentTime() {
			return this.$store.state.player.currentTime;
		},
		progress() {
			return this.$store.getters["player/progress"];
		},
		volume() {
			return this.$store.state.player.volume;
		}
	},
	filters: {
		displayTime(totalSeconds) {
			let minutes = `${Math.floor(totalSeconds / 60)}`;
			
			if(minutes.length === 1) {
				minutes = `0${minutes}`;
			}

			let seconds = `${Math.floor(totalSeconds % 60)}`;

			if(seconds.length === 1) {
				seconds = `0${seconds}`;
			}

			return `${minutes}:${seconds}`;
		}
	}
};
</script>

<style scoped>
.player-container {
	position: fixed;
	height: 130px;
	left: 0;
	bottom: 0;
	width: 100%;
	background: #171717;
}

.playbtn {
	position: absolute;
	width: 50px;
	height: 50px;
	background: white;
	top: 45px;
	border-radius: 50%;
	cursor: pointer;
	left: 50%;
	transform: translate(-50%, -50%);
}

.play-fill {
	position: absolute;
	color: black;

	top: 55%;
	left: 50%;
	transform: translate(-50%, -50%);
}

#play-fill {
	position: absolute;
	left: 51%;
	transform: translate(-50%, -50%);
}

.forward {
	position: absolute;
	color: #878787;
	top: 45px;
	left: calc(50% + 70px);
	transform: translate(-50%, -50%);
	cursor: pointer;
}

.back {
	position: absolute;
	color: #878787;
	top: 45px;
	left: calc(50% - 70px);
	transform: translate(-50%, -50%);
	cursor: pointer;
}

progress {
}

.progress-bar {
	-webkit-appearance: none;
	appearance: none;
	position: absolute;

	background: #131313;
	border-radius: 30px;

	position: relative;
	top: 90px;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 440px;
}

.progress-bar::-webkit-slider-runnable-track {
	overflow: hidden;
}

.progress-bar::-webkit-slider-thumb {
	-webkit-appearance: none;
	margin-top: -3px;
	margin-left: 0px;
	height: 10px;
	width: 7px;
	border: 0;
	box-shadow: -440px 0 0 440px #608dff;
	background: none;
	border-radius: 30px;
	cursor: pointer;
}

.progress-bar::-webkit-slider-runnable-track {
	appearance: none;
	cursor: pointer;
	max-height: 5px;
	border-radius: 30px;
}

.progress-bar:focus {
	outline: none;
}

.volumeicon {
	position: absolute;
	top: 51.5%;
	right: 200px;
	transform: translate(-50%, -50%);
	color: #878787;
}

.volume {
	-webkit-appearance: none;
	appearance: none;
	position: absolute;

	background: #131313;
	border-radius: 30px;

	position: absolute;
	top: 50%;
	right: 50px;
	transform: translate(-50%, -50%);
	width: 100px;
}

.volume::-webkit-slider-runnable-track {
	overflow: hidden;
}

.volume::-webkit-slider-thumb {
	-webkit-appearance: none;
	margin-top: -3px;
	margin-left: 0px;
	height: 10px;
	width: 7px;
	border: 0;
	box-shadow: -440px 0 0 440px #608dff;
	background: none;
	border-radius: 30px;
	cursor: pointer;
}

.volume::-webkit-slider-runnable-track {
	appearance: none;
	cursor: pointer;
	max-height: 5px;
	border-radius: 30px;
}

.volume:focus {
	outline: none;
}

.img {
	width: 90px;
	height: 90px;
	background: grey;
	position: absolute;
	top: 50%;
	margin-left: 60px;
	transform: translate(-50%, -50%);
}

.name {
	font-size: 20px;
	margin-left: 125px;
	font-weight: 600;
	margin-top: 20px;
}

.artist {
	font-size: 13px;
	margin-left: 125px;
	margin-top: 6px;
}
.current-time {
	font-size: 13px;
	position: absolute;
	top: 100px;
	left: calc(50% - 240px);
	transform: translate(-50%, -50%);
}
.duration {
	font-size: 13px;
	position: absolute;
	top: 100px;
	left: calc(50% + 240px);
	transform: translate(-50%, -50%);
}
</style>
