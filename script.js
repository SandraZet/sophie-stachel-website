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

// ============================================================
// Cookie Consent Banner (DSGVO-konform)
// ============================================================
(function () {
  const GA_ID = 'G-05VLD5D8W0';
  const CONSENT_KEY = 'cookie-consent';

  function loadGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
    script.onload = function () {
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
      gtag('js', new Date());
      gtag('config', GA_ID);
    };
  }

  function hideBanner(banner) {
    banner.style.transform = 'translateY(100%)';
    setTimeout(function () { banner.remove(); }, 400);
  }

  function createBanner() {
    const style = document.createElement('style');
    style.textContent = `
      #cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        border-top: 2px solid #9CAA9B;
        box-shadow: 0 -2px 12px rgba(0,0,0,0.12);
        z-index: 9999;
        padding: 1em 4%;
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        transform: translateY(100%);
        animation: cookieSlideUp 0.4s ease forwards;
      }
      @keyframes cookieSlideUp { to { transform: translateY(0); } }
      .cookie-inner {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 1.5em;
        flex-wrap: wrap;
      }
      .cookie-inner p {
        margin: 0;
        flex: 1;
        min-width: 200px;
        color: #333;
        line-height: 1.5;
      }
      .cookie-inner a { color: #2c5f6f; text-decoration: underline; }
      .cookie-buttons { display: flex; gap: 0.8em; flex-shrink: 0; }
      .cookie-btn {
        padding: 0.6em 1.4em;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        transition: background-color 0.2s ease;
      }
      .cookie-accept { background-color: #2c5f6f; color: #fff; }
      .cookie-accept:hover { background-color: #1e4a57; }
      .cookie-decline { background-color: #f0f0f0; color: #333; }
      .cookie-decline:hover { background-color: #e0e0e0; }
    `;
    document.head.appendChild(style);

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="cookie-inner">
        <p>Diese Website verwendet Google Analytics zur anonymisierten Besuchsanalyse. Daten werden nur mit Ihrer Zustimmung übermittelt. <a href="datenschutz.html">Datenschutzerklärung</a></p>
        <div class="cookie-buttons">
          <button class="cookie-btn cookie-decline" id="cookie-decline">Ablehnen</button>
          <button class="cookie-btn cookie-accept" id="cookie-accept">Akzeptieren</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      loadGoogleAnalytics();
      hideBanner(banner);
    });
    document.getElementById('cookie-decline').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      hideBanner(banner);
    });
  }

  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted') {
    loadGoogleAnalytics();
  } else if (!stored) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createBanner);
    } else {
      createBanner();
    }
  }
})();