// app.js
import { DateTime } from './node_modules/luxon/build/global/luxon.min.js';


import { BookCollection } from './bookCollection.js';

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

const updateCurrentDate = () => {
  const currentDateElement = document.getElementById('current_date');
  const currentDateTime = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  currentDateElement.textContent = currentDateTime;
}

setInterval(updateCurrentDate, 1000);

updateCurrentDate();

