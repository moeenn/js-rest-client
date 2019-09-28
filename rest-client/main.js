// UI class
class UI {
	static WriteResponse(response) {
		const respnseArea = document.querySelector('#response_area');
		respnseArea.innerHTML = JSON.stringify(response, null, 2);
	}
}

// get the JSON response from REST API
function getResponse( method, url ) {
	// create request object
	const request = new XMLHttpRequest();
	request.open(method, url, true);

	// perform action on json response
	request.onload = function() {
		const receivedData = JSON.parse(this.response);
		console.log(receivedData);
		UI.WriteResponse(receivedData);
	}
	request.send();
}

// event
document.querySelector('#entry_form').addEventListener('submit', (event) => {
	// prevent submission
	event.preventDefault();

	const method = document.querySelector('#request_method').value;
	const url = document.querySelector('#address').value;

	getResponse(method, url);
});