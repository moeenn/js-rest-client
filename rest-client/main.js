// globals
let METHOD;

// watch for submit
document.querySelector('#entry-form').addEventListener('submit', (event) => {
	// prevent submission
	event.preventDefault();

	// get the form values
	const URL = document.querySelector('#address').value;

	// get optional fields
	// if (METHOD == 'POST' || METHOD == 'PUT') {}

	const xhr = new XMLHttpRequest();
	xhr.open(METHOD, URL, true);

	// loading
	xhr.onprogress = function() {
		console.log('Sending Request ...');
	}

	// on completion
	xhr.onload = function() {
		if (this.status == 200) {
			console.log('Response Status: OK');
			console.log(this.responseText);
		} else if ( this.status == 404 ) {
			console.log('Response Status: Not Found (404)');
		}
	}

	// report error on response
	xhr.onerror = function() {
		console.log('Failed to receive response from server!');
	}

	// send resquest
	xhr.send();
});

// menu item selection
document.querySelector('#request-method').addEventListener('input', GetMethod);

function GetMethod() {
	METHOD = document.querySelector('#request-method').value;
	const optionalFields = document.querySelector('#optional-fields')

	if (METHOD == 'POST' || METHOD == 'PUT') {
		optionalFields.style.display = 'block';
	} else {
		optionalFields.style.display = 'none';
	}
}