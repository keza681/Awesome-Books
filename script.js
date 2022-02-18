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

// Final-milestone js-code

const section1 = document.querySelector('.section1');
const section2 = document.querySelector('.section2');
const section3 = document.querySelector('.section3');
const navList = document.getElementById('book-list');
const navAdd = document.getElementById('add-book');
const navContact = document.getElementById('contact');

const showBooks = () => {
  section1.classList.remove('hide');
  section2.classList.add('hide');
  section3.classList.add('hide');
  navList.classList.add('current');
  navAdd.classList.remove('current');
  navContact.classList.remove('current');
};

const showAddForm = () => {
  section2.classList.remove('hide');
  section1.classList.add('hide');
  section3.classList.add('hide');
  navList.classList.remove('current');
  navAdd.classList.add('current');
  navContact.classList.remove('current');
};
const showContactInfo = () => {
  section3.classList.remove('hide');
  section1.classList.add('hide');
  section2.classList.add('hide');
  navContact.classList.add('current');
  navAdd.classList.remove('current');
  navList.classList.remove('current');
};
navContact.addEventListener('click', showContactInfo);
navAdd.addEventListener('click', showAddForm);
navList.addEventListener('click', showBooks);

const displayTime = () => {
  document.getElementById('date-area').innerHTML = new Date().toLocaleString();
  setTimeout(displayTime, 1000);
};
displayTime();
