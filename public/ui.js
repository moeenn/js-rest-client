// UI Class
export default class UI {
	static WriteToDocument(contentJSON) {
		// const contentJSON = JSON.parse(content);
		// write to the page
		const writeArea = document.querySelector('#response-area');
		writeArea.innerHTML = JSON.stringify(contentJSON, null, 2);
		console.log('Response Written to Document');
	}

	static ShowElement(elementIdentifier) {
		const element = document.querySelector(elementIdentifier);
		element.style.display = 'block';
	}

	static HideElement(elementIdentifier) {
		const element = document.querySelector(elementIdentifier);
		element.style.display = 'none';
	}

	static ClearElement(elementIdentifier) {
		document.querySelector(elementIdentifier).value = '';
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
		tag.innerHTML = code;
	}
}