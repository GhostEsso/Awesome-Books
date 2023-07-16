import Book from './book.js';

export class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('bookCollection')) || [];
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    this.displayBooks();
    this.updateBookListBorder();
    this.saveBooksToLocalStorage();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.displayBooks();
    this.updateBookListBorder();
    this.saveBooksToLocalStorage();
  }

  displayBooks() {
    const bookListElement = document.getElementById('bookList');
    bookListElement.innerHTML = '';

    this.books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');

      const titleElement = document.createElement('span');
      titleElement.textContent = book.title;

      const authorElement = document.createElement('span');
      authorElement.textContent = ` by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
      });

      bookElement.appendChild(titleElement);
      bookElement.appendChild(authorElement);
      bookElement.appendChild(removeButton);
      bookListElement.appendChild(bookElement);

      bookElement.classList.add(index % 2 === 0 ? 'even-book' : 'odd-book');
    });

    this.updateBookListBorder();
  }

  updateBookListBorder() {
    const bookListElement = document.getElementById('bookList');
    bookListElement.classList.toggle('border', this.books.length > 0);
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('bookCollection', JSON.stringify(this.books));
  }
}

export default BookCollection;