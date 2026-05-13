// site vars
var IMB_CONFIG = {
  whatsappNumber: '5519994169662',        // somente num
  whatsappDefaultMsg: 'Olá! Gostaria de mais informações sobre os equipamentos IMB.',
  telefone: '+55 (47) 3333-0000',
  email: 'comercial@imb-brasil.com.br',
  // Horário comercial — exibido em badges perto de botões WA principais.
  horarioComercial: 'Seg–Sex · 8h–18h · Resposta em ~15min',
};

if (window.IMB_I18N) {
  IMB_CONFIG.whatsappDefaultMsg = window.IMB_I18N.t('wa.default');
  IMB_CONFIG.horarioComercial = window.IMB_I18N.t('wa.hint');
}

// Helper público: monta URL do WhatsApp com mensagem (já tratando encoding).
// Pode ser chamado por qualquer script (compare.js, cases.js, etc).
window.IMB_buildWaUrl = function (msg) {
  var text = (msg && String(msg).trim()) || IMB_CONFIG.whatsappDefaultMsg;
  return 'https://wa.me/' + IMB_CONFIG.whatsappNumber + '?text=' + encodeURIComponent(text);
};

// Resolve a mensagem contextual de um link .wa-link:
// 1. data-wa-msg no próprio elemento
// 2. data-wa-msg em ancestral mais próximo (permite agrupar cards inteiros)
// 3. <meta name="wa-default-msg"> da página
// 4. fallback global IMB_CONFIG.whatsappDefaultMsg
window.IMB_resolveWaMsg = function (el) {
  if (!el) return IMB_CONFIG.whatsappDefaultMsg;
  if (el.dataset && el.dataset.waMsg) return el.dataset.waMsg;
  var ancestor = el.closest && el.closest('[data-wa-msg]');
  if (ancestor) return ancestor.dataset.waMsg;
  var meta = document.querySelector('meta[name="wa-default-msg"]');
  if (meta && meta.content) return meta.content;
  return IMB_CONFIG.whatsappDefaultMsg;
};

