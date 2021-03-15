export default {
	namespaced: "true",
	state: {
		audio: new Audio(),
		playlist: [],
		index: 0,
		isPlaying: false,
		currentTime: 0,
		duration: 0
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

			state.audio.volume = 0.1;

			state.audio.src = state.playlist[
				Math.abs(state.index % state.playlist.length)
			].url;

			state.audio.play();

			state.isPlaying = true;
		},

		pause(state) {
			state.audio.pause();
			state.isPlaying = false;
		},

		play(state) {
			state.audio.play();
			state.isPlaying = true;
		},

		forward(state) {
			state.index++;

			state.audio.src =
				state.playlist[
					Math.abs(state.index % state.playlist.length)
				].url;

			state.audio.play();
			state.isPlaying = true;
		},

		back(state) {
			state.index--;

			state.audio.src =
				state.playlist[
					Math.abs(state.index % state.playlist.length)
				].url;

			state.audio.play();
			state.isPlaying = true;
		},

		setProgress(state, { duration, currentTime }) {
			state.duration = duration ;
			state.currentTime = currentTime ;
		}
	},
	actions: {
		init({ state, commit, dispatch }) {
			window.audio = state.audio;

			state.audio.addEventListener("ended", function() {
				commit("forward");
			});

			setInterval(() => {
				dispatch("updateProgress");
			}, 100);
		},

		updateProgress({ state, commit }) {
			const { duration, currentTime } = state.audio;

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
