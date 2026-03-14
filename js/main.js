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

  // ---------- Map tooltips ----------
  var tooltip = document.querySelector('.map-tooltip');
  var mapWrap = document.querySelector('.geo-map-wrap');

  if (tooltip && mapWrap) {
    var stateNames = {
      WI: 'Wisconsin', IL: 'Illinois', IN: 'Indiana',
      OH: 'Ohio', MI: 'Michigan', PA: 'Pennsylvania', FL: 'Florida'
    };

    mapWrap.querySelectorAll('.state-highlight').forEach(function (state) {
      state.addEventListener('mouseenter', function (e) {
        var id = this.getAttribute('data-state');
        tooltip.textContent = stateNames[id] || id;
        tooltip.classList.add('visible');
      });

      state.addEventListener('mousemove', function (e) {
        var rect = mapWrap.getBoundingClientRect();
        tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 32) + 'px';
      });

      state.addEventListener('mouseleave', function () {
        tooltip.classList.remove('visible');
      });
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
