document.addEventListener('DOMContentLoaded', () => {
  // ========== Scroll Animations ==========
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ========== Counter Animation ==========
  const counters = document.querySelectorAll('.credencial-numero');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ========== Smooth scroll for anchor links ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== Navbar scroll effect ==========
  const nav = document.querySelector('.nav-top');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  // ========== Simple Form Handling ==========
  const form = document.getElementById('formContato');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('inputNome').value.trim();
      const tel = document.getElementById('inputTel').value.trim();
      if (nome && tel) {
        const msg = encodeURIComponent(
          `Olá, meu nome é ${nome}. Tenho interesse em conhecer os lotes em Iranduba. Meu telefone: ${tel}`
        );
        window.open(`https://wa.me/5592XXXXXXXXX?text=${msg}`, '_blank');
      }
    });
  }

  // ========== Gallery Lightbox ==========
  const galleryItems = document.querySelectorAll('.galeria-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,.9);
        z-index:9999;display:flex;align-items:center;
        justify-content:center;cursor:pointer;
        animation:fadeIn .3s ease;
      `;
      const bigImg = document.createElement('img');
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      bigImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;object-fit:contain;';
      overlay.appendChild(bigImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });
});
