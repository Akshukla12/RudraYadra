/**
 * Rudra Yatra Core JavaScript
 */

// Data Arrays
const products = [
  {
    id: 1,
    name: "5 Mukhi Rudraksha",
    origin: "Arun Valley Nepal",
    benefits: "Peace, stability, and control over blood pressure",
    whoShouldWear: "Anyone seeking general well-being and meditation support",
    image: "https://images.unsplash.com/photo-1590284428414-04beaf5cc0ed?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "7 Mukhi Rudraksha",
    origin: "Arun Valley Nepal",
    benefits: "Wealth, overcoming financial hurdles, and neutralizing Saturn effects",
    whoShouldWear: "Businessmen, professionals seeking financial growth",
    image: "https://images.unsplash.com/photo-1542152012-70b135bb15af?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Gauri Shankar Rudraksha",
    origin: "Arun Valley Nepal",
    benefits: "Harmony in relationships, spiritual elevation",
    whoShouldWear: "Couples, or those seeking family peace",
    image: "https://images.unsplash.com/photo-1590284428414-04beaf5cc0ed?q=80&w=600&auto=format&fit=crop"
  }
];

const knowledgeData = [
  {
    id: "what-is",
    title: "What is Rudraksha?",
    hiTitle: "रुद्राक्ष क्या है?",
    summary: "The tear of Lord Shiva, a divine seed of spirituality.",
    content: "Rudraksha is a seed traditionally used across Asia as prayer beads. In Hinduism, it is believed to be the tears of Lord Shiva, manifesting compassion for humanity. It possesses unique vibrations and electromagnetic properties."
  },
  {
    id: "benefits",
    title: "Key Benefits",
    hiTitle: "मुख्य लाभ",
    summary: "Healing, protection, and spiritual awakening.",
    content: "Authentic Nepali beads provide holistic healing, stress reduction, and deep meditation states. They create a cocoon of your own energy protecting you from negative external forces."
  },
  {
    id: "selection",
    title: "Selection Guide",
    hiTitle: "चयन मार्गदर्शिका",
    summary: "How to find the right bead for your life.",
    content: "Always look for well-defined Mukhis (faces). The bead should feel heavy and dense. For specific issues, consult our WhatsApp guidance before selecting."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
      }
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Render Products
  const productsContainer = document.getElementById('products-container');
  if (productsContainer) {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card animate-up';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-info">
          <div class="product-origin"><i data-lucide="map-pin" width="14" height="14"></i> ${product.origin}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-meta">
            <strong>Benefits:</strong> ${product.benefits}
          </div>
          <div class="product-meta">
            <strong>Who should wear:</strong> ${product.whoShouldWear}
          </div>
          <div class="product-actions">
            <button class="btn btn-whatsapp" onclick="window.open(createWhatsAppLink('YOUR_NUMBER', 'Om Namah Shivaya! I want details about ${product.name}'), '_blank')">
              Inquiry <i data-lucide="message-circle" width="16" height="16"></i>
            </button>
          </div>
        </div>
      `;
      productsContainer.appendChild(card);
    });
  }

  // Render Knowledge Cards
  const knowledgeContainer = document.getElementById('knowledge-container');
  if (knowledgeContainer) {
    knowledgeData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'knowledge-card animate-up';
      card.onclick = () => openKnowledgeModal(item);
      card.innerHTML = `
        <h3 class="knowledge-title" style="font-size: 1.5rem; margin-bottom: 0.5rem;">${item.title}</h3>
        <div class="hindi-text" style="font-size: 1.3rem;">${item.hiTitle}</div>
        <p style="color: var(--color-text-muted); font-size: 1.1rem; line-height: 1.6;">${item.summary}</p>
        <div class="knowledge-readmore" style="font-size: 1rem;">Read More <i data-lucide="arrow-right" width="18" height="18"></i></div>
      `;
      knowledgeContainer.appendChild(card);
    });
  }

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const problem = document.getElementById('problem').value;
      const msg = document.getElementById('message').value;

      if (!name || !problem || !msg) {
        alert("Please fill all fields.");
        return;
      }

      // Success
      contactForm.innerHTML = `
        <div class="success-msg text-center">
          <i data-lucide="check-circle" width="64" height="64" style="color: var(--color-bhagwa-orange); margin-bottom: 1.5rem;"></i>
          <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">Message Submitted</h3>
          <p style="font-size: 1.2rem;">Redirecting to WhatsApp for real-time guidance...</p>
        </div>
      `;
      lucide.createIcons();
      
      const whatsappMsg = `Name: ${name}\nProblem: ${problem}\nMessage: ${msg}`;
      setTimeout(() => {
        window.open(createWhatsAppLink('YOUR_NUMBER', whatsappMsg), '_blank');
      }, 2000);
    });
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

function createWhatsAppLink(number, message) {
  const num = number.replace(/[^0-9]/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

// Modal Logic
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openKnowledgeModal(item) {
  const modalTitle = document.getElementById('k-modal-title');
  const modalBody = document.getElementById('k-modal-body');
  
  if (modalTitle && modalBody) {
    modalTitle.innerHTML = item.title;
    modalBody.innerHTML = `
      <div class="hindi-text" style="font-size: 1.4rem; margin-bottom: 2rem; display: block; width: 100%; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">${item.hiTitle}</div>
      <p style="color: var(--color-text-main); font-size: 1.2rem; line-height: 1.8;">${item.content}</p>
    `;
    openModal('knowledgeModal');
  }
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
