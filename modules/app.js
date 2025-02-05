import { DateTime } from './luxon.js';


const getTime = () => {
  const dt = DateTime.now();
  return dt.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
};

const time = document.getElementById('current_date');
setInterval(() => {
  time.innerHTML = getTime();
}, 1000);

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

export const initializeApp = () => {
  const bookCollection = [];
  const bookList = document.querySelector('.books-container');
  const lastBookPreview = document.createElement('div');
  const addForm = document.querySelector('.add-book-form');

  // Style pour la prévisualisation du dernier livre
  lastBookPreview.classList.add('books-preview');
  addForm.insertAdjacentElement('beforebegin', lastBookPreview);

  const createBookElement = (book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-item');
    bookElement.innerHTML = `
      <div class="book-info">
        <span class="book-title">"${book.title}"</span>
        <span>by</span>
        <span class="book-author">${book.author}</span>
      </div>
      <button class="remove-btn">Remove</button>
    `;

    const removeBtn = bookElement.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      const index = bookCollection.indexOf(book);
      if (index > -1) {
        bookCollection.splice(index, 1);
        updateDisplay();
      }
    });

    return bookElement;
  };

  const updateDisplay = () => {
    // Mettre à jour la liste principale
    bookList.innerHTML = '';
    bookCollection.forEach(book => {
      const bookElement = createBookElement(book);
      bookList.appendChild(bookElement);
    });

    // Mettre à jour la prévisualisation (uniquement le dernier livre)
    lastBookPreview.innerHTML = '';
    if (bookCollection.length > 0) {
      const lastBook = bookCollection[bookCollection.length - 1];
      const previewElement = createBookElement(lastBook);
      lastBookPreview.appendChild(previewElement);
    }

    localStorage.setItem('books', JSON.stringify(bookCollection));
  };

  // Gestionnaire de soumission du formulaire
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    const newBook = {
      title: titleInput.value,
      author: authorInput.value,
    };

    bookCollection.push(newBook);
    updateDisplay();

    titleInput.value = '';
    authorInput.value = '';
  });

  // Charger les livres existants
  const savedBooks = localStorage.getItem('books');
  if (savedBooks) {
    bookCollection.push(...JSON.parse(savedBooks));
    updateDisplay();
  }
};

export default setupEventListeners;