(function () {
  'use strict';

  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const closeMenuBtn = document.getElementById('close-menu-btn');

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('shadow-md');
        nav.classList.remove('shadow-sm');
      } else {
        nav.classList.remove('shadow-md');
        nav.classList.add('shadow-sm');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var animatedElements = document.querySelectorAll('.fade-in-up');
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Delegação global: qualquer .wa-link (inclusive renderizado dinamicamente
  // por compare.js / cases.js depois deste arquivo) tem o href resolvido na hora do clique.
  // Mantém o atributo href visível como espelho para acessibilidade / hover preview.
  function refreshWaHrefs(root) {
    (root || document).querySelectorAll('.wa-link').forEach(function (link) {
      link.href = window.IMB_buildWaUrl(window.IMB_resolveWaMsg(link));
    });
  }
  refreshWaHrefs();
  // Reaplica após mutações relevantes (DOM dinâmico)
  if ('MutationObserver' in window) {
    var moTimer = null;
    var mo = new MutationObserver(function () {
      if (moTimer) return;
      moTimer = setTimeout(function () { moTimer = null; refreshWaHrefs(); }, 50);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }
  // Garantia adicional na hora do clique (caso o atributo não tenha sido sincronizado)
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('.wa-link');
    if (!link) return;
    link.href = window.IMB_buildWaUrl(window.IMB_resolveWaMsg(link));
  }, true);

  // ---- Cases (obras de destaque) — render a partir de window.IMB_CASES ----
  function escHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function T(v) {
    if (v == null) return '';
    if (typeof v === 'object' && (v.pt || v.en || v.es)) {
      return (window.IMB_I18N && window.IMB_I18N.pickLang) ? window.IMB_I18N.pickLang(v) : (v.pt || v.en || v.es || '');
    }
    return v;
  }
  var I18N_LANG = (window.IMB_I18N && window.IMB_I18N.lang) || 'pt';
  var I18N_LOCALE = I18N_LANG === 'pt' ? 'pt-BR' : (I18N_LANG === 'en' ? 'en-US' : 'es-AR');
  var MAIN_UI = {
    viewCase:       { pt: 'Ver case', en: 'View case', es: 'Ver caso' },
    totalRoad:      { pt: 'Pavimentação rígida & contornos', en: 'Rigid paving & bypasses', es: 'Pavimentación rígida y circunvalaciones' },
    totalBarrier:   { pt: 'Barreiras de concreto extrudadas', en: 'Extruded concrete barriers', es: 'Barreras de concreto extruidas' },
    totalConcrete:  { pt: 'Concreto aplicado', en: 'Concrete poured', es: 'Concreto aplicado' },
    totalProjects:  { pt: 'Obras de destaque entregues', en: 'Featured projects delivered', es: 'Obras destacadas entregadas' },
  };
  function mainUi(k) { var e = MAIN_UI[k]; return e ? (e[I18N_LANG] || e.pt) : k; }
  var caseUrl = (window.IMB_I18N && window.IMB_I18N.urlFor) ? window.IMB_I18N.urlFor('case') : 'case.html';

  function fmtNum(n) {
    if (typeof n === 'number') return n.toLocaleString(I18N_LOCALE);
    return String(n);
  }

  function renderCaseCard(c) {
    if (window.IMB_CASES && window.IMB_CASES.renderCard) return window.IMB_CASES.renderCard(c);
    return '';
  }

  function renderTotalCard(value, unit, label, icon) {
    return ''
      + '<div class="bg-surface-container-lowest rounded-xl p-5 md:p-6 border-b-4 border-primary/30 fade-in-up">'
      +   '<span class="material-symbols-outlined text-3xl md:text-4xl text-primary mb-3 block">' + escHtml(icon) + '</span>'
      +   '<div class="font-headline font-black text-3xl md:text-4xl text-on-surface tracking-tight leading-none">'
      +     fmtNum(value) + (unit ? ' <span class="text-base md:text-lg text-on-surface-variant font-bold">' + escHtml(unit) + '</span>' : '')
      +   '</div>'
      +   '<div class="text-[10px] md:text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-2">' + escHtml(label) + '</div>'
      + '</div>';
  }

  function renderTestimonialCard(c) {
    if (!c.testimonial) return '';
    var t = c.testimonial;
    var detailUrl = (window.IMB_I18N && window.IMB_I18N.caseDetailUrl)
      ? window.IMB_I18N.caseDetailUrl(c.id)
      : caseUrl + '?id=' + encodeURIComponent(c.id);
    return ''
      + '<article class="bg-surface-container-lowest rounded-xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">'
      +   '<span class="material-symbols-outlined text-primary text-3xl">format_quote</span>'
      +   '<p class="text-on-surface text-sm md:text-base leading-relaxed flex-1 italic">"' + escHtml(T(t.quote)) + '"</p>'
      +   '<div class="flex items-start justify-between gap-3 pt-4 border-t border-surface-container-high">'
      +     '<div class="min-w-0">'
      +       '<div class="font-headline font-bold text-sm text-on-surface leading-tight">' + escHtml(t.author) + '</div>'
      +       '<div class="text-[11px] text-on-surface-variant mt-0.5">' + escHtml(T(t.role)) + ' · ' + escHtml(T(t.company)) + '</div>'
      +     '</div>'
      +     '<a href="' + escHtml(detailUrl) + '" class="shrink-0 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline flex items-center gap-1">'
      +       escHtml(mainUi('viewCase')) + '<span class="material-symbols-outlined text-sm">arrow_outward</span>'
      +     '</a>'
      +   '</div>'
      + '</article>';
  }

  if (window.IMB_CASES) {
    var grid = document.getElementById('cases-grid');
    if (grid) {
      var caseItems = window.IMB_CASES.cases.slice();
      var caseLimit = parseInt(grid.getAttribute('data-limit') || '', 10);
      if (grid.getAttribute('data-featured') === 'home') {
        caseItems = caseItems.filter(function (c) { return !!c.featured; })
          .concat(caseItems.filter(function (c) { return !c.featured; }));
      }
      if (!isNaN(caseLimit) && caseLimit > 0) caseItems = caseItems.slice(0, caseLimit);
      grid.innerHTML = caseItems.map(function (c) {
        return renderCaseCard(c);
      }).join('');
      // Reaplicar IntersectionObserver nos novos .fade-in-up
      grid.querySelectorAll('.fade-in-up').forEach(function (el) {
        if ('IntersectionObserver' in window) {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
            });
          }, { threshold: 0.15 });
          io.observe(el);
        } else {
          el.classList.add('is-visible');
        }
      });
    }

    var totalsEl = document.getElementById('cases-totals');
    if (totalsEl) {
      var totals = window.IMB_CASES.totals();
      totalsEl.innerHTML = [
        renderTotalCard(totals.kmRodovia,  'km', mainUi('totalRoad'),     'route'),
        renderTotalCard(totals.kmBarreira, 'km', mainUi('totalBarrier'),  'security'),
        renderTotalCard(totals.m3,         'm³', mainUi('totalConcrete'), 'package_2'),
        renderTotalCard(totals.obras,      '',   mainUi('totalProjects'), 'verified'),
      ].join('');
    }

    var testEl = document.getElementById('cases-testimonials');
    if (testEl) {
      var withTestimonials = window.IMB_CASES.cases.filter(function (c) { return !!c.testimonial; });
      testEl.innerHTML = withTestimonials.map(renderTestimonialCard).join('');
    }
  }

  // Clients marquee — populate the track w/ two copies so translateX(-50%) loops cleanly.
  var clientsTrack = document.getElementById('clients-track');
  if (clientsTrack) {
    var CLIENTS = [
      'DNIT', 'DER-PR', 'DER-SC', 'DER-SP',
      'Prefeitura de Curitiba', 'Prefeitura de Joinville',
      'Andrade Gutierrez', 'Construcap', 'CCR', 'Ecorodovias',
      'Arteris', 'Queiroz Galvão', 'Mendes Júnior',
      'Galvão Engenharia', 'Concremat',
    ];
    var html = '';
    for (var pass = 0; pass < 2; pass++) {
      for (var i = 0; i < CLIENTS.length; i++) {
        html += '<div class="client-logo" aria-hidden="' + (pass === 1 ? 'true' : 'false') + '">'
              + CLIENTS[i] + '</div>';
      }
    }
    clientsTrack.innerHTML = html;
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // ToDo: replace with WPForms/CF7 in WordPress
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = contactForm.querySelector('[name="nome"]');
      var telefone = contactForm.querySelector('[name="telefone"]');
      var interesse = contactForm.querySelector('[name="interesse"]');
      var mensagem = contactForm.querySelector('[name="mensagem"]');

      var text = 'Olá! Meu nome é ' + (nome ? nome.value : '') + '.';
      if (interesse && interesse.value) text += ' Tenho interesse em: ' + interesse.value + '.';
      if (mensagem && mensagem.value) text += ' ' + mensagem.value;
      if (telefone && telefone.value) text += ' Meu telefone: ' + telefone.value;

      window.open(window.IMB_buildWaUrl(text), '_blank', 'noopener');
    });
  }
})();
