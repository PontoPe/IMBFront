// produto.html — renderiza ficha técnica de produto a partir de ?id=<slug>
(function () {
  'use strict';

  if (!window.IMB_PRODUCTS) return;

  function escHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  // i18n helper
  function T(v) {
    if (v == null) return '';
    if (typeof v === 'object' && (v.pt || v.en || v.es)) {
      return (window.IMB_I18N && window.IMB_I18N.pickLang) ? window.IMB_I18N.pickLang(v) : (v.pt || v.en || v.es || '');
    }
    return v;
  }
  var LANG = (window.IMB_I18N && window.IMB_I18N.lang) || 'pt';
  var LOCALE = LANG === 'pt' ? 'pt-BR' : (LANG === 'en' ? 'en-US' : 'es-AR');
  var UI = {
    notFound:      { pt: 'Produto não encontrado', en: 'Product not found', es: 'Producto no encontrado' },
    notFoundDesc:  { pt: 'O equipamento solicitado não existe ou foi removido.', en: 'The requested equipment does not exist or has been removed.', es: 'El equipo solicitado no existe o fue removido.' },
    backCatalog:   { pt: 'Voltar ao catálogo', en: 'Back to catalog', es: 'Volver al catálogo' },
    precisionEng:  { pt: 'Engenharia de Precisão', en: 'Precision Engineering', es: 'Ingeniería de Precisión' },
    breadcrumbProd:{ pt: 'Produtos', en: 'Products', es: 'Productos' },
    pavers:        { pt: 'Pavimentadoras', en: 'Pavers', es: 'Pavimentadoras' },
    extruders:     { pt: 'Extrusoras', en: 'Extruders', es: 'Extrusoras' },
    widthLabel:    { pt: 'Largura', en: 'Width', es: 'Ancho' },
    engineLabel:   { pt: 'Motor', en: 'Engine', es: 'Motor' },
    weightLabel:   { pt: 'Peso', en: 'Weight', es: 'Peso' },
    profilesLabel: { pt: 'perfis', en: 'profiles', es: 'perfiles' },
    requestQuote:  { pt: 'Solicitar Orçamento', en: 'Request a Quote', es: 'Solicitar Cotización' },
    emailContact:  { pt: 'Contato por E-mail', en: 'Email Contact', es: 'Contacto por Email' },
    waHint:        { pt: 'Seg–Sex · 8h–18h · Resposta em ~15min', en: 'Mon–Fri · 8am–6pm · Reply in ~15min', es: 'Lun–Vie · 8h–18h · Respuesta en ~15min' },
    techSpecs:     { pt: 'Especificações Técnicas', en: 'Technical Specifications', es: 'Especificaciones Técnicas' },
    yes:           { pt: 'Sim', en: 'Yes', es: 'Sí' },
    no:            { pt: 'Não', en: 'No', es: 'No' },
    relatedProj:   { pt: 'Obras com este equipamento', en: 'Projects with this equipment', es: 'Obras con este equipo' },
    compareTitle:  { pt: 'Quer comparar com outros modelos?', en: 'Want to compare with other models?', es: '¿Quieres comparar con otros modelos?' },
    compareDesc:   { pt: 'Use nosso comparador para escolher o equipamento ideal para sua obra.', en: 'Use our comparator to choose the ideal equipment for your project.', es: 'Usa nuestro comparador para elegir el equipo ideal para tu obra.' },
    compareBtn:    { pt: 'Comparar', en: 'Compare', es: 'Comparar' },
    waSeen:        { pt: function(n,s){ return 'Olá! Tenho interesse no equipamento ' + n + ' (' + s + ').'; },
                     en: function(n,s){ return 'Hi! I\'m interested in the ' + n + ' (' + s + ').'; },
                     es: function(n,s){ return '¡Hola! Tengo interés en el equipo ' + n + ' (' + s + ').'; } },
    waQuote:       { pt: function(n,s){ return 'Olá! Gostaria de um orçamento para o equipamento ' + n + ' (' + s + ').'; },
                     en: function(n,s){ return 'Hi! I\'d like a quote for the ' + n + ' (' + s + ').'; },
                     es: function(n,s){ return '¡Hola! Quisiera una cotización para el equipo ' + n + ' (' + s + ').'; } },
    pageTitleSuffix:{pt: '— Ficha técnica IMB Brasil', en: '— IMB Brasil Data Sheet', es: '— Ficha técnica IMB Brasil' },
  };
  function ui(k) { var e = UI[k]; return e ? (e[LANG] || e.pt) : k; }

  function fmt(v, unit) {
    if (v == null || v === '') return '—';
    var s = typeof v === 'number' ? v.toLocaleString(LOCALE) : T(v);
    var u = unit ? T(unit) : '';
    return u ? s + ' ' + u : s;
  }

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || '';
  var prod = window.IMB_PRODUCTS.products.find(function (p) { return p.id === id; });
  var main = document.getElementById('produto-main');
  if (!main) return;

  if (!prod) {
    var catalogUrl = (window.IMB_I18N && window.IMB_I18N.urlFor) ? window.IMB_I18N.urlFor('produtos') : 'produtos.html';
    main.innerHTML = ''
      + '<section class="max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-32 text-center">'
      +   '<span class="material-symbols-outlined text-5xl text-on-surface-variant mb-4">search_off</span>'
      +   '<h1 class="font-headline font-black text-3xl md:text-4xl uppercase tracking-tight mb-4">' + escHtml(ui('notFound')) + '</h1>'
      +   '<p class="text-on-surface-variant mb-8">' + escHtml(ui('notFoundDesc')) + '</p>'
      +   '<a href="' + escHtml(catalogUrl) + '" class="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 rounded font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors">'
      +     '<span class="material-symbols-outlined text-sm">arrow_back</span>' + escHtml(ui('backCatalog'))
      +   '</a>'
      + '</section>';
    return;
  }

  var prodSubtitle = T(prod.subtitle);
  var prodTipo     = T(prod.specs.tipo);
  var prodAplic    = T(prod.specs.aplicacoes);
  var prodSerie    = T(prod.specs.serie);

  // SEO + WA
  document.title = prod.name + ' — ' + prodSubtitle + ' | IMB Brasil';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = prodSubtitle + '. ' + prod.name + '.';
  var metaWa = document.querySelector('meta[name="wa-default-msg"]');
  if (metaWa) metaWa.content = UI.waSeen[LANG](prod.name, prodSubtitle);

  var waMsg = UI.waQuote[LANG](prod.name, prodSubtitle);
  var isExtrusora = /extrus/i.test(prodTipo || '');
  var contatoUrl  = (window.IMB_I18N && window.IMB_I18N.urlFor) ? window.IMB_I18N.urlFor('contato') : 'contato.html';
  var produtosUrl = (window.IMB_I18N && window.IMB_I18N.urlFor) ? window.IMB_I18N.urlFor('produtos') : 'produtos.html';
  var compararUrl = (window.IMB_I18N && window.IMB_I18N.urlFor) ? window.IMB_I18N.urlFor('comparar') : 'comparar.html';
  var caseUrl     = (window.IMB_I18N && window.IMB_I18N.urlFor) ? window.IMB_I18N.urlFor('case')    : 'case.html';
  var lineUrl     = (window.IMB_I18N && window.IMB_I18N.productLineUrl) ? window.IMB_I18N.productLineUrl(prod) : (prod.url || produtosUrl);

  // ---- Hero ----
  var hero = ''
    + '<section class="relative w-full bg-surface-container-low overflow-hidden">'
    +   '<div class="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">'
    +     '<div class="lg:col-span-7 relative fade-in-up">'
    +       '<div class="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/20 rounded-full blur-3xl"></div>'
    +       '<div class="relative z-10 group">'
    +         '<img alt="' + escHtml(prod.name) + '" class="w-full aspect-[4/3] object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" src="' + escHtml(prod.image) + '" />'
    +         '<div class="absolute bottom-4 left-4 bg-on-surface/90 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2">'
    +           '<span class="material-symbols-outlined text-primary-container" style="font-variation-settings:\'FILL\' 1;">verified</span>'
    +           '<span class="text-xs font-bold tracking-widest uppercase">' + escHtml(ui('precisionEng')) + '</span>'
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +     '<div class="lg:col-span-5 space-y-6 md:space-y-8 fade-in-up">'
    +       '<div class="flex items-center gap-2 text-xs text-on-surface-variant">'
    +         '<a href="' + escHtml(produtosUrl) + '" class="hover:text-primary transition-colors">' + escHtml(ui('breadcrumbProd')) + '</a>'
    +         '<span class="material-symbols-outlined text-xs">chevron_right</span>'
    +         '<a href="' + escHtml(lineUrl) + '" class="hover:text-primary transition-colors">' + escHtml(isExtrusora ? ui('extruders') : ui('pavers')) + '</a>'
    +         '<span class="material-symbols-outlined text-xs">chevron_right</span>'
    +         '<span class="text-primary font-semibold">' + escHtml(prod.name) + '</span>'
    +       '</div>'
    +       '<div>'
    +         '<span class="text-tertiary font-bold tracking-[0.2em] uppercase text-sm">' + escHtml(prodSerie || '') + '</span>'
    +         '<h1 class="mt-2 text-4xl md:text-5xl lg:text-6xl font-black font-headline text-on-surface tracking-tighter leading-none">'
    +           escHtml(prodTipo || '') + ' <span class="text-primary-container bg-on-surface px-2">' + escHtml(prod.name) + '</span>'
    +         '</h1>'
    +         '<p class="mt-6 text-on-surface-variant text-base md:text-lg leading-relaxed max-w-md">' + escHtml(prodAplic || '') + '</p>'
    +       '</div>'
    +       '<div class="flex flex-wrap gap-3">'
    +         (prod.specs.largura_max ? '<div class="spec-chip bg-tertiary-container px-4 py-2"><span class="text-xs font-bold text-on-tertiary-container uppercase tracking-tight">' + ui('widthLabel') + ': ' + prod.specs.largura_max + 'm</span></div>' : '')
    +         (prod.specs.motor_hp ? '<div class="spec-chip bg-tertiary-container px-4 py-2"><span class="text-xs font-bold text-on-tertiary-container uppercase tracking-tight">' + ui('engineLabel') + ': ' + prod.specs.motor_hp + 'hp</span></div>' : '')
    +         (prod.specs.peso ? '<div class="spec-chip bg-tertiary-container px-4 py-2"><span class="text-xs font-bold text-on-tertiary-container uppercase tracking-tight">' + ui('weightLabel') + ': ' + prod.specs.peso.toLocaleString(LOCALE) + 'kg</span></div>' : '')
    +         (prod.specs.perfis ? '<div class="spec-chip bg-tertiary-container px-4 py-2"><span class="text-xs font-bold text-on-tertiary-container uppercase tracking-tight">' + prod.specs.perfis + ' ' + ui('profilesLabel') + '</span></div>' : '')
    +       '</div>'
    +       '<div class="flex flex-col gap-3 pt-2">'
    +         '<a href="#" class="wa-link w-full bg-primary-container hover:bg-primary text-on-primary-container font-headline font-black py-4 md:py-5 px-8 rounded-lg text-base md:text-lg uppercase tracking-wider flex justify-center items-center gap-3 transition-all" target="_blank" rel="noopener" data-wa-msg="' + escHtml(waMsg) + '">'
    +           '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;">chat</span>' + escHtml(ui('requestQuote'))
    +         '</a>'
    +         '<span class="wa-hint">' + escHtml(ui('waHint')) + '</span>'
    +         '<a href="' + escHtml(contatoUrl) + '" class="w-full border-2 border-outline-variant hover:bg-surface-container-high text-on-surface font-headline font-bold py-3 md:py-4 px-8 rounded-lg text-center uppercase tracking-widest text-sm flex justify-center items-center gap-2 transition-all">'
    +           '<span class="material-symbols-outlined">mail</span>' + escHtml(ui('emailContact'))
    +         '</a>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</section>';

  // ---- Specs (agrupadas) ----
  var fields = window.IMB_PRODUCTS.fields;
  var groups = window.IMB_PRODUCTS.groups;

  function renderField(f) {
    var v = prod.specs[f.key];
    var displayValue;
    if (f.type === 'bool') {
      displayValue = v
        ? '<span class="inline-flex items-center gap-1 text-primary font-bold"><span class="material-symbols-outlined text-base">check_circle</span>' + escHtml(ui('yes')) + '</span>'
        : '<span class="inline-flex items-center gap-1 text-on-surface-variant"><span class="material-symbols-outlined text-base">cancel</span>' + escHtml(ui('no')) + '</span>';
    } else if (v == null || v === '') {
      displayValue = '<span class="text-on-surface-variant">—</span>';
    } else {
      displayValue = '<span class="font-bold text-on-surface">' + escHtml(fmt(v, f.unit)) + '</span>';
    }
    return ''
      + '<div class="flex justify-between items-center border-b border-surface-container-high pb-3 gap-4">'
      +   '<span class="text-on-surface-variant text-sm">' + escHtml(T(f.label)) + '</span>'
      +   '<span class="text-right">' + displayValue + '</span>'
      + '</div>';
  }

  var specBlocks = groups.map(function (g) {
    var inGroup = fields.filter(function (f) { return f.group === g.id; });
    var hasAny = inGroup.some(function (f) {
      var v = prod.specs[f.key];
      return v != null && v !== '';
    });
    if (!hasAny) return '';
    var rows = inGroup.map(renderField).join('');
    return ''
      + '<div class="bg-surface-container-lowest rounded-xl p-6 md:p-8 fade-in-up">'
      +   '<h3 class="font-headline font-extrabold text-lg md:text-xl uppercase tracking-tight text-on-surface mb-6 border-l-4 border-primary-container pl-4">' + escHtml(T(g.label)) + '</h3>'
      +   '<div class="space-y-3">' + rows + '</div>'
      + '</div>';
  }).join('');

  var specsSection = ''
    + '<section class="py-16 md:py-24 bg-surface">'
    +   '<div class="max-w-7xl mx-auto px-4 md:px-8">'
    +     '<div class="mb-12 md:mb-16 fade-in-up">'
    +       '<h2 class="text-2xl md:text-3xl font-black font-headline tracking-tight uppercase border-l-8 border-primary-container pl-6">' + escHtml(ui('techSpecs')) + '</h2>'
    +     '</div>'
    +     '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">' + specBlocks + '</div>'
    +   '</div>'
    + '</section>';

  // ---- Cases relacionados ----
  var relatedCases = [];
  if (window.IMB_CASES && window.IMB_CASES.cases) {
    relatedCases = window.IMB_CASES.cases.filter(function (c) {
      return (c.equipment || []).some(function (e) { return e.id === prod.id; });
    }).slice(0, 3);
  }
  var casesBlock = '';
  if (relatedCases.length) {
    var caseCards = relatedCases.map(function (c) {
      return ''
        + '<a href="' + escHtml(caseUrl) + '?id=' + encodeURIComponent(c.id) + '" class="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-xl transition-all block">'
        +   '<div class="aspect-[16/10] overflow-hidden bg-surface-container">'
        +     '<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="' + escHtml(c.hero_image) + '" alt="' + escHtml(T(c.title)) + '" loading="lazy" />'
        +   '</div>'
        +   '<div class="p-5">'
        +     '<div class="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">' + escHtml(T(c.location)) + '</div>'
        +     '<h4 class="font-headline font-bold text-lg uppercase tracking-tight text-on-surface leading-tight">' + escHtml(T(c.title)) + '</h4>'
        +   '</div>'
        + '</a>';
    }).join('');
    casesBlock = ''
      + '<section class="py-16 md:py-20 bg-surface-container-low">'
      +   '<div class="max-w-7xl mx-auto px-4 md:px-8">'
      +     '<h2 class="font-headline font-extrabold text-2xl md:text-3xl tracking-tight mb-8 border-l-8 border-primary pl-6">' + escHtml(ui('relatedProj')) + '</h2>'
      +     '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">' + caseCards + '</div>'
      +   '</div>'
      + '</section>';
  }

  // ---- CTA + Comparar ----
  var ctaBlock = ''
    + '<section class="py-16 md:py-20 bg-surface">'
    +   '<div class="max-w-7xl mx-auto px-4 md:px-8">'
    +     '<div class="bg-primary-container/20 border border-primary-container/40 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">'
    +       '<div>'
    +         '<h3 class="font-headline font-black text-2xl md:text-3xl uppercase tracking-tight leading-tight mb-2">' + escHtml(ui('compareTitle')) + '</h3>'
    +         '<p class="text-on-surface-variant max-w-xl">' + escHtml(ui('compareDesc')) + '</p>'
    +       '</div>'
    +       '<div class="flex flex-wrap gap-3 shrink-0">'
    +         '<a href="' + escHtml(compararUrl) + '?ids=' + encodeURIComponent(prod.id) + '" class="bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-bold text-sm uppercase tracking-widest px-6 py-3 rounded transition-colors flex items-center gap-2">'
    +           '<span class="material-symbols-outlined text-sm">compare_arrows</span>' + escHtml(ui('compareBtn'))
    +         '</a>'
    +         '<a href="#" class="wa-link bg-success hover:bg-success-strong text-white font-bold text-sm uppercase tracking-widest px-6 py-3 rounded transition-colors flex items-center gap-2" data-wa-msg="' + escHtml(waMsg) + '" target="_blank" rel="noopener">'
    +           '<span class="material-symbols-outlined text-sm" style="font-variation-settings:\'FILL\' 1;">chat</span>WhatsApp'
    +         '</a>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    + '</section>';

  main.innerHTML = hero + specsSection + casesBlock + ctaBlock;
})();
