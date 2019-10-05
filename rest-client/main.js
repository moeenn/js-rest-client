// UI Class
class UI {
	static WriteToDocument(content) {
		let contentJSON;

		// check input is valid JSON
		try {
			contentJSON = JSON.parse(content);
		}
		catch(error) {
			console.log('Invalid JSON String:', error);
			return;
		}

		// write to the page
		const writeArea = document.querySelector('#response-area');
		writeArea.innerHTML = JSON.stringify(contentJSON, null, 2);
		console.log('Response Written to Document');
	}
}

// event listener: Show Hide Optional Fields
document.querySelector('#http-method').addEventListener('input', ShowHideOptional);

function ShowHideOptional() {
	const optionalFields = document.querySelector('#optional-fields')
	const method = document.querySelector('#http-method').value

	// only display request body if relevant
	if ( method == 'POST' || method == 'PUT' ) {
		optionalFields.style.display = 'block';
	} else {
		optionalFields.style.display = 'none';
	}
}

// watch for submit
document.querySelector('#entry-form').addEventListener('submit', (event) => {
	// prevent submission
	event.preventDefault();

	// get the form values
	const URL = document.querySelector('#address').value;
	const method = document.querySelector('#http-method').value

	const xhr = new XMLHttpRequest();
	xhr.open(method, URL, true);

	// on completion
	xhr.onload = function() {
		if (this.status == 200 && this.responseText.length != 0 ) {
			console.log('Response Status: OK');
			UI.WriteToDocument(this.responseText);
		} else if ( this.status == 404 ) {
			console.log('Response Status: Not Found (404)');
		}
	}

	// report error on response
	xhr.onerror = function() {
		console.log('Failed to receive response from server!');
	}

	const requestBody = document.querySelector('#request-body').value;
	if ( requestBody.length != 0 ) {
		console.log('Request Body Set:', requestBody);
		console.log('Sending Request with body content ...');
		xhr.send(requestBody);
	} else {
		console.log('Sending Request ...');
		xhr.send();
	}
});

