import { createHeroTimeline, initParallax, initGlitchEffect } from './modules/animations.js';
import { DataMesh } from './modules/dataMesh.js';
import { ProjectsSection } from './modules/projects.js';
import { AboutSection } from './modules/about.js';
import { ContactSection } from './modules/contact.js';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class App {
  constructor() {
    this.initializeApp();
  }
  
  async initializeApp() {
    try {
      // Initialize data mesh
      const dataMeshContainer = document.querySelector('.data-mesh-container');
      this.dataMesh = new DataMesh(dataMeshContainer);
      
      // Initialize animations
      await this.initializeAnimations();
      
      // Initialize sections
      this.projectsSection = new ProjectsSection(); 
      this.aboutSection = new AboutSection();
      this.contactSection = new ContactSection();
      
      // Initialize interactions last
      this.initializeInteractions();
      
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }
  
  async initializeAnimations() {
    // Create and play hero timeline
    const heroTimeline = createHeroTimeline();
    heroTimeline.play();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize glitch effect
    initGlitchEffect();
  }
  
  initializeInteractions() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Show the custom cursor only after it's positioned correctly
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Show cursors on first mouse movement
      if (cursor.style.opacity === '0') {
        gsap.to([cursor, follower], {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
    
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(follower, { x: followerX, y: followerY });
    });
    
    // Hide cursors when mouse leaves window
    document.addEventListener('mouseleave', () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.3
      });
    });
    
    document.addEventListener('mouseenter', () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3
      });
    });
    
    // Button hover effects
    document.querySelectorAll('.primary-btn, .secondary-btn').forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(follower, {
          scale: 1.5,
          duration: 0.3
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(follower, {
          scale: 1,
          duration: 0.3
        });
      });
    });
  }
}



// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    ScrollTrigger.getAll().forEach(st => st.disable());
  } else {
    ScrollTrigger.getAll().forEach(st => st.enable());
  }
});

class Showcase {
  constructor() {
    this.container = document.querySelector('.showcase-track');
    this.items = Array.from(document.querySelectorAll('.showcase-item'));
    this.currentIndex = 0;
    this.isAnimating = false;
    
    gsap.registerPlugin(ScrollTrigger);
    this.setupNavigation();
    this.setupGestures();
    this.setupKeyboardControls();
    this.setupGSAPAnimations();
    this.setupParticles();
    this.updatePositions();
  }

  setupNavigation() {
    const dotsContainer = document.querySelector('.nav-dots');
    this.items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('nav-dot');
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    document.querySelector('.nav-arrow.prev').addEventListener('click', () => this.prev());
    document.querySelector('.nav-arrow.next').addEventListener('click', () => this.next());
    
    this.updateDots();
  }

  setupGestures() {
    let startX, startY;
    let isDragging = false;
    
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
    });

    this.container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = startX - currentX;
      const diffY = startY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
        if (diffX > 50) this.next();
        if (diffX < -50) this.prev();
        isDragging = false;
      }
    });

    this.container.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  setupGSAPAnimations() {
    // Floating elements animation
    gsap.to('.floating-cube', {
      y: -30,
      rotation: 360,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to('.floating-sphere', {
      x: 30,
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to('.floating-pyramid', {
      rotation: 720,
      scale: 1.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });
  }

  setupParticles() {
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('mouseenter', this.createParticleExplosion.bind(this));
    });
  }

  createParticleExplosion(e) {
    const button = e.currentTarget;
    const particles = button.querySelector('.button-particles');
    
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particles.appendChild(particle);

      const size = Math.random() * 4 + 2;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;

      gsap.set(particle, {
        width: size,
        height: size,
        x: e.offsetX,
        y: e.offsetY
      });

      gsap.to(particle, {
        x: e.offsetX + Math.cos(angle) * velocity,
        y: e.offsetY + Math.sin(angle) * velocity,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }

  async goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    
    this.isAnimating = true;
    const direction = index > this.currentIndex ? 1 : -1;
    
    // Animate out current slide
    gsap.to(this.items[this.currentIndex].querySelector('.content-animator'), {
      opacity: 0,
      x: -50 * direction,
      duration: 0.3
    });

    const previousIndex = this.currentIndex;
    this.currentIndex = index;
    
    // Update positions first
    this.updatePositions();
    this.updateDots();
    
    // Hide all other slides immediately
    this.items.forEach((item, idx) => {
      if (idx !== previousIndex && idx !== this.currentIndex) {
        gsap.set(item.querySelector('.content-animator'), { opacity: 0 });
      }
    });
    
    // Animate in new slide
    gsap.fromTo(this.items[this.currentIndex].querySelector('.content-animator'),
      { opacity: 0, x: 50 * direction },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.3 }
    );
    
    await new Promise(resolve => setTimeout(resolve, 800));
    this.isAnimating = false;
  }

  updatePositions() {
    const radius = 800; 
    const theta = (2 * Math.PI) / this.items.length;
    const centerX = window.innerWidth / 2;
    
    this.items.forEach((item, index) => {
      const rotation = theta * (index - this.currentIndex);
      const zPosition = -radius * Math.cos(rotation);
      const xPosition = radius * Math.sin(rotation);
      
      const transform = `
        translateX(calc(-50% + ${xPosition}px))
        translateY(-50%)
        translateZ(${zPosition}px)
        rotateY(${rotation}rad)
      `;
      
      gsap.to(item, {
        transform: transform,
        opacity: Math.max(0.2, 1 - Math.abs(rotation) / Math.PI),
        duration: 0.8,
        ease: "power2.out"
      });
      
      item.classList.toggle('active', index === this.currentIndex);
      item.style.zIndex = Math.round(100 - Math.abs(rotation * 100));
    });
    
    // Smooth container rotation
    gsap.to(this.container, {
      transform: `translateX(0) translateZ(-200px) rotateY(${-theta * this.currentIndex}rad)`,
      duration: 0.8,
      ease: "power2.out"
    });
  }

  updateDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    this.goToSlide(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.goToSlide(prevIndex);
  }
}

// Initialize the showcase
document.addEventListener('DOMContentLoaded', () => {
  const showcase = new Showcase();
  
  // Initial animation
  gsap.fromTo('.content-animator',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 }
  );
  
  // Expand functionality
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.showcase-item');
      const preview = item.querySelector('.preview-frame');
      
      if (preview.style.transform.includes('scale')) {
        gsap.to(preview, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
        document.body.style.overflow = '';
      } else {
        gsap.to(preview, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
        document.body.style.overflow = 'hidden';
      }
    });
  });
});


