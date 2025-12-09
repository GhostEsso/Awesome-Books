import { DateTime } from './luxon.js';

class BookApp {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('awesome-books')) || [];
    this.booksContainer = document.getElementById('books-container');
    this.form = document.getElementById('add-book-form');
    this.emptyState = document.getElementById('empty-state');
    this.listNavItem = document.querySelector('[data-target="list"]');

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupTime();
    this.setupForm();
    this.renderBooks();
    this.setupMobileMenu();
  }

  setupTime() {
    const timeDisplay = document.getElementById('current-time');
    const updateTime = () => {
      const now = DateTime.now();
      timeDisplay.textContent = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update Nav State
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Show Section
        const targetId = link.getAttribute('data-target');
        sections.forEach(section => {
          section.classList.remove('active');
          if (section.id === `${targetId}-section`) {
            section.classList.add('active');
          }
        });

        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle i');
        navMenu.classList.remove('active');
        menuToggle.classList.add('fa-bars');
        menuToggle.classList.remove('fa-times');
      });
    });
  }

  setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const icon = toggle.querySelector('i');

    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  setupForm() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('title');
      const authorInput = document.getElementById('author');

      if (titleInput.value && authorInput.value) {
        this.addBook(titleInput.value, authorInput.value);
        this.form.reset();
        this.navigateToLibrary();
      }
    });
  }

  addBook(title, author) {
    const book = {
      id: Date.now().toString(),
      title,
      author,
      createdAt: DateTime.now().toISO()
    };

    this.books.push(book);
    this.saveBooks();
    this.renderBooks();
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
    this.saveBooks();
    this.renderBooks();
  }

  saveBooks() {
    localStorage.setItem('awesome-books', JSON.stringify(this.books));
  }

  renderBooks() {
    this.booksContainer.innerHTML = '';

    if (this.books.length === 0) {
      this.emptyState.classList.remove('hidden');
      return;
    }

    this.emptyState.classList.add('hidden');

    this.books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <span class="author">by ${book.author}</span>
                </div>
                <button class="delete-btn" data-id="${book.id}">
                    <i class="fas fa-trash-alt"></i> Remove
                </button>
            `;

      // Allow animation
      setTimeout(() => card.style.opacity = '1', 10);

      const deleteBtn = card.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => this.removeBook(book.id));

      this.booksContainer.appendChild(card);
    });
  }

  navigateToLibrary() {
    const listLink = document.querySelector('[data-target="list"]');
    listLink.click();
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new BookApp();
});
