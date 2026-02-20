/**
 * professionals.js - Logique page recrutement Alliance Mobilité
 * Validation formulaire, compteurs animés, carousel testimoniaux, accordion FAQ
 */

(function() {
  'use strict';

  // ========== NAVIGATION ==========
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  function openMobile() {
    if (mobileMenu) {
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobile() {
    if (mobileMenu) {
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  window.closeMobile = closeMobile;

  if (hamburger) hamburger.addEventListener('click', function() {
    mobileMenu.classList.contains('is-open') ? closeMobile() : openMobile();
  });
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);

  // Highlight nav au scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function onScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(function(section) {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Smooth scroll ancres
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== COMPTEURS ANIMÉS ==========
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  let statsAnimated = false;

  function animateValue(el, end) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();
    const suffix = el.textContent.match(/[^\d]+$/) ? el.textContent.match(/[^\d]+$/)[0] : '';
    const isPercent = el.textContent.indexOf('%') !== -1;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      el.textContent = current + (isPercent ? '%' : '') + suffix.replace('%', '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    if (statsAnimated) return;
    statValues.forEach(function(el) {
      const end = parseInt(el.getAttribute('data-count'), 10);
      if (!isNaN(end)) {
        animateValue(el, end);
      }
    });
    statsAnimated = true;
  }

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          initCounters();
        }
      });
    }, { threshold: 0.3 });
    obs.observe(statsSection);
  }

  // ========== CAROUSEL TÉMOIGNAGES ==========
  const track = document.getElementById('testimonial-track');
  const dots = document.getElementById('testimonial-dots');
  let currentSlide = 0;
  const totalSlides = track ? track.children.length : 0;

  function goToSlide(index) {
    if (!track) return;
    currentSlide = index;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    if (dots) {
      dots.querySelectorAll('button').forEach(function(btn, i) {
        btn.classList.toggle('active', i === index);
        btn.setAttribute('aria-selected', i === index);
      });
    }
  }

  if (dots) {
    dots.querySelectorAll('button').forEach(function(btn, i) {
      btn.addEventListener('click', function() { goToSlide(i); });
    });
  }

  // Auto-play optionnel
  if (totalSlides > 1) {
    setInterval(function() {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 5000);
  }

  // ========== FAQ ACCORDION ==========
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function(i) {
        i.classList.remove('is-open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ========== VALIDATION FORMULAIRE ==========
  const form = document.getElementById('registration-form');
  const progressBar = document.getElementById('form-progress-bar');
  const successMsg = document.getElementById('success-message');
  const errorFallback = document.getElementById('error-fallback');
  const submitBtn = document.getElementById('submit-btn');

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

  function luhnCheck(siret) {
    var sum = 0;
    var alt = false;
    for (var i = siret.length - 1; i >= 0; i--) {
      var n = parseInt(siret[i], 10);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  }

  function validateSiret(val) {
    val = val.replace(/\s/g, '');
    if (!/^\d{14}$/.test(val)) return false;
    return luhnCheck(val);
  }

  function validatePhone(val) {
    return PHONE_REGEX.test(val.replace(/\s/g, ''));
  }

  function showError(id, msg) {
    var el = document.getElementById(id);
    var errEl = document.getElementById(id + '-error');
    if (el) el.classList.add('error');
    if (errEl) errEl.textContent = msg;
  }

  function clearError(id) {
    var el = document.getElementById(id);
    var errEl = document.getElementById(id + '-error');
    if (el) el.classList.remove('error');
    if (errEl) errEl.textContent = '';
  }

  function validateField(name, value) {
    switch (name) {
      case 'companyName':
        return value.trim().length >= 2;
      case 'siret':
        return validateSiret(value);
      case 'contactName':
        return value.trim().length >= 2;
      case 'contactEmail':
        return EMAIL_REGEX.test(value);
      case 'contactPhone':
        return validatePhone(value);
      case 'experience':
        return value !== '';
      default:
        return true;
    }
  }

  function getErrorMessage(name, value) {
    switch (name) {
      case 'companyName':
        return value.trim().length < 2 ? 'Minimum 2 caractères' : '';
      case 'siret':
        if (value.replace(/\s/g, '').length !== 14) return 'Le SIRET doit contenir 14 chiffres';
        if (!validateSiret(value)) return 'SIRET invalide (vérification Luhn)';
        return '';
      case 'contactEmail':
        return !EMAIL_REGEX.test(value) ? 'Email invalide' : '';
      case 'contactPhone':
        return !validatePhone(value) ? 'Format invalide (ex: 06 12 34 56 78)' : '';
      default:
        return '';
    }
  }

  function updateProgress() {
    if (!form || !progressBar) return;
    var total = 9, filled = 0;
    var companyName = document.getElementById('companyName');
    var siret = document.getElementById('siret');
    var contactName = document.getElementById('contactName');
    var contactEmail = document.getElementById('contactEmail');
    var contactPhone = document.getElementById('contactPhone');
    var experience = document.getElementById('experience');
    var terms = document.getElementById('terms');
    if (companyName && companyName.value.trim().length >= 2) filled++;
    if (siret && validateSiret(siret.value)) filled++;
    if (contactName && contactName.value.trim().length >= 2) filled++;
    if (contactEmail && EMAIL_REGEX.test(contactEmail.value)) filled++;
    if (contactPhone && validatePhone(contactPhone.value)) filled++;
    if (experience && experience.value !== '') filled++;
    if (form.querySelectorAll('input[name="zone"]:checked').length > 0) filled++;
    if (form.querySelectorAll('input[name="prestation"]:checked').length > 0) filled++;
    if (terms && terms.checked) filled++;
    var pct = Math.round((filled / total) * 100);
    progressBar.style.width = pct + '%';
    var parent = progressBar.closest('[role="progressbar"]');
    if (parent) parent.setAttribute('aria-valuenow', pct);
  }

  form.querySelectorAll('input, select, textarea').forEach(function(el) {
    el.addEventListener('blur', function() {
      var name = this.name || this.id;
      if (!name) return;
      if (name === 'zone' || name === 'prestation') return;
      var val = this.type === 'checkbox' ? this.checked : this.value;
      if (this.required && !val) {
        showError(name, 'Champ requis');
      } else if (val && !validateField(name, val)) {
        showError(name, getErrorMessage(name, val));
      } else {
        clearError(name);
      }
      updateProgress();
    });
    el.addEventListener('input', updateProgress);
  });

  form.querySelectorAll('input[name="zone"], input[name="prestation"]').forEach(function(el) {
    el.addEventListener('change', function() {
      var zones = form.querySelectorAll('input[name="zone"]:checked');
      var prests = form.querySelectorAll('input[name="prestation"]:checked');
      var zErr = document.getElementById('zones-error');
      var pErr = document.getElementById('prestations-error');
      if (zErr) zErr.textContent = zones.length === 0 ? 'Sélectionnez au moins une zone' : '';
      if (pErr) pErr.textContent = prests.length === 0 ? 'Sélectionnez au moins une prestation' : '';
      updateProgress();
    });
  });

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var zones = form.querySelectorAll('input[name="zone"]:checked');
      var prests = form.querySelectorAll('input[name="prestation"]:checked');
      var valid = true;

      ['companyName', 'siret', 'contactName', 'contactEmail', 'contactPhone', 'experience'].forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        var val = el.value;
        if (el.required && (!val || !validateField(id, val))) {
          showError(id, getErrorMessage(id, val) || 'Champ requis');
          valid = false;
        } else {
          clearError(id);
        }
      });

      if (zones.length === 0) {
        document.getElementById('zones-error').textContent = 'Sélectionnez au moins une zone';
        valid = false;
      } else {
        document.getElementById('zones-error').textContent = '';
      }
      if (prests.length === 0) {
        document.getElementById('prestations-error').textContent = 'Sélectionnez au moins une prestation';
        valid = false;
      } else {
        document.getElementById('prestations-error').textContent = '';
      }

      if (!document.getElementById('terms').checked) {
        document.getElementById('terms-error').textContent = 'Vous devez accepter les CGU';
        valid = false;
      } else {
        document.getElementById('terms-error').textContent = '';
      }

      if (!valid) return;

      var formData = new FormData(form);
      formData.append('Zones_intervention', Array.from(zones).map(function(c) { return c.value; }).join(', '));
      formData.append('Types_prestations', Array.from(prests).map(function(c) { return c.value; }).join(', '));

      if (submitBtn) submitBtn.disabled = true;
      var submitText = document.getElementById('submit-text');
      if (submitText) submitText.textContent = 'Envoi en cours...';

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function(res) {
        if (res.ok) {
          form.style.display = 'none';
          successMsg.classList.add('visible');
        } else {
          throw new Error('Erreur serveur');
        }
      }).catch(function() {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Envoyer ma candidature';
        errorFallback.classList.add('visible');
      });
    });
  }

})();
