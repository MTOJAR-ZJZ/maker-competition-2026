// ========== Countdown Timer ==========
(function initCountdown() {
  const deadline = new Date('2025-07-30T23:59:59+08:00');

  function update() {
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();

// ========== Scroll Reveal ==========
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
})();

// ========== FAQ Accordion ==========
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      items.forEach((i) => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });

    // Keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
})();

// ========== File Upload ==========
(function initFileUpload() {
  const dropZone = document.getElementById('file-drop');
  const fileInput = document.getElementById('proposal');

  if (!dropZone || !fileInput) return;

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--accent)';
    dropZone.style.background = 'var(--accent-dim)';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = '';
    dropZone.style.background = '';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '';
    dropZone.style.background = '';
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      updateFileLabel(e.dataTransfer.files[0].name);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      updateFileLabel(fileInput.files[0].name);
    }
  });

  function updateFileLabel(name) {
    const p = dropZone.querySelector('p');
    if (p) p.textContent = '\u5DF2\u9009\u62E9: ' + name;
  }
})();

// ========== Registration Form ==========
(function initForm() {
  const form = document.getElementById('registration-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = '\u63D0\u4EA4\u4E2D...';
    btn.disabled = true;

    // Simulate submission
    setTimeout(() => {
      btn.textContent = '\u63D0\u4EA4\u6210\u529F\uFF01';
      btn.style.background = '#22c55e';
      btn.style.boxShadow = '0 0 30px rgba(34,197,94,0.3)';

      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        form.reset();

        // Reset file upload label
        const dropP = document.querySelector('#file-drop p');
        if (dropP) dropP.textContent = '\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u6216\u70B9\u51FB\u4E0A\u4F20';
      }, 3000);
    }, 1500);
  });
})();

// ========== Navbar Parallax / Scroll Effects ==========
(function initScrollEffects() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent && scrolled < hero.offsetHeight) {
      const opacity = Math.max(0, 1 - scrolled / (hero.offsetHeight * 0.6));
      const transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = opacity;
      heroContent.style.transform = transform;
    }
  });
})();

// ========== Smooth Parallax on Hero BG ==========
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.2}px)`;
  });
})();
