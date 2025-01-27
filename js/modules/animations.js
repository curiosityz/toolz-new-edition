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
  
  return tl;
}

// Parallax Effect
export function initParallax() {
  const layers = gsap.utils.toArray('.layer');
  
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

// Scale Down TOOLZ Text on Scroll
export function scaleDownToolzOnScroll() {
  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom center',
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      
      // Scale and fade the TOOLZ text
      gsap.to('.electric-container', {
        scale: Math.max(0.5, 1 - (progress * 0.5)),
        y: progress * -200,
        opacity: Math.max(0.2, 1 - progress),
        duration: 0.1,
        ease: 'none'
      });

      // Additional text properties adjustment
      gsap.to('.electric-text', {
        filter: `blur(${progress * 2}px)`,
        duration: 0.1,
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