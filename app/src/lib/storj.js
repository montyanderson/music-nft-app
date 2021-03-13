import S3 from "aws-sdk/clients/s3";
import url from "url";

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

export { getCredentialsFromAccess };

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

export { getUrlFromStorjUri };