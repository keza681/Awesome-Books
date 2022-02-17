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
    this.books.forEach((book, index) =>
