// custom objects
class User {
	constructor(id, name, email) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
}

class Post {
	constructor(title, body) {
		this.title = title;
		this.body = body;
	}
}

// manage the Document content
class UI {
	static CreateCard() {
		const card = document.createElement('div');
		card.className = 'padding-5 shadow-normal rounded-corners card';
		return card;
	}

	static WriteTextToDoc(string) {
		// p > card > responseArea > body
		const responseArea = document.querySelector('#output');
		const p = document.createElement('p');
		p.innerHTML = string;

		const card = UI.CreateCard();
		card.appendChild(p)
		responseArea.insertBefore(card, responseArea.firstChild);
		console.log('Text written to Document');
	}

	static WriteUserToDoc(user) {
		const responseArea = document.querySelector('#output');
		const card = UI.CreateCard();
		card.innerHTML = `
			<p><em>ID: </em>${user.id}</p>
			<p><em>Name: </em>${user.name}</p>
			<p><em>Email: </em>${user.email}</p>`;

		// responseArea.appendChild(card);
		responseArea.insertBefore(card, responseArea.firstChild);
		console.log('User written to Document');
	}

	static WritePostToDoc(post) {
		const responseArea = document.querySelector('#output');
		const card = UI.CreateCard();
		card.innerHTML = `
			<h4 class="text-color-primary">${post.title}</h4>
			<p class="text-justify">${post.body}</p>`;

		// responseArea.appendChild(card);
		responseArea.insertBefore(card, responseArea.firstChild);
		console.log('Post written to Document');
	}

	static TogglePostForm() {
		const postFormArea = document.querySelector('#PostFormArea');

		// toggle visibility
		postFormArea.style.display = PostFormArea.style.display == "none" ? "block" : "none";
		console.log('Post Form visibility toggled');
	}

	static ClearPostForm() {
		document.querySelector('#PostTitle').value = "";
		document.querySelector('#PostBody').value = "";
	}
}

// event: load text from file
document.querySelector('#getText').addEventListener('click', getText);

function getText() {
	// fetch returns a promise. we use the then() method to perform actions on them
	fetch('sample.txt')
		.then((response) => response.text())
		.then((data) => UI.WriteTextToDoc(data));
}

// event: Users from JSON File
document.querySelector('#getUsers').addEventListener('click', getUsers);

function getUsers() {
	fetch('users.json')
	.then((response) => response.json())
	.then((usersJSON) => {
		for(let userJSON of usersJSON) {
			const user = new User(userJSON.id, userJSON.name, userJSON.email);
			UI.WriteUserToDoc(user);
		}
	})
}

// event: Posts from JSON Placeholder public API
document.querySelector('#getPosts').addEventListener('click', getPosts);

function getPosts() {
	fetch('https://jsonplaceholder.typicode.com/posts')
	.then((response) => response.json())
	.then((postsJSON) => {
		for( let postJSON of postsJSON) {
			const post = new Post(postJSON.title, postJSON.body);
			UI.WritePostToDoc(post);
		}
	});
}

// event: Show Create Post Form
document.querySelector('#createPost').addEventListener('click', UI.TogglePostForm);
document.querySelector('#PostForm').addEventListener('submit', addUserPost );

function addUserPost(event) {
	event.preventDefault();
	const title = document.querySelector('#PostTitle').value;
	const body = document.querySelector('#PostBody').value;

	const post = new Post(title, body);
	UI.WritePostToDoc(post);
	UI.ClearPostForm();
}