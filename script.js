document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // STICKY HEADER & SCROLL TRACKER
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // ==========================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  
  mobileNavToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const isActive = mobileNav.classList.contains('active');
    
    // Toggle hamburger icon animation
    mobileNavToggle.innerHTML = isActive 
      ? `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`
      : `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
  });

  // Close mobile navigation drawer when a link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      mobileNavToggle.innerHTML = `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
    });
  });

  // ==========================================
  // INTERSECTION OBSERVER FOR SCROLL REVEALS
  // ==========================================
  const revealElements = document.querySelectorAll('.scroll-trigger-element, .section-header, .stats-grid, .services-grid, .why-grid, .timeline-container, .tech-grid, .testimonials-slider-container, .faq-accordion, .contact-grid');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Trigger counters if this entry is the stats grid
        if (entry.target.id === 'stats-grid') {
          animateCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // STATS COUNTERS ANIMATION
  // ==========================================
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;
    
    const countItems = document.querySelectorAll('.stat-num');
    countItems.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-val'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      
      const timer = setInterval(() => {
        current += 1;
        counter.textContent = current + suffix;
        
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        }
      }, Math.max(stepTime, 15));
    });
  }

  // ==========================================
  // SERVICES MOUSE-GLOW EFFECT
  // ==========================================
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });





  // ==========================================
  // TECHNOLOGY STACK CONSOLE ACTIONS
  // ==========================================
  const techItems = document.querySelectorAll('.tech-item');
  const techPanel = document.getElementById('tech-detail-panel');
  const techIconContainer = document.getElementById('tech-detail-icon');
  const techTitle = document.getElementById('tech-detail-title');
  const techDesc = document.getElementById('tech-detail-desc');

  const techInfoMap = {
    'flutter': {
      title: 'Flutter Framework Integration',
      desc: 'We engineer premium mobile apps with native performances reaching 120 FPS. Flutter compiles directly to machine code, enabling shared rendering engine pipelines across iOS, Android, and Web nodes from a single git history.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 12h10l-2 10 12-12H12l2-10z"></path></svg>`
    },
    'react': {
      title: 'React Native & Frontends',
      desc: 'High-performance interactive interfaces using component-driven designs. We build modular components, optimizing client-side calculations and rendering pipelines for smooth page states.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line></svg>`
    },
    'nextjs': {
      title: 'Next.js & Vercel Deployments',
      desc: 'Next.js allows dynamic rendering, Static Site Generation (SSG), and Server-Side Rendering (SSR). Web pages load instantly, helping you achieve 100/100 Lighthouse performance markers and SEO ranks.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 17V7l7 10V7"></path></svg>`
    },
    'nodejs': {
      title: 'Node.js & Microservices',
      desc: 'Backend routing, API schemas, Express/NestJS instances, and asynchronous task workers. Designed to queue and process high-volume request streams with minimum memory consumption.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.5 2v16L12 22l-3.5-2V4L12 2z"></path></svg>`
    },
    'laravel': {
      title: 'Laravel Engine Architectures',
      desc: 'Ideal for custom ERP development, client databases, and secure administrative nodes. We implement secure ORM interfaces, background queues, and native integration gates.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`
    },
    'firebase': {
      title: 'Firebase & Cloud Storage',
      desc: 'Real-time database syncs, secure OAuth logins, background FCM push notifications, and fast prototype cloud functions for quick MVPs.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 22h20L12 2z"></path></svg>`
    },
    'mongodb': {
      title: 'MongoDB NoSQL Schemas',
      desc: 'Handling highly polymorphic document arrays. Flexible schemas optimize telemetry structures, messaging databases, and custom content storage models.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2s-10 4.477-10 10 4.477 10 10 10z"></path></svg>`
    },
    'postgresql': {
      title: 'PostgreSQL Relational DBs',
      desc: 'Structured database networks built for enterprise ACID operations. We construct optimized table indexes, complex view structures, and clean connection pools.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>`
    },
    'aws': {
      title: 'Amazon Web Services (AWS)',
      desc: 'Enterprise auto-scaling systems. Running VPC gateways, EC2 container routing, secure S3 storage, and serverless Lambda functions behind CloudFront DNS.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></svg>`
    },
    'docker': {
      title: 'Docker Containers',
      desc: 'Packaging codebases with exact dependency configurations. We establish clean environments for local developers and seamless migrations to production clusters.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="4" ry="4"></rect><path d="M9 10h6M9 14h6"></path></svg>`
    },
    'openai': {
      title: 'OpenAI API & Cognitive Layers',
      desc: 'Integrating Large Language Models, prompt engineering frameworks, and cognitive retrieval augmented generation systems directly into business workflows.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20M5.75 5.75l12.5 12.5M5.75 18.25l12.5-12.5"></path></svg>`
    },
    'stripe': {
      title: 'Stripe Pay Orchestration',
      desc: 'Establishing secure SaaS checkout flows, complex tier transitions, and subscription updates. We handle credit transactions smoothly with zero compliance flags.',
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8M12 8v8"></path></svg>`
    }
  };

  techItems.forEach(item => {
    const triggerDetail = () => {
      const techKey = item.getAttribute('data-tech');
      const info = techInfoMap[techKey];
      
      if (!info) return;

      techIconContainer.innerHTML = info.icon;
      techTitle.textContent = info.title;
      techDesc.textContent = info.desc;
      techPanel.classList.add('active');
    };

    item.addEventListener('mouseenter', triggerDetail);
    item.addEventListener('click', triggerDetail);
  });

  // Activate first item by default
  if (techItems.length > 0) {
    techItems[0].dispatchEvent(new Event('mouseenter'));
  }

  // ==========================================
  // ACCORDION FAQ
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other entries for a clean accordion flow
      faqItems.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================
  // TESTIMONIALS SLIDER
  // ==========================================
  const wrapper = document.getElementById('testimonials-wrapper');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const dotElements = document.querySelectorAll('.slider-dot');
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  function updateSliderPosition() {
    wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    // Update dots
    dotElements.forEach(dot => dot.classList.remove('active'));
    const activeDot = document.querySelector(`.slider-dot[data-index="${currentSlideIndex}"]`);
    if (activeDot) activeDot.classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSliderPosition();
  });

  prevBtn.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
  });

  dotElements.forEach(dot => {
    dot.addEventListener('click', () => {
      currentSlideIndex = parseInt(dot.getAttribute('data-index'));
      updateSliderPosition();
    });
  });

  // Auto rotate testimonials every 6 seconds
  let autoRotateTimer = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSliderPosition();
  }, 6000);

  // Pause rotation on hover
  const sliderContainer = document.querySelector('.testimonials-slider-container');
  sliderContainer.addEventListener('mouseenter', () => clearInterval(autoRotateTimer));
  sliderContainer.addEventListener('mouseleave', () => {
    autoRotateTimer = setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
      updateSliderPosition();
    }, 6000);
  });

  // ==========================================
  // FLOATING SCROLL-TO-TOP TRIGGER
  // ==========================================
  const topToggle = document.getElementById('widget-top-toggle');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topToggle.classList.add('visible');
    } else {
      topToggle.classList.remove('visible');
    }
  });

  topToggle.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================
  // MOCK HELPER LIVE CHAT DRAWER
  // ==========================================
  const chatToggle = document.getElementById('widget-chat-toggle');
  const chatDrawer = document.getElementById('chat-drawer');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatBody = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const optionButtons = document.querySelectorAll('.chat-opt-btn');

  chatToggle.addEventListener('click', () => {
    chatDrawer.classList.toggle('active');
    chatBody.scrollTop = chatBody.scrollHeight;
  });

  chatCloseBtn.addEventListener('click', () => {
    chatDrawer.classList.remove('active');
  });

  function appendChatMessage(text, sender = 'agent') {
    const msg = document.createElement('div');
    msg.className = `chat-msg chat-msg-${sender}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Handle preset chip selections
  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const intent = btn.getAttribute('data-intent');
      const userText = btn.textContent;
      
      // Remove option block
      btn.parentElement.remove();
      
      appendChatMessage(userText, 'user');

      setTimeout(() => {
        if (intent === 'mobile') {
          appendChatMessage("High-performance iOS & Android mobile platforms are our specialty! We write responsive layouts in Flutter to deliver native 120 FPS performance from a single codebase.", 'agent');
          setTimeout(() => {
            appendChatMessage("Would you like to schedule a quick 15-minute strategy call to review your app specification metrics?", 'agent');
          }, 1000);
        } else if (intent === 'web') {
          appendChatMessage("Excellent. We construct Vercel-quality React and Next.js applications featuring responsive admin panels, fully optimized SEO rankings, and microservice backend systems.", 'agent');
          setTimeout(() => {
            appendChatMessage("What industry is your SaaS targeting?", 'agent');
          }, 1000);

        }
      }, 800);
    });
  });

  // User manual chat submission
  function handleUserMessageSubmit() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendChatMessage(text, 'user');
    chatInput.value = '';

    setTimeout(() => {
      appendChatMessage("Understood. I have routed your query to our lead product design engineer.", 'agent');
      setTimeout(() => {
        appendChatMessage("Please leave your contact email so we can reach you with the spec design files.", 'agent');
      }, 800);
    }, 1000);
  }

  chatSendBtn.addEventListener('click', handleUserMessageSubmit);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUserMessageSubmit();
  });

  // ==========================================
  // CONTACT FORM VALIDATION & SUCCESS HANDLERS
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formSuccessMsg = document.getElementById('form-success-msg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show premium processing state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Scheduling Project Sync...</span>
      <svg style="animation: spin-pulse 1s infinite linear; margin-left: 8px" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    `;

    setTimeout(() => {
      // Transition to success screen
      contactForm.style.display = 'none';
      formSuccessMsg.style.display = 'block';
    }, 1600);
  });

  // ==========================================
  // NEWSLETTER FORM HANDLER
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');
    
    input.disabled = true;
    button.disabled = true;
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" style="width:16px;height:16px;">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    input.value = "Subscribed successfully!";
    input.style.color = "#22c55e";
  });
});
