import url from "url";
import { ocean } from "./contract.js";
import { getUrlFromStorjUri } from "./storj.js";

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

	const owners = (
		await Promise.all(
			[...Array(totalCopies).keys()].map(async i => {
				try {
					return {
						tokenId: tokenId + i,
						address: await ocean.methods.ownerOf(tokenId + i).call()
					};
				} catch (err) {
					return null;
				}
			})
		)
	).filter(address => address !== null);

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
};

async function getAvailableToken(releaseId) {
	const baseTokenId = Number(
		await ocean.methods.getTokenByRelease(releaseId, 0).call()
	);

	const totalCopies = Number(
		await ocean.methods.getTotalCopies(baseTokenId).call()
	);

	const tokenId = await (async () => {
		for (let i = 0; i < totalCopies; i++) {
			try {
				await ocean.methods.ownerOf(baseTokenId + i).call();
			} catch (err) {
				return baseTokenId + i;
			}
		}
	})();

	if(typeof tokenId !== "number") {
		throw new Error("No tokens left to buy");
	}

	return tokenId;
}

export {
	getRelease,
	getAvailableToken
};