import { initializeApp } from './app.js';

initializeApp();

const booksLink = document.getElementById('booksLink');
const addBookLink = document.getElementById('addBookLink');
const contactLink = document.getElementById('contactLink');
const bookListSection = document.getElementById('bookListSection');
const addBookSection = document.getElementById('addBookSection');
const contactSection = document.getElementById('contactSection');

function activateLink(link) {
  booksLink.classList.remove('active');
  addBookLink.classList.remove('active');
  contactLink.classList.remove('active');

  link.classList.add('active');
}

function showSection(section) {
  bookListSection.style.display = 'none';
  addBookSection.style.display = 'none';
  contactSection.style.display = 'none';

  section.style.display = 'block';
}

booksLink.addEventListener('click', () => {
  activateLink(booksLink);
  showSection(bookListSection);
});

addBookLink.addEventListener('click', () => {
  activateLink(addBookLink);
  showSection(addBookSection);
});

contactLink.addEventListener('click', () => {
  activateLink(contactLink);
  showSection(contactSection);
});

const logoLink = document.querySelector('.logo');

logoLink.addEventListener('click', () => {
  window.location.href = 'index.html';
});
