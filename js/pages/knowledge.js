// js/pages/knowledge.js

document.addEventListener("DOMContentLoaded", () => {
    // Filter logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.mukhi-accordion');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const grah = btn.dataset.grah.toLowerCase();
        
        cards.forEach(card => {
          const cardGrah = (card.dataset.grah || "").toLowerCase();
          const show = (grah === 'all' || cardGrah.includes(grah));
          card.style.display = show ? 'block' : 'none';
        });
      });
    });

    // Handle hash opening cleanly on load
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      setTimeout(() => {
        toggleAcc(hash);
        document.getElementById(hash).scrollIntoView({behavior:'smooth', block: 'start'});
      }, 500);
    }

    // Back to top scroll observer
    const btt = document.getElementById('backToTop');
    if (btt) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 400) {
            btt.classList.add('visible');
          } else {
            btt.classList.remove('visible');
          }
        });
        btt.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    }
});

// Accordion toggle with industrial-strength rotation logic
window.toggleAcc = function(id) {
  const container = document.getElementById(id);
  const body = document.getElementById(id + '-body');
  const chevron = container.querySelector('.acc-chevron i');
  
  const isOpen = body.classList.toggle('open');
  
  if (chevron) {
    chevron.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
  }
  
  // Close others for exclusive expansion (Single accordion behavior)
  document.querySelectorAll('.accordion-body.open').forEach(b => {
    if (b.id !== id + '-body') {
      b.classList.remove('open');
      const otherChevron = b.previousElementSibling.querySelector('.acc-chevron i');
      if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
    }
  });
};
