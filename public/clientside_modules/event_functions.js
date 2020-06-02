import { ShowElement, HideElement, ClearElement, WriteJSONToDocument } from './ui.js';
import Log from './logger.js';

// global settings
const api_endpoint = '/api/';
let request_has_body = false;

function checkRequestHasBody() {
	const method = document.querySelector('#http-method').value;

	switch(method) {
		case 'POST':
		case 'PUT':
			request_has_body = true;
			break;

		case 'GET':
		case 'DELETE':
			request_has_body = false;
			break;

		default:
			Log('Unexpected value at Method Menu: ', method);
			throw new Error('Unexpected value of Method');
	}
}

// optional fields are related to JSON request payloads
export function ShowHideOptionalFields() {
	checkRequestHasBody();
	if(request_has_body) {
		ShowElement('#optional-field');
		Log('Optional Fields visible');
	} else {
		HideElement('#optional-field');
		ClearElement('#request-body');
		Log('Optional Fields hidden');
	}
}

// function executed by event listener on submit button press
export function ProcessRequestSubmit(event) {
	// prevent submission
	event.preventDefault();

	// clear response area of previous responses
	ClearElement('#response-area');
	Log('Response area cleared');

	let serverRequestPayload;

	checkRequestHasBody();
	if(request_has_body) {
		serverRequestPayload = {
			url: document.querySelector('#address').value,
			method: document.querySelector('#http-method').value,
			data: JSON.parse(document.querySelector('#request-body').value),
		};
		Log('Server Request Prepared with body: ', serverRequestPayload);
	} else {
		serverRequestPayload = {
			url: document.querySelector('#address').value,
			method: document.querySelector('#http-method').value
		}
		Log('Server Request Prepared without body: ', serverRequestPayload);
	}

	SendToServer(serverRequestPayload);
}

// function private to this module
async function SendToServer(payload) {
	const JSONHeaders = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	};

	const submitRequest = new Request(api_endpoint, {
		method: 'POST',		// we always post to our server
		headers: JSONHeaders,
		body: JSON.stringify(payload),
	});
	Log('Request Object Initialized: ', submitRequest);

	// try to submit request if Request Object has been successfully created
	if(submitRequest) {
		try {
			const response = await fetch(submitRequest);
			const json = await response.json();
			Log('Request Completed Successfully');

			WriteJSONToDocument('#response-area', json);
			Log('Writing Response to Document');
		} catch (err) {
			Log("Failed to Receive Response: ", err);
		}
	}
}
