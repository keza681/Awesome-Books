/* eslint-disable linebreak-style */
const form = document.getElementById('wrapper');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const generateBooks = document.getElementById('books');

const books = JSON.parse(localStorage.getItem('booksDetails')) || [];

const addNewBook = (title, author, id) => {
  const availableBooks = books;
  availableBooks.push({
    title,
    author,
    id,
  });
  localStorage.setItem('booksDetails', JSON.stringify(availableBooks));
  return { title, author, id };
};

const deleteBook = (id) => {
  const mybooks = JSON.parse(localStorage.getItem('booksDetails'));
  const filteredBooks = mybooks.filter((book) => book.id !== id);
  localStorage.setItem('booksDetails', JSON.stringify(filteredBooks));
};

const createBook = ({ title, author, id }) => {
  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  const h4 = document.createElement('h4');
  const removeBtn = document.createElement('button');
  const line = document.createElement('span');

  div.className = 'book-div';
  h3.innerText = `Title : ${title}`;
  h4.innerText = `Author :${author}`;
  removeBtn.innerHTML = 'remove';
  removeBtn.dataset.id = id;
  removeBtn.type = 'button';
  removeBtn.className = 'removeBtn';
  removeBtn.addEventListener('click', () => {
    deleteBook(id);
    generateBooks.removeChild(div);
  });
  line.classList = 'separator';

  div.append(h3, h4, removeBtn, line);
  generateBooks.appendChild(div);
};

books.forEach(createBook);

form.onsubmit = (e) => {
  e.preventDefault();
  let id = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  const newBook = addNewBook(bookTitle.value, bookAuthor.value, id);
  createBook(newBook);
  bookTitle.value = '';
  bookAuthor.value = '';
  id = '';
};

document.querySelectorAll('.removeBtn').forEach((reBtn) => {
  reBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteBook(reBtn.dataset.id);
  });
});
