/* js/pages/contact.js */

document.addEventListener("DOMContentLoaded", () => {
    // Form submission logic (Formspree)
    const form = document.getElementById('inquiryForm');
    const successMsg = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(form);
            
            // Visual feedback - loading state
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = "Bheja ja raha hai...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    form.style.display = 'none';
                    successMsg.style.display = 'block';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    alert("Kshama karein, form bhejte waqt truti hui. Kripya WhatsApp karein.");
                    btn.textContent = originalText;
                    btn.style.opacity = "1";
                    btn.disabled = false;
                }
            } catch (error) {
                alert("Network error. Kripya net check karein.");
                btn.textContent = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }
        });
    }

    // FAQ Accordion Logic
    window.toggleFaq = function(id) {
        const container = document.getElementById(id);
        const body = document.getElementById(id + '-body');
        const chevron = container.querySelector('.acc-chevron i');
        
        const isOpen = body.classList.toggle('open');
        
        // Custom animation handling for industrial feel
        if (isOpen) {
            body.style.maxHeight = body.scrollHeight + "px";
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        } else {
            body.style.maxHeight = '0';
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        }

        // Close other FAQs for clean UX
        document.querySelectorAll('.mukhi-accordion').forEach(item => {
            if (item.id !== id && item.id.startsWith('faq-')) {
                const otherBody = document.getElementById(item.id + '-body');
                if (otherBody) {
                    otherBody.classList.remove('open');
                    otherBody.style.maxHeight = '0';
                    const otherChevron = item.querySelector('.acc-chevron i');
                    if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
                }
            }
        });
    };
});
