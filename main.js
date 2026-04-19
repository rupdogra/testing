// ============================================
// SR PORTFOLIO - MAIN JAVASCRIPT
// Exact functionality matching Manus version
// ============================================

// ============================================
// HERO CAROUSEL
// ============================================

const heroImages = [
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663073856323/KrCcLkjFfHXs5Fs8XRAP9v/headshot-1-HgJmuuVNAD2cdHYpZAWrU8.webp',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=320&h=320&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=320&h=320&fit=crop'
];

let currentHeadshotIndex = 0;
let heroCarouselInterval = null;

function initHeroCarousel() {
  const heroImageInner = document.querySelector('.hero-image-inner img');
  const carouselDots = document.querySelectorAll('.carousel-dots button');

  if (!heroImageInner) return;

  // Set initial image
  heroImageInner.src = heroImages[0];

  // Start auto-rotation
  startHeroCarousel();

  // Dot click handlers
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentHeadshotIndex = index;
      updateHeroImage();
      resetHeroCarousel();
    });
  });

  // Pause on hover
  const heroImageWrapper = document.querySelector('.hero-image-wrapper');
  if (heroImageWrapper) {
    heroImageWrapper.addEventListener('mouseenter', () => {
      if (heroCarouselInterval) clearInterval(heroCarouselInterval);
    });
    heroImageWrapper.addEventListener('mouseleave', () => {
      startHeroCarousel();
    });
  }
}

function startHeroCarousel() {
  heroCarouselInterval = setInterval(() => {
    currentHeadshotIndex = (currentHeadshotIndex + 1) % heroImages.length;
    updateHeroImage();
  }, 4000);
}

function updateHeroImage() {
  const heroImageInner = document.querySelector('.hero-image-inner img');
  const carouselDots = document.querySelectorAll('.carousel-dots button');

  if (heroImageInner) {
    heroImageInner.style.opacity = '0';
    setTimeout(() => {
      heroImageInner.src = heroImages[currentHeadshotIndex];
      heroImageInner.style.opacity = '1';
    }, 350);
  }

  carouselDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentHeadshotIndex);
  });
}

function resetHeroCarousel() {
  if (heroCarouselInterval) clearInterval(heroCarouselInterval);
  startHeroCarousel();
}

// ============================================
// PUBLICATIONS CAROUSEL
// ============================================

const publications = [
  {
    id: 1,
    title: 'The Future of Behavioral UX in Enterprise Software',
    publication: 'UX Magazine',
    date: 'March 2024',
    url: 'https://uxmag.com',
    excerpt: 'How behavioral psychology shapes modern product design',
  },
  {
    id: 2,
    title: 'Reducing Technostress Through Thoughtful Design',
    publication: 'Design Observer',
    date: 'February 2024',
    url: 'https://designobserver.com',
    excerpt: 'Practical strategies for designing systems that reduce cognitive load',
  },
  {
    id: 3,
    title: 'Communication Under Pressure: A Framework',
    publication: 'Harvard Business Review',
    date: 'January 2024',
    url: 'https://hbr.org',
    excerpt: 'How to maintain clarity and confidence in high-stakes situations',
  },
  {
    id: 4,
    title: 'Workflow Design for AI-Powered Systems',
    publication: 'Interaction Design Foundation',
    date: 'December 2023',
    url: 'https://interaction-design.org',
    excerpt: 'Designing intuitive workflows for complex AI systems',
  },
  {
    id: 5,
    title: 'The Psychology of Product Onboarding',
    publication: 'Product School',
    date: 'November 2023',
    url: 'https://productschool.com',
    excerpt: 'Using behavioral insights to improve user adoption',
  },
];

let publicationsIsPlaying = true;
let publicationsCurrentIndex = 0;
let publicationsInterval = null;

