// Zentrale Navigation - wird automatisch auf allen Seiten geladen
class UniversalNavbar {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.createNavbar();
    this.initBurgerMenu();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '');
  }

  createNavbar() {
    const navHTML = `
      <a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>
      
      <nav role="navigation" aria-label="Hauptnavigation">
        <div class="nav-left">
          <a href="index.html" class="brand" aria-label="Zur Startseite">Sophie Stachel</a>
          <div class="nav-links" role="menubar">
            <a href="ueber-mich.html" role="menuitem" ${this.currentPage === 'ueber-mich' ? 'class="active"' : ''}>Über mich</a>
            <a href="angebote.html" role="menuitem" ${this.currentPage === 'angebote' ? 'class="active"' : ''}>Angebote</a>
            <a href="methoden.html" role="menuitem" ${this.currentPage === 'methoden' ? 'class="active"' : ''}>Methoden</a>
            <a href="kontakt.html" role="menuitem" ${this.currentPage === 'kontakt' ? 'class="active"' : ''}>Kontakt</a>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="nav-links mobile-nav" id="navLinks" role="menu" aria-label="Mobile Navigation">
          <a href="ueber-mich.html" role="menuitem" ${this.currentPage === 'ueber-mich' ? 'class="active"' : ''}>Über mich</a>
          <a href="angebote.html" role="menuitem" ${this.currentPage === 'angebote' ? 'class="active"' : ''}>Angebote</a>
          <a href="methoden.html" role="menuitem" ${this.currentPage === 'methoden' ? 'class="active"' : ''}>Methoden</a>
          <a href="kontakt.html" role="menuitem" ${this.currentPage === 'kontakt' ? 'class="active"' : ''}>Kontakt</a>
        </div>

        <button class="burger" id="burger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="navLinks">
          <span aria-hidden="true">&#9776;</span>
        </button>
      </nav>
    `;

    // Navigation am Anfang vom Body einfügen
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  initBurgerMenu() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    burger.addEventListener('click', () => {
      const isExpanded = navLinks.classList.contains('show');
      navLinks.classList.toggle('show');
      document.body.classList.toggle('menu-open');
      
      burger.setAttribute('aria-expanded', !isExpanded);
      burger.setAttribute('aria-label', !isExpanded ? 'Menü schließen' : 'Menü öffnen');
    });

    // Keyboard navigation
    burger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        burger.click();
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        navLinks.classList.remove('show');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', false);
        burger.setAttribute('aria-label', 'Menü öffnen');
      }
    });

    // Click outside to close
    document.body.addEventListener('click', (e) => {
      if (document.body.classList.contains('menu-open') && 
          !navLinks.contains(e.target) && 
          !burger.contains(e.target)) {
        navLinks.classList.remove('show');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', false);
        burger.setAttribute('aria-label', 'Menü öffnen');
      }
    });
  }
}

// Navigation automatisch laden sobald die Seite bereit ist
document.addEventListener('DOMContentLoaded', () => {
  new UniversalNavbar();
});