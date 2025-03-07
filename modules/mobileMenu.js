export default function initMobileMenu() {
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.querySelector('.nav-links');
  const { body } = document;

  if (!menuIcon || !navLinks) {
    console.error('Menu elements not found');
    return;
  }

  // Fonction pour basculer le menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  };

  // Ajouter l'écouteur d'événement au menu
  menuIcon.addEventListener('click', toggleMenu);

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('active');
      navLinks.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Fermer le menu quand on clique en dehors
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active')
        && !menuIcon.contains(e.target)
        && !navLinks.contains(e.target)) {
      menuIcon.classList.remove('active');
      navLinks.classList.remove('active');
      body.style.overflow = '';
    }
  });
}