function initPublicationsCarousel() {
  const playButton = document.querySelector('.publications-controls button');
  const indicators = document.querySelectorAll('.publications-indicator');


  // Play/pause button
  if (playButton) {
    playButton.addEventListener('click', () => {
      publicationsIsPlaying = !publicationsIsPlaying;
      if (publicationsIsPlaying) {
        startPublicationsCarousel();
        playButton.innerHTML = '⏸';
      } else {
        if (publicationsInterval) clearInterval(publicationsInterval);
        playButton.innerHTML = '▶';
      }
    });
  }

  // Hover pause/play
  scrollContainer.addEventListener('mouseenter', () => {
    if (publicationsInterval) clearInterval(publicationsInterval);
  });

  scrollContainer.addEventListener('mouseleave', () => {
    if (publicationsIsPlaying) {
      startPublicationsCarousel();
    }
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      publicationsCurrentIndex = index;
      updatePublicationsScroll();
      resetPublicationsCarousel();
    });
  });
}

function startPublicationsCarousel() {
  publicationsInterval = setInterval(() => {
    publicationsCurrentIndex = (publicationsCurrentIndex + 1) % publications.length;
    updatePublicationsScroll();
  }, 5000);
}

function updatePublicationsScroll() {
  const scrollContainer = document.querySelector('.publications-scroll');
  const indicators = document.querySelectorAll('.publications-indicator');

  if (scrollContainer) {
    const cards = scrollContainer.querySelectorAll('.publication-card');
    if (cards[publicationsCurrentIndex]) {
      cards[publicationsCurrentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === publicationsCurrentIndex);
  });
}

function resetPublicationsCarousel() {
  if (publicationsInterval) clearInterval(publicationsInterval);
  if (publicationsIsPlaying) {
    startPublicationsCarousel();
  }
}

// ============================================
// ABOUT PAGE CAROUSELS
// ============================================

const portfolioItems = [
  { image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop' },
  { image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop' },
];

const publicationItems = [
  { image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=300&h=300&fit=crop' },
  { image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=300&fit=crop' },
];

let portfolioIndex = 0;
let publicationIndex = 0;
let portfolioInterval = null;
let publicationInterval = null;

function initAboutCarousels() {
  const portfolioCarousel = document.getElementById('portfolioCarousel');
  const publicationCarousel = document.getElementById('publicationCarousel');

  if (portfolioCarousel) {
    portfolioCarousel.src = portfolioItems[0].image;
    portfolioCarousel.parentElement.addEventListener('mouseenter', () => {
      if (portfolioInterval) clearInterval(portfolioInterval);
    });
    portfolioCarousel.parentElement.addEventListener('mouseleave', () => {
      startPortfolioCarousel();
    });

    const portfolioDots = document.querySelectorAll('.portfolio-nav button');
    portfolioDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        portfolioIndex = index;
        updatePortfolioCarousel();
        resetPortfolioCarousel();
      });
    });

    startPortfolioCarousel();
  }

  if (publicationCarousel) {
    publicationCarousel.src = publicationItems[0].image;
    publicationCarousel.parentElement.addEventListener('mouseenter', () => {
      if (publicationInterval) clearInterval(publicationInterval);
    });
    publicationCarousel.parentElement.addEventListener('mouseleave', () => {
      startPublicationCarousel();
    });

    const publicationDots = document.querySelectorAll('.publication-nav button');
    publicationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        publicationIndex = index;
        updatePublicationCarousel();
        resetPublicationCarousel();
      });
    });

    startPublicationCarousel();
  }
}

function startPortfolioCarousel() {
  portfolioInterval = setInterval(() => {
    portfolioIndex = (portfolioIndex + 1) % portfolioItems.length;
    updatePortfolioCarousel();
  }, 4000);
}

function updatePortfolioCarousel() {
  const carousel = document.getElementById('portfolioCarousel');
  const dots = document.querySelectorAll('.portfolio-nav button');

  if (carousel) {
    carousel.style.opacity = '0';
    setTimeout(() => {
      carousel.src = portfolioItems[portfolioIndex].image;
      carousel.style.opacity = '1';
    }, 300);
  }

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === portfolioIndex);
  });
}

