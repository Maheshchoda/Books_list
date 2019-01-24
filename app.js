// Book class: Represents a Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// UI class: Handle UI tasks

class UI {
  static displayBooks() {
    const storedBooks = [
      {
        author: "John Resig",
        title: "Secrets of the Javascript Ninja"
      },
      {
        author: "Douglas Crockford",
        title: "JavaScript: The Good Parts"
      }
    ];

    const Books = [...storedBooks];

    Books.forEach(book => UI.addBook(book));
  }

  static addBook({ title, author }) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>1</td>
    <td>${author}</td>
    <td>${title}</td>
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
  }
}

// Store class: Handle Storage

//Event: Add a Book and Display it

document.addEventListener("DOMContentLoaded", UI.displayBooks); //Display some static books

document.querySelector("#book-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;

  if (title === "" || author === "") {
    UI.showAlerts("Please enter the title and author", "danger");
  } else {
    //Instantiate the Book class
    const newBook = new Book(title, author);

    //Add the book to UI
    UI.addBook(newBook);
    UI.showAlerts("Sucessfully Added New Book", "success"); //show success message

    //Clear the form fields
    UI.clearFields();
  }
});

//Event: Delete a Book

document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);
  UI.showAlerts("Book Deleted", "success");
});
