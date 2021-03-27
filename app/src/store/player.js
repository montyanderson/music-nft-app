const audio = new Audio();

export default {
	namespaced: "true",
	state: {
		playlist: [],
		index: 0,
		isPlaying: false,
		currentTime: 0,
		duration: 0,
		volume: 0.8
	},
	getters: {
		track(state) {
			return state.playlist[
				Math.abs(state.index % state.playlist.length)
			];
		},
		progress(state) {
			return (state.currentTime / state.duration) * 100;
		},
	},
	mutations: {
		start(state, { playlist, index }) {
			state.playlist = playlist;
			state.index = index;

			audio.volume = state.volume;

			audio.src = state.playlist[
				Math.abs(state.index % state.playlist.length)
			].url;

			audio.play();

			state.currentTime = 0;
			state.isPlaying = true;
		},

		pause(state) {
			audio.pause();
			state.isPlaying = false;
		},

		play(state) {
			audio.play();
			state.isPlaying = true;
		},

		forward(state) {
			state.index++;

			audio.src =
				state.playlist[
					Math.abs(state.index % state.playlist.length)
				].url;

			audio.play();

			state.currentTime = 0;
			state.isPlaying = true;
		},

		back(state) {
			state.index--;

			audio.src =
				state.playlist[
					Math.abs(state.index % state.playlist.length)
				].url;

			audio.play();

			state.currentTime = 0;
			state.isPlaying = true;
		},

		setProgress(state, { duration, currentTime }) {
			state.duration = duration ;
			state.currentTime = currentTime ;
		},

		setCurrentTime(state, currentTime) {
			audio.currentTime = currentTime;
			state.currentTime = currentTime;
		},

		setVolume(state, volume) {
			audio.volume = volume;
			state.volume = volume;
		}
	},
	actions: {
		init({ state, commit, dispatch }) {
			window.audio = audio;

			audio.addEventListener("ended", function() {
				commit("forward");
			});

			setInterval(() => {
				dispatch("updateProgress");
			}, 100);
		},

		updateProgress({ state, commit }) {
			const { duration, currentTime } = audio;

			if (isNaN(duration) || isNaN(currentTime)) {
				return;
			}

			commit("setProgress", {
				duration,
				currentTime
			});
		}
	}
};
