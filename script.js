// Scroll Animations - Intersection Observer
const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Beobachte alle animierten Elemente
const sections = document.querySelectorAll('section');
const fadeElements = document.querySelectorAll('.fade-in');

sections.forEach(section => observer.observe(section));
fadeElements.forEach(element => observer.observe(element));

// Burger-Menu wird jetzt von navbar.js Component verwaltet

// Swipe Navigation zwischen Seiten
class SwipeNavigation {
  constructor() {
    this.pages = [
      'index.html',
      'ueber-mich.html', 
      'methoden.html',
      'angebote.html',
      'kontakt.html'
    ];
    
    this.currentPage = this.getCurrentPageIndex();
    this.initSwipeEvents();
  }
  
  getCurrentPageIndex() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    return this.pages.indexOf(currentFile);
  }
  
  initSwipeEvents() {
    let startX = null;
    let startY = null;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
      if (!startX || !startY) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Nur horizontale Swipes berücksichtigen
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left - nächste Seite
          this.navigateToNext();
        } else {
          // Swipe right - vorherige Seite
          this.navigateToPrev();
        }
      }
      
      startX = null;
      startY = null;
    });
  }
  
  navigateToNext() {
    if (this.currentPage < this.pages.length - 1) {
      window.location.href = this.pages[this.currentPage + 1];
    }
  }
  
  navigateToPrev() {
    if (this.currentPage > 0) {
      window.location.href = this.pages[this.currentPage - 1];
    }
  }
}

// Swipe Navigation initialisieren
new SwipeNavigation();