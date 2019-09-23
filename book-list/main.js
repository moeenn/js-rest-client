// book class
class Book {
	constructor( title, author, isbn ) {
		this.Title = title;
		this.Author = author;
		this.ISBN = isbn;
	}
}

// UI class ( add, update, remove elements )
class UI {
	static DisplayBooks() {
		const Books = Store.GetBooks();
		// loop through all the books
		Books.forEach( (book) => UI.AddBookToList(book) );
	}

	static AddBookToList(book) {
		const list = document.querySelector("#book-list");
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${ book.Title }</td>
			<td>${ book.Author }</td>
			<td>${ book.ISBN }</td>
			<td><a href="#" class="negative button-thin padding-vertical-1 delete">Delete</a></td>
		`;
		list.appendChild(row)
	}

	static DeleteBook( element ) {
		if ( element.classList.contains("delete") ) {
			// delete parent of the parent element containing class "delete"
			// row >> td >> a (button)
			element.parentElement.parentElement.remove();
		}
	}

	static ShowAlert( message, category ) {
		const div = document.createElement("div");
		div.className = `flash-message ${category}`;
		div.innerHTML = `
			<div class="container">
				<p>${message}</p>
			</div>
		`;
		document.body.insertBefore(div, document.body.firstChild);

		// disappear after 3-seconds
		setTimeout( () => document.querySelector(".flash-message").remove(), 3000 );
	}

	static ClearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}
}

// event: Display Books
document.addEventListener('DOMContentLoaded', UI.DisplayBooks)

// event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (event) => {
	// prevent the default form action i.e. submit
	event.preventDefault();

	// get form values
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const isbn = document.querySelector("#isbn").value;

	// validate
	if ( title === '' || author === '' || isbn === '' ) {
		UI.ShowAlert("Please fill all fields", "negative");
	} else {
		// create book object from form data
		const book = new Book( title, author, isbn );
		console.log(book);

		// add book to UI
		UI.AddBookToList(book);

		// add to the local store
		Store.AddBook(book);

		// show alert
		UI.ShowAlert( "Book Added Successfully", "positive" );

		// clear form views on submit
		UI.ClearFields();
	}
});

// event: Remove a book
document.querySelector("#book-list").addEventListener("click", (event) => {
	// get the element being clicked on inside the id book-list
	console.log(event.target);

	// remove book from UI
	UI.DeleteBook(event.target);

	// get ISBN from the relevent row
	const isbn = event.target.parentElement.previousElementSibling.textContent;

	// remove book from local store
	Store.RemoveBook( isbn );
	console.log(`Book Removed: ${isbn}`);

	// show alert
	UI.ShowAlert( "Book Removed Successfully", "alert" );
});

// store class ( store, update data storage in browser cache )
class Store {
	static GetBooks() {
		let books;

		// local storage stores data in form of strings
		if ( localStorage.getItem("books") === null ) {
			books = [];
		} else {
			books = localStorage.getItem("books");
			// convert local storage string to JS Array
			books = JSON.parse(books);
		}
		return books;
	}

	static AddBook( book ) {
		let books = Store.GetBooks();
		// append argument the list of books
		books.push(book);

		// convert books into string for storage into local storage
		books = JSON.stringify(books);

		// save to local storage
		localStorage.setItem("books", books);
	}

	static RemoveBook( isbn ) {
		let books = Store.GetBooks();

		// find and remove the book
		books.forEach( (book, index) => {
			if ( book.ISBN === isbn ) {
				books.splice(index, 1);
			}
		});

		// convert to string for local storage
		books = JSON.stringify(books);

		// save to local storage
		localStorage.setItem("books", books);
	}
}