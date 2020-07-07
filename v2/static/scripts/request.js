class Request {
	static async Get(url, callback) {
		let res, json = undefined;

		const timer_start = performance.now();
		try {
			res = await fetch(url);
			json = await res.json();
		} catch (error) {
			throw `Request Failed: ${error}`;
		}
		const timer_end = performance.now();

		const responseObj = {
			body: json,
			status: res.status,
			timeElapsed: `${parseInt(timer_end - timer_start)}ms`
		};

		callback(responseObj);
	}

	static async Post(url, jsonObj, callback) {
		let res, json = undefined;
		const timer_start = performance.now();
		const requestHeaders = {
			method: 'POST',
			headers: new Headers(),
			body: JSON.stringify(jsonObj)
		}

		try {
			res = await fetch(url, requestHeaders);
			json = await res.json();
		} catch (err) {
			console.error('Request Failed: ', err);
		}
		const timer_end = performance.now();

		const responseObj = {
			body: json,
			status: res.status,
			timeElapsed: `${parseInt(timer_end - timer_start)}ms`
		};

		callback(responseObj);
	}

	static async Other(url, method, callback) {
		let res, json = undefined;
		const requestHeaders = {
			method: method.toUpperCase(),
			headers: new Headers()
		}

		const timer_start = performance.now();
		try {
			res = await fetch(url, requestHeaders);
			json = await res.json();
		} catch (err) {
			console.error('Request Failed: ', err);
		}
		const timer_end = performance.now();

		const responseObj = {
			body: json,
			status: res.status,
			timeElapsed: `${parseInt(timer_end - timer_start)}ms`
		};

		callback(responseObj);
	}
}

export default Request;