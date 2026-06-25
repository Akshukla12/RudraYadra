// nav.js
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const nav       = document.getElementById('siteNav');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

// Solid bg on scroll (nav starts transparent on hero pages)
window.addEventListener('scroll', () => {
  // If nav didn't have 'scrolled' initially, or if it explicitly needs toggle logic
  // We check if it's the home page (no 'scrolled' by default)
  if (!nav.dataset.permanentFixed) {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
});

// Timeline Scroll Animation Trigger
document.addEventListener('DOMContentLoaded', () => {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const timeline = document.querySelector('.timeline-container');
  if (timeline) {
    timelineObserver.observe(timeline);
  }
});

