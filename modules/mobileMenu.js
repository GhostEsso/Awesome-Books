export const initMobileMenu = () => {
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.querySelector('.nav-links');

  if (!menuIcon || !navLinks) {
    console.error('Menu elements not found');
    return;
  }

  // Fonction pour basculer le menu
  const toggleMenu = () => {
    console.log('Toggle menu clicked'); // Pour le débogage
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
  };

  // Ajouter l'écouteur d'événement avec capture
  menuIcon.addEventListener('click', toggleMenu, true);

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuIcon.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Fermer le menu quand on clique en dehors
  document.addEventListener('click', (e) => {
    const isMenuOpen = navLinks.classList.contains('active');
    const clickedOutside = !menuIcon.contains(e.target) && !navLinks.contains(e.target);
    
    if (isMenuOpen && clickedOutside) {
      menuIcon.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}; 