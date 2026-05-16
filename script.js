/* ===================================
   Nova Foods — Interactive Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== Loader ===== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 600);
  });
  // Fallback: hide loader after 2s even if load event doesn't fire
  setTimeout(() => loader && loader.classList.add('hidden'), 2000);

  /* ===== Navbar Scroll Effect ===== */
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ===== Mobile Nav Toggle ===== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile nav when link clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ===== Active Nav Link on Scroll ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveLink = () => {
    let current = '';
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
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ===== Scroll Animations (Intersection Observer) ===== */
  const animatedElements = document.querySelectorAll('[data-animate]');
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  /* ===== Counter Animation ===== */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '+';
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current) + (suffix === '%' ? '' : '+');
            requestAnimationFrame(update);
          } else {
            el.textContent = target + suffix;
          }
        };
        update();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ===== Smooth Scroll for Anchor Links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ===== Scroll to Top Button ===== */
  const scrollTopBtn = document.getElementById('scrollTop');
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== Contact Form Submission ===== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    // Simulate loading
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Build mailto link with form data
      const name = document.getElementById('name').value;
      const company = document.getElementById('company').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      const subjectLine = `Inquiry from ${name} (${company}) — ${subject}`;
      const bodyText = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`;

      // Open user's email client
      window.location.href = `mailto:nova.foods10@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyText)}`;

      formSuccess.classList.add('show');
      contactForm.reset();
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 6000);
    }, 1000);
  });

  /* ===== Year in Footer ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Parallax for Hero Visual ===== */
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ===== Service Cards Tilt Effect ===== */
  const serviceCards = document.querySelectorAll('.service-card, .why-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ===== Initial Run ===== */
  handleScroll();
  updateActiveLink();
});
