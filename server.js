const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

// globals
const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));	// static folder
app.use(bodyParser.json());									// parsing received JSON

function makeExternalRequest(clientRequest, callback) {
	console.log('Making External Request: ', clientRequest);

	const JSONHeaders = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	};

	fetch(clientRequest.url, {
		method: clientRequest.method,
		headers: JSONHeaders,
		body: JSON.stringify(clientRequest.data),
	})
		.then( function (response) { response.json(); })
		.then( function (json) { callback(json); })
		.catch( function (err) { console.error(err.message); });
}

// primary api endpoint
app.post('/api/', function (req, res, next) {
	console.log('Request Received: ', req.body);
	const clientRequest = req.body;

	// get JSON response from external sources
	makeExternalRequest(clientRequest, function (json) {
		// send JSON response to frontend
		res.send(json);
	});

	next();
});

// start the server
app.listen(port, function () {
	console.log('Running server on Port ', port);
});