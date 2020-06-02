export function SendRequest(event) {
	// prevent submission
	event.preventDefault();

	// clear response area of previous responses
	UI.ClearElement('#response-area');

	// get the form values
	const URL = document.querySelector('#address').value;
	const method = document.querySelector('#http-method').value

	const xhr = new XMLHttpRequest();
	xhr.open(method, URL, true);

	// on completion
	xhr.onload = function() {
		if (this.status === 200 && this.responseText.length != 0 ) {
			console.log("Response Received: ", this.responseText);
			UI.WriteToDocument(this.responseText);
		}
		UI.WriteStatusCode(this.status);
	}

	// report error on response
	xhr.onerror = function() {
		console.log('Failed to receive response from server!');
	}

	const requestBody = document.querySelector('#request-body').value;
	if ( requestBody.length != 0 ) {
		console.log('Sending Request with body content ...');
		xhr.send(requestBody);
	} else {
		console.log('Sending Request ...');
		xhr.send();
	}
}
