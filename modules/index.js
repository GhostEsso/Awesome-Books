//index.js is the point of entry of my application
//The import of app.js module which will be responsable of the initialization of our app
import { initializeApp } from './app.js';

initializeApp();

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
  
  // Écouteurs d'événements pour les liens de la barre de navigation
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
