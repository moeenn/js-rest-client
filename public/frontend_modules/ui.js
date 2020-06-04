// UI related functions

export function ShowElement(elementIdentifier) {
	const element = document.querySelector(elementIdentifier);
	if(element) {
		element.style.display = 'block';
	} else {
		throw new Error(`Element with identifier ${elementIdentifier} not found`);
	}
}

export function HideElement(elementIdentifier) {
	const element = document.querySelector(elementIdentifier);
	if(element) {
		element.style.display = 'none';
	} else {
		throw new Error(`Element with identifier ${elementIdentifier} not found`);
	}
}

export function ClearElement(elementIdentifier) {
	const element = document.querySelector(elementIdentifier);
	if(element) {
		element.value = '';
	} else {
		throw new Error(`Element with identifier ${elementIdentifier} not found`);
	}
}

export function WriteJSONToDocument(elementIdentifier, contentJSON) {
	const element = document.querySelector(elementIdentifier);
	if(element) {
		element.innerHTML = JSON.stringify(contentJSON, null, 2);
	} else {
		throw new Error(`Element with identifier ${elementIdentifier} not found`);
	}
}

export function WriteStatusCode(statusCode) {
	const tag = document.querySelector('#status-code')
	tag.innerHTML = statusCode;

	switch(statusCode) {
		case 200:
			tag.className = 'positive tag';
			break;

		case 201:
			tag.className = 'info tag';
			break;

		case 404:
			tag.className = 'negative tag';
			break;

		default:
			tag.className = 'alert tag';

	}
}
