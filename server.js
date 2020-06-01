const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// globals
const port = 8000;
const app = express();

// static folder
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));
app.use(bodyParser.json());

// get the actual external json data
async function makeExternalRequest(url, method, data, callback) {
	try {
		const response = await fetch(url, {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			// TODO: GET request cannot have body
			// body: JSON.stringify(data),
		});

		const json = await response.json();
		callback(json);
	} catch (err) {
		console.error("Failed to Receive Response: ", err);
	}
}

// API endpoint
app.post('/api/', (req, res) => {
	// get JSON response from external sources
	makeExternalRequest(req.body.url, req.body.method, req.body.data, (json) => {
		// send JSON response to frontend
		res.send(json);
	});
});

// start the server
app.listen(port, () => {
	console.log('Running server on Port ', port);
})