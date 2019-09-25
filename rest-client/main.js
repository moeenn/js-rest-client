// request object
class Request {
	constructor( url, method ) {
		this.url = url;
		this.method = method;
		this.header = "Content-Type: application/json";
		this.body = "";
	}
}