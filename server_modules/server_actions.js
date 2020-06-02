const fetch = require('node-fetch');

async function makeExternalRequest(clientRequest, callback) {
	try {
		const response = await fetch(clientRequest.url, {
			method: clientRequest.method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			// TODO: GET request cannot have body
			// body: JSON.stringify(clientRequest.data),
		});

		const json = await response.json();
		callback(json);
	} catch (err) {
		console.error("Failed to Receive Response: ", err);
	}
}

module.exports = makeExternalRequest;