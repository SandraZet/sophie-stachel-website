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

// Burger-Menu hinzufügen
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
console.log(burger, navLinks);

burger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  document.body.classList.toggle('menu-open');
});

// Overlay-Bereich verdunkeln aber klickbar machen
document.body.addEventListener('click', (e) => {
  if (document.body.classList.contains('menu-open') && 
      !navLinks.contains(e.target) && 
      !burger.contains(e.target)) {
    navLinks.classList.remove('show');
    document.body.classList.remove('menu-open');
  }
});