function resetPortfolioCarousel() {
  if (portfolioInterval) clearInterval(portfolioInterval);
  startPortfolioCarousel();
}

function startPublicationCarousel() {
  publicationInterval = setInterval(() => {
    publicationIndex = (publicationIndex + 1) % publicationItems.length;
    updatePublicationCarousel();
  }, 4000);
}

function updatePublicationCarousel() {
  const carousel = document.getElementById('publicationCarousel');
  const dots = document.querySelectorAll('.publication-nav button');

  if (carousel) {
    carousel.style.opacity = '0';
    setTimeout(() => {
      carousel.src = publicationItems[publicationIndex].image;
      carousel.style.opacity = '1';
    }, 300);
  }

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === publicationIndex);
  });
}

function resetPublicationCarousel() {
  if (publicationInterval) clearInterval(publicationInterval);
  startPublicationCarousel();
}

// ============================================
// SHOP PAGE FILTERING
// ============================================

function filterProducts(category) {
  const cards = document.querySelectorAll('.product-card');
  const tabs = document.querySelectorAll('.category-tab');

  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.category === category);
  });

  cards.forEach(card => {
    const cardCategory = card.dataset.category;
    if (category === 'all' || cardCategory === category) {
      card.style.display = '';
      setTimeout(() => {
        card.style.opacity = '1';
      }, 10);
    } else {
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// ============================================
// SHOP TO CONTACT FORM AUTO-FILL
// ============================================

function goToContactWithProduct(productName) {
  const params = new URLSearchParams();
  params.set('product', productName);
  window.location.href = `index.html#contact?${params.toString()}`;
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Get URL parameters
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  const product = params.get('product');

  if (product) {
    const messageField = form.querySelector('textarea[name="message"]');
    if (messageField) {
      messageField.value = `I'm interested in: ${product}`;
    }
  }

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      fullName: form.querySelector('input[name="fullName"]').value,
      email: form.querySelector('input[name="email"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      message: form.querySelector('textarea[name="message"]').value,
    };

    console.log('Form submitted:', formData);

    // Show success message
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '✓ Message sent!';
    submitButton.style.background = '#d4714d';

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ============================================
// NEWSLETTER POPUP
// ============================================

function initNewsletterPopup() {
  const hasSeenNewsletter = localStorage.getItem('newsletterSeen');

  if (!hasSeenNewsletter) {
    setTimeout(() => {
      showNewsletterPopup();
    }, 2000);
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = newsletterForm.querySelector('input[type="email"]').value;
      console.log('Newsletter signup:', email);

      // Show success state
      const modal = document.querySelector('.newsletter-modal');
      modal.innerHTML = `
        <div class="newsletter-success">
          <div class="newsletter-success-icon">✓</div>
          <h3>Welcome!</h3>
          <p>Check your email for exclusive insights on product design and communication.</p>
        </div>
      `;

      setTimeout(() => {
        closeNewsletterPopup();
      }, 3000);
    });
  }

  // Close button
  const closeButton = document.querySelector('.newsletter-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeNewsletterPopup);
  }

  // Close on overlay click
  const overlay = document.querySelector('.newsletter-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeNewsletterPopup();
      }
    });
  }
}

function showNewsletterPopup() {
  const overlay = document.querySelector('.newsletter-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    localStorage.setItem('newsletterSeen', 'true');
  }
}

function closeNewsletterPopup() {
  const overlay = document.querySelector('.newsletter-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initPublicationsCarousel();
  initAboutCarousels();
  initContactForm();
  initNewsletterPopup();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (heroCarouselInterval) clearInterval(heroCarouselInterval);
  if (publicationsInterval) clearInterval(publicationsInterval);
  if (portfolioInterval) clearInterval(portfolioInterval);
  if (publicationInterval) clearInterval(publicationInterval);
});
