// Catalog grid renderer (produtos.html / products.html / productos.html).
// Builds a card per product from IMB_PRODUCTS and drops them into #catalog-grid.
(function () {
  'use strict';

  if (!window.IMB_PRODUCTS) return;
  var grid = document.getElementById('catalog-grid');
  if (!grid) return;

  function T(v) {
    if (v == null) return '';
    if (typeof v === 'object' && (v.pt || v.en || v.es)) {
      return (window.IMB_I18N && window.IMB_I18N.pickLang) ? window.IMB_I18N.pickLang(v) : (v.pt || v.en || v.es || '');
    }
    return v;
  }
  function escHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  var LANG = (window.IMB_I18N && window.IMB_I18N.lang) || 'pt';
  var UI = {
    seeDetails:    { pt: 'Ver Detalhes',   en: 'View Details',   es: 'Ver Detalles' },
    available:     { pt: 'Disponível',     en: 'Available',      es: 'Disponible' },
    powerLabel:    { pt: 'Potência',       en: 'Power',          es: 'Potencia' },
    widthLabel:    { pt: 'Largura',        en: 'Width',          es: 'Ancho' },
    weightLabel:   { pt: 'Peso',           en: 'Weight',         es: 'Peso' },
  };
  function ui(k) { var e = UI[k]; return e ? (e[LANG] || e.pt) : k; }
  function productDetailUrl(p) {
    if (window.IMB_I18N && window.IMB_I18N.productDetailUrl) return window.IMB_I18N.productDetailUrl(p.id);
    return 'produto.html?id=' + encodeURIComponent(p.id);
  }

  function fmtNumber(n) {
    if (n == null) return '';
    var locale = LANG === 'pt' ? 'pt-BR' : (LANG === 'en' ? 'en-US' : 'es-AR');
    return Number(n).toLocaleString(locale);
  }

  function card(p) {
    var detailUrl = productDetailUrl(p);
    var widthVal  = p.specs.largura_perfil != null ? fmtNumber(p.specs.largura_perfil) + ' mm' : '—';
    var powerVal  = p.specs.motor_hp != null ? p.specs.motor_hp + ' cv' : '—';
    return ''
      + '<a href="' + escHTML(detailUrl) + '" class="group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl block fade-in-up">'
      +   '<div class="relative aspect-[16/10] overflow-hidden bg-surface-container">'
      +     '<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="' + escHTML(p.image) + '" alt="' + escHTML(p.name) + '" loading="lazy" />'
      +   '</div>'
      +   '<div class="p-6 md:p-8 flex-1 flex flex-col">'
      +     '<div class="mb-4">'
      +       '<h3 class="text-xl md:text-2xl font-black tracking-tight text-on-surface mb-1 uppercase font-headline">' + escHTML(p.name) + '</h3>'
      +       '<p class="text-sm font-semibold text-on-surface-variant">' + escHTML(T(p.subtitle)) + '</p>'
      +     '</div>'
      +     '<div class="grid grid-cols-2 gap-3 mb-6">'
      +       '<div class="bg-surface-container-low p-3 rounded-lg border-b-2 border-outline-variant">'
      +         '<span class="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">' + escHTML(ui('powerLabel')) + '</span>'
      +         '<span class="text-sm font-bold text-on-surface">' + escHTML(powerVal) + '</span>'
      +       '</div>'
      +       '<div class="bg-surface-container-low p-3 rounded-lg border-b-2 border-outline-variant">'
      +         '<span class="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">' + escHTML(ui('widthLabel')) + '</span>'
      +         '<span class="text-sm font-bold text-on-surface">' + escHTML(widthVal) + '</span>'
      +       '</div>'
      +     '</div>'
      +     '<div class="mt-auto flex items-center justify-between">'
      +       '<span class="text-xs font-bold text-success flex items-center gap-1">'
      +         '<span class="material-symbols-outlined text-xs" style="font-variation-settings:\'FILL\' 1;">check_circle</span>'
      +         escHTML(ui('available'))
      +       '</span>'
      +       '<span class="bg-primary-container text-on-primary-container px-5 py-2.5 rounded font-bold text-xs uppercase tracking-widest group-hover:bg-primary group-hover:text-on-primary transition-colors flex items-center gap-2">'
      +         escHTML(ui('seeDetails'))
      +         '<span class="material-symbols-outlined text-sm">arrow_outward</span>'
      +       '</span>'
      +     '</div>'
      +   '</div>'
      + '</a>';
  }

  // Group products by linha so each line shows as a section.
  var groupsOrder = [];
  var bucket = {};
  window.IMB_PRODUCTS.products.forEach(function (p) {
    var linha = T(p.specs.linha) || 'Outros';
    if (!bucket[linha]) { bucket[linha] = []; groupsOrder.push(linha); }
    bucket[linha].push(p);
  });

  grid.innerHTML = groupsOrder.map(function (linha) {
    var cards = bucket[linha].map(card).join('');
    return ''
      + '<div class="col-span-full mt-4 mb-2 flex items-center gap-3">'
      +   '<span class="w-1.5 h-6 bg-primary"></span>'
      +   '<h2 class="text-sm font-bold text-on-surface uppercase tracking-wider font-headline">' + escHTML(linha) + '</h2>'
      + '</div>'
      + cards;
  }).join('');
})();
