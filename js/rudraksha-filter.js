document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const rudraCards = document.querySelectorAll('.rudra-card');

  if (!filterBtns.length || !rudraCards.length) return;

  const applyFilter = (filterValue) => {
    rudraCards.forEach(card => {
      const isMatch = filterValue === 'all' || 
                      (card.getAttribute('data-category') && 
                       card.getAttribute('data-category').includes(filterValue));
      if (isMatch) {
        if (card.classList.contains('hidden')) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
          void card.offsetWidth; // Trigger reflow
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      } else {
        card.classList.add('hidden');
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      applyFilter(filterValue);
    });
  });

  // Function to apply filter from hash
  const applyFilterFromHash = () => {
    const hash = window.location.hash.substring(1).toLowerCase(); // Remove '#'
    if (!hash) return;

    // Find the button with data-filter matching the hash
    const targetBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
    if (targetBtn) {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to target button
      targetBtn.classList.add('active');
      // Apply the filter
      applyFilter(hash);
      
      // Smooth scroll to the filter bar so user sees the filtered catalog
      const filterBar = document.getElementById('rudraFilter');
      if (filterBar) {
        filterBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Run on load with a slight delay to allow smooth scrolling and rendering
  setTimeout(applyFilterFromHash, 150);

  // Run on hash change
  window.addEventListener('hashchange', applyFilterFromHash);
});
