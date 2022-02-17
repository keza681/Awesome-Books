/* eslint-disable linebreak-style */
const bookList = document.querySelector('.books-wrapper');
const niceTitle = document.getElementById('title');
const theAuthor = document.getElementById('author');
const addButton = document.querySelector('.add-btn');

class Library {
  constructor() {
    this.books = [
      {
        title: '',
        author: '',
      },
    ];
  }

  addBook(title, author) {
    this.books.push({
      title,
      author,
    });

    theAuthor.value = '';
    niceTitle.value = '';
    this.setLocalStorage();
    this.showBooks();
  }

  setLocalStorage() {
    localStorage.setItem('datastore', JSON.stringify(this.books));
  }

  getLocalStorage() {
    if (localStorage.getItem('datastore')) {
      this.books = JSON.parse(localStorage.getItem('datastore'));
    }
    this.showBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.setLocalStorage();
    this.showBooks();
  }

  showBooks() {
    bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      const description = document.createElement('p');

      const removeButton = document.createElement('button');
      description.textContent = `"${book.title}" by ${book.author}`;
      removeButton.textContent = 'remove';
      removeButton.classList.add('remove');

      li.append(description, removeButton);
      li.classList.add('display');
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });
      bookList.appendChild(li);
    });
  }
}

const myLibrary = new Library();
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  myLibrary.addBook(niceTitle.value, theAuthor.value);
});

document.addEventListener('DOMContentLoaded', () => {
  myLibrary.getLocalStorage();
});
