import UI from './ui.js';
import Payload from './payload.js';


// optional fields are related to JSON request payloads
export function ShowHideOptionalFields() {
	const method = document.querySelector('#http-method').value;

	// only display optional fields if relevant
	if ( method === 'POST' || method === 'PUT' ) {
		UI.ShowElement('#optional-field');
	} else {
		UI.HideElement('#optional-field');
		UI.ClearElement('#request-body');
	}
}

// export function SendRequest(event) {
// 	// prevent submission
// 	event.preventDefault();

// 	// clear response area of previous responses
// 	UI.ClearElement('#response-area');

// 	// get the form values
// 	const URL = document.querySelector('#address').value;
// 	const method = document.querySelector('#http-method').value

// 	const xhr = new XMLHttpRequest();
// 	xhr.open(method, URL, true);

// 	// on completion
// 	xhr.onload = function() {
// 		if (this.status === 200 && this.responseText.length != 0 ) {
// 			console.log("Response Received: ", this.responseText);
// 			UI.WriteToDocument(this.responseText);
// 		}
// 		UI.WriteStatusCode(this.status);
// 	}

// 	// report error on response
// 	xhr.onerror = function() {
// 		console.log('Failed to receive response from server!');
// 	}

// 	const requestBody = document.querySelector('#request-body').value;
// 	if ( requestBody.length != 0 ) {
// 		console.log('Sending Request with body content ...');
// 		xhr.send(requestBody);
// 	} else {
// 		console.log('Sending Request ...');
// 		xhr.send();
// 	}
// }

async function SendToServer(payload) {
	// submit client request to own server
	const submitRequest = new Request('/api/', {
		method: 'POST',		// we always post to our server
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	console.log(submitRequest);

	try {
		const response = await fetch(submitRequest);
		const json = await response.json();
		UI.WriteToDocument(json);
	} catch (err) {
		console.error("Failed to Receive Response: ", err);
	}
}

export function ProcessRequestSubmit(event) {
	// prevent submission
	event.preventDefault();

	// clear response area of previous responses
	UI.ClearElement('#response-area');

	// get the form values
	const URL = document.querySelector('#address').value;
	const method = document.querySelector('#http-method').value;
	const requestBody = document.querySelector('#request-body').value;

	const serverRequestPayload = new Payload(URL, method, requestBody);
	SendToServer(serverRequestPayload);
}