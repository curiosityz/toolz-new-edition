import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class ProjectsSection {
  constructor() {
    this.projects = [
      {
        id: 'ai-assistant',
        title: 'AI Development Assistant',
        description: 'Intelligent code completion and refactoring powered by advanced language models',
        longDescription: 'Boost your productivity with context-aware suggestions, automated refactoring, and intelligent code generation. Seamlessly integrates with your favorite IDE.',
        tags: ['AI', 'Development', 'Productivity'],
        link: 'https://example.com/ai-assistant',
        color: '#ff4b4b',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
      },
      {
        id: 'creative-suite',
        title: 'Creative AI Suite',
        description: 'Transform ideas into stunning visuals with AI-powered design tools',
        longDescription: 'Generate professional designs, illustrations, and animations with our intuitive AI-powered creative suite. Perfect for designers and content creators.',
        tags: ['Design', 'Creative', 'AI'],
        link: 'https://example.com/creative-suite',
        color: '#4a90e2',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM10.622 8.415l4.879 3.252a.4.4 0 010 .666l-4.88 3.252a.4.4 0 01-.621-.332V8.747a.4.4 0 01.622-.332z"/></svg>`
      },
      {
        id: 'data-insights',
        title: 'Data Insights Engine',
        description: 'Advanced analytics and visualization platform powered by AI',
        longDescription: 'Turn complex data into actionable insights with our comprehensive analysis suite. Features automated reporting and predictive analytics.',
        tags: ['Analytics', 'Data', 'Business'],
        link: 'https://example.com/data-insights',
        color: '#ffa500',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 12a7 7 0 1114 0 7 7 0 01-14 0zm7-9a9 9 0 100 18 9 9 0 000-18zm0 4v10l6-5-6-5z"/></svg>`
      },
      {
        id: 'content-forge',
        title: 'Content Forge',
        description: 'AI-powered content creation and optimization platform',
        longDescription: 'Create engaging, SEO-optimized content with our advanced AI writing assistant. Includes translation and tone adaptation features.',
        tags: ['Content', 'Writing', 'SEO'],
        link: 'https://example.com/content-forge',
        color: '#50C878',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>`
      },
      {
        id: 'workflow-ai',
        title: 'Workflow AI',
        description: 'Intelligent automation for complex business processes',
        longDescription: 'Streamline your operations with AI-powered workflow automation. Includes process mining and optimization recommendations.',
        tags: ['Automation', 'Workflow', 'AI'],
        link: 'https://example.com/workflow-ai',
        color: '#9B59B6',
        icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"/></svg>`
      }
    ];
    
    this.init();
  }

  init() {
    // Get project grid element
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) {
      console.error('Project grid element not found');
      return;
    }

    // Directly render projects
    projectGrid.innerHTML = this.projects.map(project => `
      <div class="project-card" data-project="${project.id}">
        <div class="card-content">
          <div class="card-front">
            <div class="icon-container" style="--project-color: ${project.color}">
              ${project.icon}
            </div>
            <h3>${project.title}</h3>
            <p class="card-description">${project.description}</p>
            <div class="tags">
              ${project.tags.map(tag => `<span class="tag" style="border-color: ${project.color}">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="card-back">
            <p>${project.longDescription}</p>
            <a href="${project.link}" class="cta-button" style="--project-color: ${project.color}">
              Learn More
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="card-glow"></div>
      </div>
    `).join('');

    // Initialize interactions after rendering
    this.initializeInteractions();
    this.initializeAnimations();
  }

  initializeAnimations() {
    // Animate cards on scroll
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.project-grid',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  initializeInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
      // Glow effect on hover
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        gsap.to(glow, {
          opacity: 0.8,
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 70%)`,
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        const glow = card.querySelector('.card-glow');
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3
        });
      });

      // Flip animation on hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.card-content'), {
          rotateY: 180,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.card-content'), {
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      });
    });
  }
}

// Create and export a default instance
export const projectsSection = new ProjectsSection();