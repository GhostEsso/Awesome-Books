import { initializeApp } from './app.js';
import { initMobileMenu } from './mobileMenu.js';

// Initialiser le menu mobile en premier
initMobileMenu();

// Ensuite initialiser l'application
initializeApp();

const listLink = document.querySelector('.list-link');
const addLink = document.querySelector('.add-link');
const contactLink = document.querySelector('.contact-link');

const booksSection = document.querySelector('.books-section');
const addSection = document.querySelector('.add-section');
const contactSection = document.querySelector('.contact-section');

// Cacher les sections sauf la liste des livres par défaut
addSection.style.display = 'none';
contactSection.style.display = 'none';

const showSection = (section) => {
  // Cacher toutes les sections
  booksSection.style.display = 'none';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';

  // Afficher la section demandée
  section.style.display = 'block';

  // Ajouter la classe active au lien correspondant
  listLink.classList.remove('active');
  addLink.classList.remove('active');
  contactLink.classList.remove('active');

  if (section === booksSection) listLink.classList.add('active');
  if (section === addSection) addLink.classList.add('active');
  if (section === contactSection) contactLink.classList.add('active');
};

// Gestionnaires d'événements pour la navigation
listLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(booksSection);
});

addLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(addSection);
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSection(contactSection);
});

const logoLink = document.querySelector('.logo');

logoLink.addEventListener('click', () => {
  window.location.href = 'index.html';
});
