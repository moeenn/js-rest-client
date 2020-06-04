import { ShowElement, HideElement, ClearElement, WriteJSONToDocument, WriteStatusCode } from './ui.js';
import Log, { LoggingEnabled } from './logger.js';

// global settings
const api_endpoint = '/api/';
let request_has_body = false;

// enable console logging of debug messages
LoggingEnabled(true);


// if request needs a body, this data will be obtained from the user form
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


// optional fields are related to raw JSON input
export function ShowHideOptionalFields() {
	checkRequestHasBody();
	if(request_has_body) {
		ShowElement('#optional-field');
		Log('Optional Fields visible');
	} else {
		HideElement('#optional-field');
		// ClearElement('#request-body');
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

	let serverRequestPayload = {
		url: document.querySelector('#address').value,
		method: document.querySelector('#http-method').value
	};

	checkRequestHasBody();
	if(request_has_body) {
		const dataObject = JSON.parse(document.querySelector('#request-body').value);
		serverRequestPayload['data'] = dataObject;
	}

	Log('Server Request Prepared: ', serverRequestPayload);
	SendToServer(serverRequestPayload);
}


// function private within this module
async function SendToServer(payloadObject) {
	const requestObject = {
		method: 'POST',		// we always post to our server
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payloadObject),
	};

	const submitRequest = new Request(api_endpoint, requestObject);
	Log('Request Object Initialized: ', submitRequest);

	// try to submit request if Request Object has been successfully created
	try {
		const response = await fetch(submitRequest);
		const responseJSON = await response.json();
		Log('Request Completed Successfully', responseJSON);

		WriteStatusCode(responseJSON.http_status_code);
		WriteJSONToDocument('#response-area', responseJSON.data);
		Log('Writing Response to Document');
 	}
	catch (error) {
		Log('Failed to Receive Response: ', error.message);
	}

}
