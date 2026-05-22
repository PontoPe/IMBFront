// Catalog grid renderer (produtos.html / products.html / productos.html).
// Builds cards from IMB_PRODUCTS, then applies client-side filtering and sorting.
(function () {
  'use strict';

  if (!window.IMB_PRODUCTS) return;
  var grid = document.getElementById('catalog-grid');
  if (!grid) return;

  var products = window.IMB_PRODUCTS.products || [];
  var controls = document.getElementById('catalog-controls');
  var LANG = (window.IMB_I18N && window.IMB_I18N.lang) || 'pt';
  var state = { type: 'all', line: 'all', capability: 'all', profileType: 'all', sort: 'recommended', query: '' };

  var UI = {
    title:            { pt: 'Filtros',                    en: 'Filters',                es: 'Filtros' },
    search:           { pt: 'Busca',                      en: 'Search',                 es: 'Búsqueda' },
    searchPh:         { pt: 'Modelo, aplicação ou linha', en: 'Model, application or line', es: 'Modelo, aplicación o línea' },
    category:         { pt: 'Categoria',                  en: 'Category',               es: 'Categoría' },
    all:              { pt: 'Todos',                      en: 'All',                    es: 'Todos' },
    pavers:           { pt: 'Pavimentadoras',             en: 'Pavers',                 es: 'Pavimentadoras' },
    extruders:        { pt: 'Extrusoras',                 en: 'Extruders',              es: 'Extrusoras' },
    automated:        { pt: 'Automatizada',               en: 'Automated',              es: 'Automatizada' },
    line:             { pt: 'Linha',                      en: 'Line',                   es: 'Línea' },
    anyLine:          { pt: 'Todas as linhas',            en: 'All lines',              es: 'Todas las líneas' },
    capability:       { pt: 'Recurso',                    en: 'Feature',                es: 'Recurso' },
    allFeatures:      { pt: 'Todos os recursos',          en: 'All features',           es: 'Todos los recursos' },
    featureAutomated: { pt: 'Automação / sensores',       en: 'Automation / sensors',   es: 'Automatización / sensores' },
    featureVibrator:  { pt: 'Vibrador Hidráulico',        en: 'Hydraulic Vibrator',     es: 'Vibrador Hidráulico' },
    feature3d:        { pt: 'Monitoramento 3D',           en: '3D Monitoring',          es: 'Monitoreo 3D' },
    featureClutch:    { pt: 'Embreagem',                  en: 'Clutch',                 es: 'Embrague' },
    profileType:      { pt: 'Tipo de Perfil',             en: 'Profile Type',           es: 'Tipo de Perfil' },
    allProfiles:      { pt: 'Todos os tipos',             en: 'All types',              es: 'Todos los tipos' },
    profileMeioFio:   { pt: 'Meio-fio',                   en: 'Curb',                   es: 'Cordón' },
    profileGuia:      { pt: 'Guia e Sarjeta',             en: 'Guide & Gutter',         es: 'Guía y Cuneta' },
    profileCalcada:   { pt: 'Calçada',                    en: 'Sidewalk',               es: 'Vereda' },
    profileCanaleta:  { pt: 'Canaleta de Drenagem',       en: 'Drainage Channel',       es: 'Canal de Drenaje' },
    profileBarreira:  { pt: 'Barreira New Jersey',        en: 'New Jersey Barrier',     es: 'Barrera New Jersey' },
    profilePavimento: { pt: 'Pavimento de Concreto',      en: 'Concrete Pavement',      es: 'Pavimento de Concreto' },
    sort:             { pt: 'Ordenar por',                en: 'Sort by',                es: 'Ordenar por' },
    recommended:      { pt: 'Recomendados',               en: 'Recommended',            es: 'Recomendados' },
    powerDesc:        { pt: 'Maior potência',             en: 'Highest power',          es: 'Mayor potencia' },
    widthDesc:        { pt: 'Maior perfil',               en: 'Widest profile',         es: 'Mayor perfil' },
    weightAsc:        { pt: 'Mais leves',                 en: 'Lightest',               es: 'Más livianos' },
    nameAsc:          { pt: 'Nome A-Z',                   en: 'Name A-Z',               es: 'Nombre A-Z' },
    seeDetails:       { pt: 'Ver Detalhes',               en: 'View Details',           es: 'Ver Detalles' },
    powerLabel:       { pt: 'Potência',                   en: 'Power',                  es: 'Potencia' },
    widthLabel:       { pt: 'Largura Máx.',               en: 'Max. Width',             es: 'Ancho Máx.' },
    resultOne:        { pt: '1 equipamento',              en: '1 machine',              es: '1 equipo' },
    resultsMany:      { pt: 'equipamentos',               en: 'machines',               es: 'equipos' },
    noResults:        { pt: 'Nenhum equipamento encontrado com estes filtros.', en: 'No machines found with these filters.', es: 'No se encontraron equipos con estos filtros.' },
  };

  function ui(k) {
    var e = UI[k];
    return e ? (e[LANG] || e.pt) : k;
  }

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

  function normalText(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function productDetailUrl(p) {
    if (window.IMB_I18N && window.IMB_I18N.productDetailUrl) return window.IMB_I18N.productDetailUrl(p.id);
    return 'produto.html?id=' + encodeURIComponent(p.id);
  }

  function fmtNumber(n) {
    if (n == null || Number.isNaN(Number(n))) return '';
    var locale = LANG === 'pt' ? 'pt-BR' : (LANG === 'en' ? 'en-US' : 'es-AR');
    return Number(n).toLocaleString(locale);
  }

  function kindOf(p) {
    var tipo = normalText((p.specs.tipo && p.specs.tipo.pt) || T(p.specs.tipo));
    if (tipo.indexOf('pavimentadora') !== -1) return 'paver';
    if (tipo.indexOf('extrusora') !== -1) return 'extruder';
    return 'other';
  }

  function isAutomatedLine(p) {
    var linhaObj = p.specs.linha;
    var linhaKey = linhaObj && typeof linhaObj === 'object' ? linhaObj.pt : T(linhaObj);
    return linhaKey === 'Hidráulica' || linhaKey === 'Automatizada';
  }

  function hasCapability(p, capability) {
    if (capability === 'all') return true;
    if (capability === 'automated') return Boolean(p.specs.direcao_auto || p.specs.sensores_auto);
    if (capability === 'hydraulic-vibrator') return Boolean(p.specs.vibradores);
    if (capability === '3d-monitoring') return Boolean(p.specs.monitoramento_3d);
    if (capability === 'clutch') return Boolean(p.specs.embreagem);
    return true;
  }

  function searchableText(p) {
    return normalText([
      p.name,
      T(p.subtitle),
      T(p.specs.tipo),
      T(p.specs.linha),
      T(p.specs.aplicacoes),
      p.specs.motor_tipo,
    ].join(' '));
  }

  function productMatches(p) {
    if (state.type === 'automated-line') {
      if (!isAutomatedLine(p)) return false;
    } else if (state.type !== 'all' && kindOf(p) !== state.type) {
      return false;
    }
    if (state.line !== 'all' && T(p.specs.linha) !== state.line) return false;
    if (!hasCapability(p, state.capability)) return false;
    if (state.profileType !== 'all') {
      var types = p.profile_types || [];
      if (types.indexOf(state.profileType) === -1) return false;
    }
    if (state.query && searchableText(p).indexOf(normalText(state.query)) === -1) return false;
    return true;
  }

  function sortValue(p, key, fallback) {
    var n = Number(p.specs[key]);
    return Number.isFinite(n) ? n : fallback;
  }

  function sortProducts(list) {
    return list.slice().sort(function (a, b) {
      if (state.sort === 'power-desc') return sortValue(b.p, 'motor_hp', -1) - sortValue(a.p, 'motor_hp', -1) || a.index - b.index;
      if (state.sort === 'width-desc') return sortValue(b.p, 'largura_perfil', -1) - sortValue(a.p, 'largura_perfil', -1) || a.index - b.index;
      if (state.sort === 'weight-asc') return sortValue(a.p, 'peso', 999999) - sortValue(b.p, 'peso', 999999) || a.index - b.index;
      if (state.sort === 'name-asc') return a.p.name.localeCompare(b.p.name) || a.index - b.index;
      return a.index - b.index;
    });
  }

  function uniqueLines() {
    var seen = {};
    return products.reduce(function (acc, p) {
      var line = T(p.specs.linha);
      if (line && !seen[line]) {
        seen[line] = true;
        acc.push(line);
      }
      return acc;
    }, []);
  }

  function renderControls() {
    if (!controls) return;
    var lineOptions = uniqueLines().map(function (line) {
      return '<option value="' + escHTML(line) + '">' + escHTML(line) + '</option>';
    }).join('');

    controls.innerHTML = ''
      + '<h3 class="text-sm font-bold text-on-surface uppercase tracking-wider mb-6 flex items-center gap-2 font-headline"><span class="w-1.5 h-6 bg-primary"></span>' + escHTML(ui('title')) + '</h3>'
      + '<div class="catalog-control-stack">'
      +   '<div><label class="catalog-control-label" for="catalog-search">' + escHTML(ui('search')) + '</label><input id="catalog-search" class="catalog-search" type="search" autocomplete="off" placeholder="' + escHTML(ui('searchPh')) + '" /></div>'
      +   '<div><span class="catalog-control-label">' + escHTML(ui('category')) + '</span><div class="catalog-filter-row" role="group" aria-label="' + escHTML(ui('category')) + '">'
      +     '<button type="button" class="catalog-filter-button" data-catalog-type="all">' + escHTML(ui('all')) + '</button>'
      +     '<button type="button" class="catalog-filter-button" data-catalog-type="paver">' + escHTML(ui('pavers')) + '</button>'
      +     '<button type="button" class="catalog-filter-button" data-catalog-type="extruder">' + escHTML(ui('extruders')) + '</button>'
      +     '<button type="button" class="catalog-filter-button" data-catalog-type="automated-line">' + escHTML(ui('automated')) + '</button>'
      +   '</div></div>'
      +   '<div><label class="catalog-control-label" for="catalog-line">' + escHTML(ui('line')) + '</label><select id="catalog-line" class="catalog-select"><option value="all">' + escHTML(ui('anyLine')) + '</option>' + lineOptions + '</select></div>'
      +   '<div><label class="catalog-control-label" for="catalog-profile-type">' + escHTML(ui('profileType')) + '</label><select id="catalog-profile-type" class="catalog-select">'
      +     '<option value="all">' + escHTML(ui('allProfiles')) + '</option>'
      +     '<option value="meio-fio">' + escHTML(ui('profileMeioFio')) + '</option>'
      +     '<option value="guia-sarjeta">' + escHTML(ui('profileGuia')) + '</option>'
      +     '<option value="calcada">' + escHTML(ui('profileCalcada')) + '</option>'
      +     '<option value="canaleta-drenagem">' + escHTML(ui('profileCanaleta')) + '</option>'
      +     '<option value="barreira-new-jersey">' + escHTML(ui('profileBarreira')) + '</option>'
      +     '<option value="pavimento-concreto">' + escHTML(ui('profilePavimento')) + '</option>'
      +   '</select></div>'
      +   '<div><label class="catalog-control-label" for="catalog-capability">' + escHTML(ui('capability')) + '</label><select id="catalog-capability" class="catalog-select">'
      +     '<option value="all">' + escHTML(ui('allFeatures')) + '</option>'
      +     '<option value="automated">' + escHTML(ui('featureAutomated')) + '</option>'
      +     '<option value="hydraulic-vibrator">' + escHTML(ui('featureVibrator')) + '</option>'
      +     '<option value="3d-monitoring">' + escHTML(ui('feature3d')) + '</option>'
      +     '<option value="clutch">' + escHTML(ui('featureClutch')) + '</option>'
      +   '</select></div>'
      +   '<div><label class="catalog-control-label" for="catalog-sort">' + escHTML(ui('sort')) + '</label><select id="catalog-sort" class="catalog-select">'
      +     '<option value="recommended">' + escHTML(ui('recommended')) + '</option>'
      +     '<option value="power-desc">' + escHTML(ui('powerDesc')) + '</option>'
      +     '<option value="width-desc">' + escHTML(ui('widthDesc')) + '</option>'
      +     '<option value="weight-asc">' + escHTML(ui('weightAsc')) + '</option>'
      +     '<option value="name-asc">' + escHTML(ui('nameAsc')) + '</option>'
      +   '</select></div>'
      +   '<div id="catalog-results-count" class="catalog-result-summary"></div>'
      + '</div>';
  }

  function syncControls(count) {
    if (!controls) return;
    controls.querySelectorAll('[data-catalog-type]').forEach(function (button) {
      var active = button.getAttribute('data-catalog-type') === state.type;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    var line = controls.querySelector('#catalog-line');
    var profileTypeEl = controls.querySelector('#catalog-profile-type');
    var capability = controls.querySelector('#catalog-capability');
    var sort = controls.querySelector('#catalog-sort');
    var search = controls.querySelector('#catalog-search');
    var countEl = controls.querySelector('#catalog-results-count');
    if (line) line.value = state.line;
    if (profileTypeEl) profileTypeEl.value = state.profileType;
    if (capability) capability.value = state.capability;
    if (sort) sort.value = state.sort;
    if (search && search.value !== state.query) search.value = state.query;
    if (countEl) countEl.textContent = count === 1 ? ui('resultOne') : count + ' ' + ui('resultsMany');
  }

  function card(p) {
    var detailUrl = productDetailUrl(p);
    var widthVal = p.specs.largura_perfil != null ? fmtNumber(p.specs.largura_perfil) + ' mm' : '-';
    var powerVal = p.specs.motor_hp != null ? p.specs.motor_hp + ' cv' : '-';
    return ''
      + '<a href="' + escHTML(detailUrl) + '" class="group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl block fade-in-up is-visible">'
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
      +     '<div class="mt-auto flex justify-end">'
      +       '<span class="bg-primary-container text-on-primary-container px-5 py-2.5 rounded font-bold text-xs uppercase tracking-widest group-hover:bg-primary group-hover:text-on-primary transition-colors flex items-center gap-2">'
      +         escHTML(ui('seeDetails'))
      +         '<span class="material-symbols-outlined text-sm">arrow_outward</span>'
      +       '</span>'
      +     '</div>'
      +   '</div>'
      + '</a>';
  }

  function render() {
    var filtered = sortProducts(products.map(function (p, index) {
      return { p: p, index: index };
    }).filter(function (item) {
      return productMatches(item.p);
    }));

    syncControls(filtered.length);
    if (!filtered.length) {
      grid.innerHTML = '<div class="col-span-full catalog-empty">' + escHTML(ui('noResults')) + '</div>';
      return;
    }
    grid.innerHTML = filtered.map(function (item) { return card(item.p); }).join('');
  }

  function bindControls() {
    if (!controls) return;
    controls.addEventListener('click', function (event) {
      var button = event.target.closest('[data-catalog-type]');
      if (!button || !controls.contains(button)) return;
      state.type = button.getAttribute('data-catalog-type') || 'all';
      render();
    });
    controls.addEventListener('input', function (event) {
      if (event.target && event.target.id === 'catalog-search') {
        state.query = event.target.value || '';
        render();
      }
    });
    controls.addEventListener('change', function (event) {
      if (!event.target) return;
      if (event.target.id === 'catalog-line') state.line = event.target.value || 'all';
      if (event.target.id === 'catalog-profile-type') state.profileType = event.target.value || 'all';
      if (event.target.id === 'catalog-capability') state.capability = event.target.value || 'all';
      if (event.target.id === 'catalog-sort') state.sort = event.target.value || 'recommended';
      render();
    });
  }

  renderControls();
  bindControls();
  render();
})();
