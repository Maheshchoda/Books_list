// Book class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class: Handle UI tasks

class UI {
  static displayBooks() {
    const Books = Store.getBooks();

    Books.forEach(book => UI.addBook(book));
  }

  static addBook({ title, author, isbn }) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${author}</td>
    <td>${title}</td>
    <td>${isbn}</td>
    <td ><a href="#"><i class="fas fa-trash-alt text-danger delete"></i></a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.parentElement.remove();
    }
  }

  static showAlerts(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("form");
    container.insertBefore(div, form);

    //remove the alert message
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store class: Handle Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event: Add a Book and Display it

document.addEventListener("DOMContentLoaded", UI.displayBooks); //Display some static books

document.querySelector("#book-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlerts("Please fill the information", "danger");
  } else {
    //Instantiate the Book class
    const newBook = new Book(title, author, isbn);

    //Add the book to UI
    UI.addBook(newBook);

    //Add the book to storage
    Store.addBook(newBook);

    UI.showAlerts("Sucessfully Added New Book", "success"); //show success message

    //Clear the form fields
    UI.clearFields();
  }
});

//Event: Delete a Book

document.querySelector("#book-list").addEventListener("click", e => {
  //delete the book from UI
  UI.deleteBook(e.target);

  //remove book from storage
  Store.removeBook(
    e.target.parentElement.parentElement.previousElementSibling.textContent
  );

  //delete the book from storage
  Store.removeBook();
  UI.showAlerts("Book Deleted", "success");
});
