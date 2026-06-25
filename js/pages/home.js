// js/pages/home.js

document.addEventListener("DOMContentLoaded", () => {
    // Phase 1: Smooth scroll to Consultation Section
    const scrollToConsultBtn = document.getElementById("scrollToConsult");
    
    if (scrollToConsultBtn) {
        scrollToConsultBtn.addEventListener("click", () => {
            const consultSection = document.getElementById("consultation-cta");
            if (consultSection) {
                // Calculate position considering the sticky nav height (approx 90px)
                const y = consultSection.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        });
    }

    // Phase 1: Ensure hero triggers initial fade-in smoothly
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-bilingual-subtitle');
    const heroDesc = document.querySelector('.hero-desc');
    const heroBtns = document.querySelector('.hero-buttons');

    // Add subtle staggered delays for a premium feel
    if(heroTitle) heroTitle.style.animationDelay = '100ms';
    if(heroSubtitle) heroSubtitle.style.animationDelay = '300ms';
    if(heroDesc) heroDesc.style.animationDelay = '400ms';
    if(heroBtns) heroBtns.style.animationDelay = '500ms';
});
