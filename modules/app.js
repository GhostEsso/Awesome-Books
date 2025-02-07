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
  const addForm = document.querySelector('.add-book-form');

  const createBookElement = (book) => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book-item');

    // Créer l'effet 3D du livre
    const bookCover = document.createElement('div');
    bookCover.classList.add('book-cover');

    const bookSpine = document.createElement('div');
    bookSpine.classList.add('book-spine');

    // eslint-disable-next-line no-use-before-define
    const randomColor = getRandomColor();
    bookCover.style.backgroundColor = randomColor;
    bookSpine.style.backgroundColor = randomColor;

    // Ajouter le titre et l'auteur sur la tranche du livre
    bookSpine.innerHTML = `
      <div class="spine-content">
        <div class="spine-title">${book.title}</div>
        <div class="spine-author">${book.author}</div>
      </div>
    `;

    // Ajouter le titre et l'auteur sur la couverture
    bookCover.innerHTML = `
      <div class="cover-content">
        <div class="cover-title">${book.title}</div>
        <div class="cover-author">by ${book.author}</div>
      </div>
    `;

    bookElement.appendChild(bookSpine);
    bookElement.appendChild(bookCover);
    bookElement.innerHTML += '<button class="remove-btn">Remove</button>';

    const removeBtn = bookElement.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
      const index = bookCollection.indexOf(book);
      if (index > -1) {
        bookCollection.splice(index, 1);
        // eslint-disable-next-line no-use-before-define
        updateDisplay();
      }
    });

    return bookElement;
  };

  const getRandomColor = () => {
    const colors = [
      '#2c3e50', '#e74c3c', '#3498db',
      '#9b59b6', '#f1c40f', '#1abc9c',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const updateDisplay = () => {
    bookList.innerHTML = '';
    bookCollection.forEach((book) => {
      const bookElement = createBookElement(book);
      bookList.appendChild(bookElement);
    });
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

    addSection.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Charger les livres existants
  const savedBooks = localStorage.getItem('books');
  if (savedBooks) {
    bookCollection.push(...JSON.parse(savedBooks));
    updateDisplay();
  }

  const addLink = document.querySelector('.add-link');
  const addSection = document.querySelector('.add-section');

  // Créer l'overlay
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  // Gestionnaire pour afficher le formulaire
  addLink.addEventListener('click', (e) => {
    e.preventDefault();
    addSection.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  });

  // Fermer le formulaire en cliquant sur l'overlay
  overlay.addEventListener('click', () => {
    addSection.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Réactiver le défilement
  });
};

export default setupEventListeners;
