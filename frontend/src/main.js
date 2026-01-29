// Import data
import { projectsData } from './data/projects.js';
import { skillsData } from './data/skills.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Initialize all features
  initTheme();
  initNavigation();
  initTypingEffect();
  initSkills();
  initProjects();
  initContactForm();
  initScrollAnimations();
}

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
  });
}

function updateThemeButton(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      
      // Update active link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
  const typedElement = document.querySelector('.typed-text');
  if (!typedElement) return;
  
  const phrases = [
    'Computer Science Student',
    'JavaScript Developer',
    'Web Enthusiast',
    'Problem Solver'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// ============================================
// SKILLS SECTION
// ============================================
function initSkills() {
  const skillsGrid = document.getElementById('skillsGrid');
  if (!skillsGrid) return;
  
  skillsGrid.innerHTML = skillsData.map(category => `
    <div class="skill-card">
      <h3>${category.category}</h3>
      <ul>
        ${category.skills.map(skill => `<li>${skill}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ============================================
// PROJECTS SECTION
// ============================================
function initProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  if (!projectsGrid) return;
  
  // Display all projects initially
  displayProjects('all');
  
  // Filter button click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      const filter = btn.getAttribute('data-filter');
      displayProjects(filter);
    });
  });
}

function displayProjects(filter) {
  const projectsGrid = document.getElementById('projectsGrid');
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  projectsGrid.innerHTML = filteredProjects.map(project => `
    <div class="project-card">
      <div class="project-image">
        ${project.title}
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <a href="${project.link}" target="_blank" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">
          View Project
        </a>
      </div>
    </div>
  `).join('');
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };
    
    // For now, just show success message
    // Later you'll connect this to a backend
    alert('Thank you for your message! (Note: Backend not yet implemented)');
    form.reset();
    
    console.log('Form data:', formData);
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});