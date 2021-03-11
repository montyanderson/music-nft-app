import url from "url";
import Vue from "vue";
import Vuex from "vuex";
import Contract from "web3-eth-contract";
import Web3WsProvider from "web3-providers-ws";
import S3 from "aws-sdk/clients/s3";
import abi from "../abi.json";

// Contract.setProvider(web3.currentProvider);
Contract.setProvider(
	new Web3WsProvider(
		"wss://ropsten.infura.io/ws/v3/e0521fe0263543b79880ef251466bf33"
	)
);

const ocean = (window.ocean = new Contract(
	abi,
	"0x97cF2bB8186439935894ce9628993B5476bB9343"
));

Vue.use(Vuex);

async function getCredentialsFromAccess(access_grant) {
	const storedCredentials = localStorage.getItem(`access:${access_grant}`);

	if (typeof storedCredentials === "string") {
		console.log("returning credentials from cache");
		return JSON.parse(storedCredentials);
	}

	const response = await fetch("https://auth.tardigradeshare.io/v1/access", {
		method: "POST",
		body: JSON.stringify({
			access_grant,
			public: false
		})
	});

	const { access_key_id, secret_key } = await response.json();

	const credentials = {
		accessKey: access_key_id,
		secretKey: secret_key
	};

	localStorage.setItem(`access:${access_grant}`, JSON.stringify(credentials));

	return credentials;
}

const urlCache = new Map();

async function getUrlFromStorjUri(uri) {
	if (urlCache.has(uri) === true) {
		return urlCache.get(uri);
	}

	const { auth, host, path } = url.parse(uri);
	console.log({ auth, host, path });

	const { accessKey, secretKey } = await getCredentialsFromAccess(auth);
	console.log({ accessKey, secretKey });

	const s3 = new S3({
		accessKeyId: accessKey,
		secretAccessKey: secretKey,
		endpoint: "https://gateway.tardigradeshare.io",
		s3ForcePathStyle: true,
		signatureVersion: "v4"
	});

	const signedUrl = s3.getSignedUrl("getObject", {
		Bucket: host,
		Key: path.slice(1)
	});

	urlCache.set(uri, signedUrl);

	return signedUrl;
}

async function getRelease(releaseId) {
	const tokenId = Number(
		await ocean.methods.getTokenByRelease(releaseId, 0).call()
	);
	console.log({ releaseId, tokenId });

	// e.g. sj://myaccess:mybucket/metadata.json

	const [
		metadataUri,
		_availableCopies,
		_totalCopies,
		price
	] = await Promise.all([
		ocean.methods.tokenURI(tokenId).call(),
		ocean.methods.getAvailableCopies(tokenId).call(),
		ocean.methods.getTotalCopies(tokenId).call(),
		ocean.methods.getPrice(tokenId).call()
	]);

	const availableCopies = Number(_availableCopies);
	const totalCopies = Number(_totalCopies);

	const owners = (await Promise.all([...Array(totalCopies).keys()].map(async i => {
		try {
			return {
				tokenId: tokenId + i,
				address: await ocean.methods.ownerOf(tokenId + i).call()
			};
		} catch(err) {
			return null;
		}
	}))).filter(address => address !== null);

	console.log({ metadataUri, availableCopies, price });

	let available = 0;

	// e.g. https://gateway.tardigradeshare.io/...
	const metadataUrl = await getUrlFromStorjUri(metadataUri);
	console.log({ metadataUrl });

	// NFT metadata format
	const metadata = await (await fetch(metadataUrl)).json();
	console.log({ metadata });

	// images are typically relative to metadata.json
	const imageUri = url.resolve(metadataUri, metadata.image);
	console.log({ imageUri });

	const imageUrl = await getUrlFromStorjUri(imageUri);
	console.log({ imageUrl });

	const release = {
		id: releaseId,
		name: metadata.name,
		artist: metadata.artist,
		tracks: metadata.tracks,
		imageUrl: imageUrl,
		availableCopies,
		totalCopies,
		price,
		owners
	};

	// wait for image to load into browser cache
	await new Promise(resolve => {
		const preload = new Image();

		preload.onload = resolve;
		preload.src = release.imageUrl;
	});

	return release;
}

export default new Vuex.Store({
	state: {
		releases: [],
		releasesLoading: true,
		walletConnected: false
	},
	mutations: {
		setReleases(state, releases) {
			state.releases = [...releases];
		},

		finishLoading(state) {
			state.releasesLoading = false;
		},

		connectWallet(state) {
			state.walletConnected = true;
		}
	},
	actions: {
		async getReleases({ commit, state }) {
			console.log(ocean);

			const releasesCache = localStorage.getItem("releases-cache");

			if(typeof releasesCache === "string") {
				commit("setReleases", JSON.parse(releasesCache));
			}

			

			let totalReleases = Number(
				await ocean.methods.getReleaseSupply().call()
			);

			const releaseIds = [];

			for (let i = 0; i < totalReleases; i++) {
				releaseIds.push(i);

				// for debug
				//releaseIds.push(i);
				//releaseIds.push(i);
			}

			const releases = await Promise.all(releaseIds.map(getRelease));

			commit("setReleases", releases);
			commit("finishLoading");

			localStorage.setItem("releases-cache", JSON.stringify(releases));
		},

		async connectWallet({ commit, state }) {
			await window.ethereum.enable();

			ocean.setProvider(
				window.ethereum
			);

			commit("connectWallet");
		},

		async buy({ commit, dispatch, state }, releaseId) {
			const baseTokenId = Number(
				await ocean.methods.getTokenByRelease(releaseId, 0).call()
			);

			const totalCopies = Number(
				await ocean.methods.getTotalCopies(baseTokenId).call()
			);

			const tokenId = await (async () => {
				for(let i = 0; i < totalCopies; i++) {
					try {
						await ocean.methods.ownerOf(baseTokenId + i).call()
					} catch(err) {
						return baseTokenId + i;
					}
				}
			})();

			console.log('buy', {tokenId});

			const tx = ocean.methods.buyToken(tokenId).send({
				from: window.ethereum.selectedAddress,
				value: await ocean.methods.getPrice(tokenId).call()
			});

			const receipt = await new Promise(resolve => tx.once('receipt', resolve));
			console.log({ receipt });

			await dispatch("getReleases");
		}
	},
	modules: {}
});
