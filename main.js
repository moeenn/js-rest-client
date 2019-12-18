// UI Class
class UI {
	static WriteToDocument(content) {
		const contentJSON = JSON.parse(content);
		// write to the page
		const writeArea = document.querySelector('#response-area');
		writeArea.innerHTML = JSON.stringify(contentJSON, null, 2);
		console.log('Response Written to Document');
	}

	static ClearOptionalField() {
		document.querySelector('#request-body').value = '';
	}

	static WriteStatusCode(code) {
		const tag = document.querySelector('#status-code')
		if (code == 200) {
			tag.className = 'positive tag';
		} else if (code == 404) {
			tag.className = 'negative tag';
		} else {
			tag.className = 'alert tag';
		}
		tag.innerHTML = code
	}
}

// event listener: Show Hide Optional Fields
document.querySelector('#http-method').addEventListener('input', ShowHideOptional);
function ShowHideOptional() {
	const method = document.querySelector('#http-method').value
	const optionalField = document.querySelector('#optional-field')

	// only display request body if relevant
	if ( method == 'POST' || method == 'PUT' ) {
		optionalField.style.display = 'block';
	} else {
		optionalField.style.display = 'none';
		UI.ClearOptionalField();
	}
}

// watch for submit
document.querySelector('#entry-form').addEventListener('submit', sendRequest);
function sendRequest(event) {
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