// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize Vanta.js Dots effect
let vantaEffect;

// Function to initialize Vanta
function initVanta() {
  // Make sure the Vanta container is visible and properly sized
  const vantaContainer = document.getElementById('vanta-bg');
  vantaContainer.style.display = 'block';
  
  // Get appropriate colors based on current mode
  const isDarkMode = document.body.classList.contains('dark-mode');
  const color = isDarkMode ? 0x3a86ff : 0x0066ff;
  const bgColor = isDarkMode ? 0x1a1a2e : 0xf5f7fa;
  
  // Initialize Vanta with performance-friendly settings
  if (vantaEffect) vantaEffect.destroy();
  
  vantaEffect = VANTA.DOTS({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: color,
    color2: color,
    backgroundColor: bgColor,
    size: 2.50,
    spacing: 40.00
  });
  
  // Reduce animation intensity when not in view
  window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    
    if (window.scrollY > heroBottom) {
      // Pause animation when hero section is out of view
      if (vantaEffect && vantaEffect.renderer) {
        vantaEffect.renderer.animate = false;
      }
    } else {
      // Resume animation when hero section is in view
      if (vantaEffect && vantaEffect.renderer) {
        vantaEffect.renderer.animate = true;
      }
    }
  });
}

// Wait for everything to load before initializing Vanta
window.addEventListener('load', function() {
  // Hide loading screen
  document.getElementById('loading').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
  }, 500);
  
  // Initialize Vanta after a small delay to ensure DOM is ready
  setTimeout(initVanta, 100);
});

// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Fade in elements on scroll
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInOnScroll = function() {
    fadeElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  fadeElements.forEach(function(element) {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Check on load and scroll
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll(); // Check on initial load
});

// Clean up Vanta on page hide to prevent memory leaks
document.addEventListener('visibilitychange', function() {
  if (document.hidden && vantaEffect) {
    vantaEffect.destroy();
  } else if (!document.hidden && !vantaEffect) {
    // Reinitialize Vanta when page becomes visible again
    initVanta();
  }
});

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
const darkToggleMobile = document.getElementById('darkToggleMobile');

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    darkToggle.textContent = '☀️';
    darkToggleMobile.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    darkToggle.textContent = '🌙';
    darkToggleMobile.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
  
  // Reinitialize Vanta with new colors
  initVanta();
}

darkToggle.addEventListener('click', toggleDarkMode);
darkToggleMobile.addEventListener('click', toggleDarkMode);

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  darkToggle.textContent = '☀️';
  darkToggleMobile.textContent = '☀️';
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('overlay');

function toggleMobileMenu() {
  mobileNav.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', toggleMobileMenu);
});