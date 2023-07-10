import { DateTime } from './luxon.js';

import { BookCollection } from './bookCollection.js';

const getTime = () => {
  const dt = DateTime.now();
  return dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
};

const time = document.getElementById('current_date');
setInterval(() => {
  time.innerHTML = getTime();
}, 1000);

export const initializeApp = () => {
  const bookCollection = new BookCollection();
  bookCollection.displayBooks();
  setupEventListeners(bookCollection);
};

const setupEventListeners = (bookCollection) => {
  const addBookForm = document.getElementById('addBookForm');
  const bookListElement = document.getElementById('bookList');

  addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const title = titleInput.value;
    const author = authorInput.value;
    bookCollection.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  });

  bookListElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeButton')) {
      const bookElement = event.target.closest('.book');
      const index = Array.from(bookListElement.children).indexOf(bookElement);
      bookCollection.removeBook(index);
    }
  });
};
