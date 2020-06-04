const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// primary API request handling function
async function externalJSON(req, res, next) {
	const request = req.body;
	console.log('Making External Request: ', request);

	const payload = {
		method: request.method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(request.data),
	}

	// response to be sent to client i.e. frontend
	const clientResponse = {};

	// make the external request
	try {
		const response = await fetch(request.url, payload);
		clientResponse['http_status_code'] = response.status;

		const json = await response.json();
		clientResponse['data'] = json;

		console.log('External Request Successful!');
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.error(error);
	}

	console.log(clientResponse);
	res.status(200).json(clientResponse);
	next();
}
router.post('/', externalJSON);

// testing function
function echoJSON(req, res, next) {
	const payload = req.body;
	console.log('Echoing Request: ', payload);

	res.status(200).json(payload);
	next();
}
router.post('/echo', echoJSON);


module.exports = router;