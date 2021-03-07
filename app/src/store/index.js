import { getDiffieHellman } from 'crypto';
import url from 'url';
import Vue from 'vue';
import Vuex from 'vuex';
import Web3 from 'web3';
import AWS from 'aws-sdk';
import abi from '../abi.json';

const web3 = new Web3(window.web3.currentProvider);

const ocean = new web3.eth.Contract(abi, "0x80A0f2482c5BcB72fF39835Dd2EE90ADc0352946");

Vue.use(Vuex);

async function getCredentialsFromAccess(access_grant) {
    const storedCredentials = localStorage.getItem(`access:${access_grant}`);

    if(typeof storedCredentials === "string") {
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

    const {
        access_key_id,
        secret_key
    } = await response.json();

    const credentials = {
        accessKey: access_key_id,
        secretKey: secret_key
    };

    localStorage.setItem(`access:${access_grant}`, JSON.stringify(credentials));

    return credentials;
};

async function getUrlFromStorjUri(uri) {
    const {auth, host, path} = url.parse(uri);
    console.log({auth, host, path});

    const {accessKey, secretKey} = await getCredentialsFromAccess(auth);
    console.log({accessKey, secretKey});

    const s3 = new AWS.S3({
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
        endpoint: "https://gateway.tardigradeshare.io",
        s3ForcePathStyle: true,
        signatureVersion: "v4"
    });

    return s3.getSignedUrl('getObject', {
        Bucket: host,
        Key: path.slice(1)
    });
}

export default new Vuex.Store({
	state: {
		releases: []
	},
	mutations: {
		pushRelease(state, release) {
			const releases = [
                ...state.releases,
                release
            ];

            state.releases = releases;
		}
	},
	actions: {
		async getReleases({commit}) {
            await new Promise(r => setTimeout(r, 200));

            console.log(ocean);

			const totalReleases = Number(await ocean.methods.getReleaseSupply().call());
            console.log({ totalReleases });

            for(let releaseId = 0; releaseId < totalReleases; releaseId++) {
                const tokenId = Number(await ocean.methods.getTokenByRelease(releaseId, 0).call());
                console.log({ releaseId, tokenId });

                // e.g. sj://myaccess:mybucket/metadata.json
                const metadataUri = await ocean.methods.tokenURI(tokenId).call();
                console.log({metadataUri});

                // e.g. https://gateway.tardigradeshare.io/...
                const metadataUrl = await getUrlFromStorjUri(metadataUri);
                console.log({metadataUrl});

                const metadata = await (await fetch(metadataUrl)).json();
                console.log({metadata});

                const imageUri = url.resolve(metadataUri, metadata.image);
                console.log({imageUri});

                const imageUrl = await getUrlFromStorjUri(imageUri);
                console.log({imageUrl});

                const release = {
                    id: releaseId,
                    name: metadata.name,
                    imageUrl: imageUrl
                };

                console.log({release});

                commit('pushRelease', release);
            }
		}
	},
	modules: {
	}
});

