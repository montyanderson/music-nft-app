import Vue from "vue";
import Vuex from "vuex";
import Eth from "web3-eth";

import { ocean } from "../lib/contract.js";
import price from "../lib/price.js";
import { getRelease, getAvailableToken } from "../lib/release.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		releases: [],
		releasesLoading: true,
		walletConnected: false,
		address: "",
		balance: "",
		ethPrice: null
	},
	mutations: {
		setReleases(state, releases) {
			state.releases = [...releases];
		},

		finishLoading(state) {
			state.releasesLoading = false;
		},

		connectWallet(state, { address, balance }) {
			state.walletConnected = true;
			state.address = address;
			state.balance = balance;
		},

		setEthPrice(state, ethPrice) {
			state.ethPrice = ethPrice;
		}
	},
	actions: {
		async getReleases({ commit, state }) {
			console.log(ocean);

			const releasesCache = localStorage.getItem("releases-cache");

			if (typeof releasesCache === "string") {
				commit("setReleases", JSON.parse(releasesCache));
				commit("finishLoading");
			}

			let totalReleases = Number(
				await ocean.methods.getReleaseSupply().call()
			);

			const releaseIds = [];

			for (let i = 0; i < totalReleases; i++) {
				releaseIds.push(i);

				// for debug
				releaseIds.push(i);
				releaseIds.push(i);
				releaseIds.push(i);
				releaseIds.push(i);
			}

			const releases = await Promise.all(releaseIds.map(getRelease));

			commit("setReleases", releases);
			commit("finishLoading");

			localStorage.setItem("releases-cache", JSON.stringify(releases));
		},

		async connectWallet({ commit, state }) {
			// await window.ethereum.enable();
			await window.ethereum.enable();

			ocean.setProvider(window.ethereum);

			const eth = new Eth(window.ethereum);

			const address = window.ethereum.selectedAddress;

			commit("connectWallet", {
				address,
				balance: await eth.getBalance(address)
			});
		},

		async buy({ commit, dispatch, state }, releaseId) {
			const tokenId = await getAvailableToken(releaseId);
			console.log("buy", { tokenId });

			// send transaction
			const tx = ocean.methods.buyToken(tokenId).send({
				from: window.ethereum.selectedAddress,
				value: await ocean.methods.getPrice(tokenId).call()
			});

			// wait for transaction to finish
			const receipt = await new Promise(resolve =>
				tx.once("receipt", resolve)
			);

			console.log({ receipt });

			await dispatch("getReleases");
		},

		async getPrice({ commit }) {
			commit("setEthPrice", await price.getUSD());
		}
	},
	modules: {}
});
