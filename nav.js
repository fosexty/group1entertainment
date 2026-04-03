(function () {
  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksPanel = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  requestAnimationFrame(() => {
    body.classList.add('is-loaded');
  });

  navLinks.forEach((link) => {
    const page = link.getAttribute('data-page');
    if (page && page === currentPage) {
      link.classList.add('active');
    }
  });

  if (menuToggle && navLinksPanel) {
    menuToggle.addEventListener('click', function () {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinksPanel.classList.toggle('open');
    });

    document.addEventListener('click', function (event) {
      const clickInside = navLinksPanel.contains(event.target) || menuToggle.contains(event.target);
      if (!clickInside) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinksPanel.classList.remove('open');
      }
    });
  }

  document.querySelectorAll('a[href]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || anchor.target === '_blank') {
        return;
      }

      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      if (isExternal) {
        return;
      }

      if (href.endsWith('.html')) {
        event.preventDefault();
        body.classList.add('is-transitioning');
        setTimeout(() => {
          window.location.href = href;
        }, 220);
      }
    });
  });

  const galleryItems = document.querySelectorAll('[data-lightbox-src]');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length && lightbox && lightboxImg && lightboxClose) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', function () {
        const src = item.getAttribute('data-lightbox-src');
        const alt = item.getAttribute('data-lightbox-alt') || '';
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = function () {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }
})();
