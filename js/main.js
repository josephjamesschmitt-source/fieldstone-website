/* ============================================
   Fieldstone Group Holdings — Main JS
   ============================================ */

(function () {
  'use strict';

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Map tooltips with personal messages ----------
  var tooltip = document.querySelector('.map-tooltip');
  var mapWrap = document.querySelector('.geo-map-wrap');

  if (tooltip && mapWrap) {
    var stateInfo = {
      WI: { name: 'Wisconsin', note: "Joe's family is based here" },
      MI: { name: 'Michigan', note: "Joe's family is based here" },
      IL: { name: 'Illinois', note: '' },
      IN: { name: 'Indiana', note: '' },
      OH: { name: 'Ohio', note: '' },
      PA: { name: 'Pennsylvania', note: "Tom's family is based here" },
      FL: { name: 'Florida', note: "Tom's family is based here" }
    };

    mapWrap.querySelectorAll('.state-highlight').forEach(function (state) {
      state.addEventListener('mouseenter', function (e) {
        var id = this.getAttribute('data-state');
        var info = stateInfo[id];
        if (info) {
          tooltip.innerHTML = '<strong>' + info.name + '</strong>' +
            (info.note ? '<span class="tooltip-note">' + info.note + '</span>' : '');
        } else {
          tooltip.textContent = id;
        }
        tooltip.classList.add('visible');
      });

      state.addEventListener('mousemove', function (e) {
        var rect = mapWrap.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 50) + 'px';
      });

      state.addEventListener('mouseleave', function () {
        tooltip.classList.remove('visible');
      });
    });
  }

  // ---------- Team card hover → highlight states on map ----------
  document.querySelectorAll('.roots-card[data-highlights]').forEach(function (card) {
    var states = card.getAttribute('data-highlights').split(',');

    card.addEventListener('mouseenter', function () {
      states.forEach(function (st) {
        var el = document.querySelector('.state-highlight[data-state="' + st.trim() + '"]');
        if (el) el.classList.add('state-glow');
      });
    });

    card.addEventListener('mouseleave', function () {
      states.forEach(function (st) {
        var el = document.querySelector('.state-highlight[data-state="' + st.trim() + '"]');
        if (el) el.classList.remove('state-glow');
      });
    });
  });

  // ---------- Approach cards — mobile accordion ----------
  function isMobile() {
    return window.innerWidth <= 900;
  }

  document.querySelectorAll('.approach-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (!isMobile()) return;
      var wasOpen = card.classList.contains('approach-card--open');
      // Close all others
      document.querySelectorAll('.approach-card').forEach(function (c) {
        c.classList.remove('approach-card--open');
      });
      // Toggle clicked one
      if (!wasOpen) {
        card.classList.add('approach-card--open');
      }
    });
  });

  // ---------- Scroll-triggered fade-in animations ----------
  var animatedEls = document.querySelectorAll('.section');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedEls.forEach(function (el) {
      el.classList.add('section--animate');
      observer.observe(el);
    });
  }

  // ---------- Contact form (Formspree) ----------
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          status.className = 'form-status success';
          status.textContent = 'Thank you! We\'ll be in touch soon.';
          form.reset();
        } else {
          status.className = 'form-status error';
          status.textContent = 'Something went wrong. Please try emailing us directly.';
        }
      }).catch(function () {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong. Please try emailing us directly.';
      });
    });
  }
})();
