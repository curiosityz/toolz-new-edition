import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export class ProjectsSection {
  constructor() {
    this.projects = [
      {
        id: 'ai-code',
        title: 'AI Code Assistant',
        description: 'Boost your productivity with context-aware code suggestions and automated refactoring powered by state-of-the-art language models.',
        tags: ['AI', 'Development', 'Productivity'],
        link: 'https://example.com/ai-code',
        color: '#ff4b4b',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.325 3.05L8.667 20.432l1.932.518 4.658-17.382-1.932-.518zM7.612 18.36l1.36-1.448-.001-.108c0-1.216-.995-2.203-2.219-2.203-1.224 0-2.219.987-2.219 2.203 0 1.216.995 2.203 2.219 2.203 1.151 0 2.095-.923 2.196-2.078l-1.336 1.431zm8.776 0l1.36-1.448-.001-.108c0-1.216-.995-2.203-2.219-2.203-1.224 0-2.219.987-2.219 2.203 0 1.216.995 2.203 2.219 2.203 1.151 0 2.095-.923 2.196-2.078l-1.336 1.431z"/></svg>`
      },
      {
        id: 'design-gen',
        title: 'Design Generator',
        description: 'Transform your ideas into professional designs instantly with our AI-powered design generator. Perfect for mockups, social media, and marketing materials.',
        tags: ['Design', 'AI', 'Creative'],
        link: 'https://example.com/design-gen',
        color: '#4a90e2',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM10.622 8.415l4.879 3.252a.4.4 0 010 .666l-4.88 3.252a.4.4 0 01-.621-.332V8.747a.4.4 0 01.622-.332z"/></svg>`
      },
      {
        id: 'data-analysis',
        title: 'Data Analysis Suite',
        description: 'Turn complex data into actionable insights with our comprehensive analysis suite. Features automated reporting, predictive analytics, and interactive visualizations.',
        tags: ['Analytics', 'Data', 'Business'],
        link: 'https://example.com/data-analysis',
        color: '#ffa500',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 12a7 7 0 1114 0 7 7 0 01-14 0zm7-9a9 9 0 100 18 9 9 0 000-18zm0 4v10l6-5-6-5z"/></svg>`
      }
    ];
    
    this.init();
  }

  init() {
    this.renderProjects();
    this.initializeAnimations();
    this.initializeInteractions();
    this.initializeResponsive();
  }

  renderProjects() {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;

    grid.innerHTML = this.projects.map(project => `
      <div class="project-card" data-project="${project.id}">
        <div class="card-content">
          <div class="icon-container" style="--project-color: ${project.color}">
            ${project.icon}
          </div>
          <h3>${project.title}</h3>
          <div class="tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <p class="project-description">${project.description}</p>
          <a href="${project.link}" class="cta-button" style="--project-color: ${project.color}">
            Learn More
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </a>
          <div class="card-glow"></div>
        </div>
      </div>
    `).join('');
  }

  initializeAnimations() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const setupAnimations = () => {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.project-grid',
          start: mediaQuery.matches ? 'top center+=50' : 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        y: mediaQuery.matches ? 30 : 50,
        opacity: 0,
        duration: mediaQuery.matches ? 0.4 : 0.6,
        stagger: mediaQuery.matches ? 0.1 : 0.15,
        ease: 'power2.out'
      });
    };

    setupAnimations();
    mediaQuery.addListener(setupAnimations);
  }

  initializeInteractions() {
    const isDesktop = () => window.matchMedia('(min-width: 1025px)').matches;
    
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      const glow = card.querySelector('.card-glow');
      
      if (isDesktop()) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          glow.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--glow-color) 0%, transparent 70%)`;
        });

        card.addEventListener('mouseleave', () => {
          glow.style.background = 'none';
        });
      }

      card.addEventListener('click', () => {
        if (!isDesktop()) return;
        gsap.to(card, {
          scale: 0.98,
          duration: 0.1,
          yoyo: true,
          repeat: 1
        });
      });
    });
  
      this.init();
    }
  
    init() {
      this.renderProjects();
      this.initializeAnimations();
      this.initializeInteractions();
      // Removed initializeResponsive() call
    }

  initializeResponsive() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleResponsive = (e) => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const content = card.querySelector('.card-content');
        const tags = card.querySelector('.tags');
        const description = card.querySelector('.project-description');
        const ctaButton = card.querySelector('.cta-button');
        
        if (e.matches) {
          // Mobile view - simplified layout
          content.style.transform = 'none';
          content.style.transition = 'transform 0.2s ease';
          content.style.padding = '1.5rem';
          content.style.gap = '0.75rem';
          if (tags) {
            tags.style.flexWrap = 'wrap';
            tags.style.justifyContent = 'center';
            tags.style.gap = '0.5rem';
          }
          if (description) {
            description.style.fontSize = '0.9rem';
            description.style.lineHeight = '1.4';
            description.style.margin = '0.5rem 0';
          }
          if (ctaButton) {
            ctaButton.style.padding = '0.5rem 1rem';
            ctaButton.style.marginTop = '0.5rem';
          }
        } else {
          // Reset styles for larger screens
          content.style.removeProperty('transform');
          content.style.removeProperty('transition');
          content.style.removeProperty('padding');
          content.style.removeProperty('gap');
          if (tags) {
            tags.style.removeProperty('flex-wrap');
            tags.style.removeProperty('justify-content');
            tags.style.removeProperty('gap');
          }
          if (description) {
            description.style.removeProperty('font-size');
            description.style.removeProperty('line-height');
            description.style.removeProperty('margin');
          }
          if (ctaButton) {
            ctaButton.style.removeProperty('padding');
            ctaButton.style.removeProperty('margin-top');
          }
        }
      });
    };

    // Initial check
    handleResponsive(mediaQuery);
    mediaQuery.addListener(handleResponsive);

    window.addEventListener('orientationchange', () => {
      setTimeout(() => handleResponsive(mediaQuery), 100);
    });
  }
}
