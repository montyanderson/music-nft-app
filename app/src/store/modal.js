export default {
	namespaced: "true",
	state: {
        active: null
	},
	mutations: {
        open(state, id) {
            state.active = id;
        },

        close() {
            state.active = null;
        }
	}
};
