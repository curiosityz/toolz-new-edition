// Import necessary modules
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero Animation Timeline
export function createHeroTimeline() {
  const tl = gsap.timeline();
  
  // Animate in the title with a glitch effect
  tl.to('.loading-screen', {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      document.querySelector('.loading-screen').style.display = 'none';
    }
  })
  .from('.line1', {
    opacity: 0,
    x: -100,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.line2', {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.5')
  .from('.text-animate', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.3')
  .from('.cta-container', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.5')
  .from('.scroll-indicator', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.5')
  .from(['.cursor', '.cursor-follower'], {
    opacity: 0,
    duration: 0.3,
    ease: 'none'
  }, '-=0.5');
  
  // Add text knockout initialization
  initTextKnockout();
  
  // Initialize electric effect
  initElectricEffect();
  
  // Add effects to layer-mid
  tl.to('.layer-mid', {
    rotation: -360,
    scale: 1.1,
    duration: 30,
    ease: 'none',
    repeat: -1
  }, 0)
  .to('.layer-mid', {
    filter: 'blur(3px) contrast(1.4) hue-rotate(360deg)',
    duration: 20,
    ease: 'none',
    repeat: -1
  }, 0);
  
  // Add floating animation to the scaled text
  gsap.to('.electric-container', {
    y: '+=20',
    rotation: 2,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });

  return tl;
}

// Parallax Effect
export function initParallax() {
  const layers = gsap.utils.toArray('.layer');
  
  // Add scroll trigger specifically for TOOLZ text scaling
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      
      // Scale down the TOOLZ text
      gsap.to('.electric-container', {
        scale: 1 - (progress * 0.5),  
        y: progress * -200,
        opacity: 1 - progress,
        duration: 0,  
        ease: 'none'
      });

      // Additional text properties adjustment
      gsap.to('.electric-text', {
        scale: 1 - (progress * 0.5), 
        y: progress * -100,
        opacity: 1 - progress,
        filter: `blur(${progress * 2}px)`,
        duration: 0,
        ease: 'none'
      });
    }
  });

  // Keep existing layer parallax code
  layers.forEach((layer) => {
    const speed = layer.dataset.speed || 0.1;
    
    gsap.to(layer, {
      y: `${-100 * speed}%`,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  });
}

// Glitch Text Effect
export function initGlitchEffect() {
  const glitchText = document.querySelector('.glitch-title');
  
  function createGlitch() {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3
    });
    
    tl.to(glitchText, {
      skewX: 20,
      duration: 0.1,
      ease: 'power4.inOut'
    })
    .to(glitchText, {
      skewX: 0,
      duration: 0.1,
      ease: 'power4.inOut'
    })
    .to(glitchText, {
      opacity: 0.8,
      duration: 0.1,
      ease: 'power4.inOut'
    })
    .to(glitchText, {
      opacity: 1,
      duration: 0.1,
      ease: 'power4.inOut'
    });
    
    return tl;
  }
  
  createGlitch();
}

function initElectricEffect() {
  // Animate electric lines
  gsap.to('.electric-line', {
    strokeDashoffset: 0,
    strokeDasharray: '1500 1500',
    opacity: 0.5,
    duration: 2,
    stagger: 0.2,
    repeat: -1,
    ease: 'power2.inOut'
  });

  // Create distortion effect
  gsap.to('.electric-text', {
    duration: 0.1,
    skewX: 'random(-2, 2)',
    skewY: 'random(-1, 1)',
    repeat: -1,
    repeatRefresh: true
  });

  // Transition effect
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      gsap.to('.electric-container', {
        y: self.progress * -200,
        scale: 1 - self.progress * 0.3,
        opacity: 1 - self.progress,
        duration: 0
      });
      
      gsap.to('.section-transition', {
        scaleY: self.progress,
        duration: 0
      });
      
      // Intensify electric effect during scroll
      const intensity = 1 + self.progress * 2;
      gsap.to('.electric-text::before, .electric-text::after', {
        filter: `blur(${0.5 * intensity}px)`,
        textShadow: `0 0 ${20 * intensity}px var(--primary-color)`,
        duration: 0
      });
    }
  });
}

// Text Knockout Effect
export function initTextKnockout() {
  // Split text into characters
  const text = document.querySelector('.text-knockout');
  const chars = text.textContent.split('');
  
  text.innerHTML = chars.map(char => 
    `<span class="text-knockout-char">${char}</span>`
  ).join('');
  
  // Create timeline for initial appearance
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  // Initial reveal animation
  gsap.from('.text-knockout', {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out'
  });
  
  // Add characters to timeline
  const charsArray = gsap.utils.toArray('.text-knockout-char');
  
  tl.to(charsArray, {
    y: gsap.utils.wrap([-100, 100, -50, 50, -75, 75]),
    rotation: gsap.utils.wrap([-360, 360, -180, 180, -90, 90]),
    opacity: gsap.utils.wrap([0.2, 0.5, 0.8, 1]),
    duration: 1,
    stagger: {
      each: 0.1,
      from: "random"
    }
  })
  .to('.text-knockout', {
    scale: 2,
    opacity: 0,
    duration: 1
  }, ">");
  
  // Add hover effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to('.text-knockout', {
      x: mouseX,
      y: mouseY,
      rotation: mouseX * 0.05,
      duration: 0.5
    });
  });
}

// Add ScrollTrigger to scale down 'TOOLZ' text on scroll
export function scaleDownToolzOnScroll() {
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'bottom top', 
    end: 'bottom+=500 top', 
    scrub: true, 
    onUpdate: (self) => {
      const progress = self.progress;
      const scaleValue = Math.max(1 - (progress * 0.7), 0.3); 
      const opacityValue = Math.max(1 - (progress * 0.8), 0.1); 

      gsap.to('.electric-container', {
        scale: scaleValue,
        opacity: opacityValue,
        y: progress * -250, 
        duration: 0,
        ease: 'none'
      });

      gsap.to('.electric-text', {
        scale: scaleValue,
        opacity: opacityValue,
        y: progress * -150, 
        filter: `blur(${progress * 4}px)`, 
        duration: 0,
        ease: 'none'
      });
    }
  });
}

// Initialize animations
export async function initializeAnimations() {
  const heroTimeline = createHeroTimeline();
  initParallax(); 
  initGlitchEffect();
  scaleDownToolzOnScroll();
  heroTimeline.play();
}