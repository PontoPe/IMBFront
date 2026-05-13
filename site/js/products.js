// IMB product catalog + comparison schema.
// Translatable fields use {pt, en, es} objects. Use IMB_I18N.pickLang(obj) at render time.
window.IMB_PRODUCTS = (function () {
  'use strict';

  // Shorthand: build a multi-lang string.
  function L(pt, en, es) { return { pt: pt, en: en, es: es }; }

  const groups = [
    { id: 'app',   label: L('Categoria & Aplicação',  'Category & Application',    'Categoría y Aplicación') },
    { id: 'dim',   label: L('Dimensões & Capacidade', 'Dimensions & Capacity',     'Dimensiones y Capacidad') },
    { id: 'motor', label: L('Motor & Energia',        'Engine & Power',            'Motor y Energía') },
    { id: 'perf',  label: L('Performance',            'Performance',               'Rendimiento') },
    { id: 'tech',  label: L('Tecnologia & Recursos',  'Technology & Features',     'Tecnología y Funciones') },
  ];

  const fields = [
    { key: 'tipo',         label: L('Tipo de Equipamento',       'Equipment Type',           'Tipo de Equipo'),         type: 'text',   group: 'app' },
    { key: 'aplicacoes',   label: L('Aplicações Típicas',        'Typical Applications',     'Aplicaciones Típicas'),   type: 'text',   group: 'app' },
    { key: 'serie',        label: L('Série',                     'Series',                   'Serie'),                  type: 'text',   group: 'app' },

    { key: 'largura_max',  label: L('Largura Máx. Pavimentação', 'Max. Paving Width',        'Ancho Máx. Pavimentación'), type: 'bar', unit: 'm',  group: 'dim' },
    { key: 'largura_min',  label: L('Largura Mín. Pavimentação', 'Min. Paving Width',        'Ancho Mín. Pavimentación'), type: 'bar', unit: 'm',  group: 'dim' },
    { key: 'peso',         label: L('Peso Operacional',          'Operating Weight',         'Peso Operacional'),       type: 'bar',    unit: 'kg', group: 'dim' },
    { key: 'silo',         label: L('Capacidade do Silo',        'Hopper Capacity',          'Capacidad de Tolva'),     type: 'bar',    unit: 'm³', group: 'dim' },
    { key: 'comprimento',  label: L('Comprimento de Transporte', 'Transport Length',         'Longitud de Transporte'), type: 'number', unit: 'mm', group: 'dim' },

    { key: 'motor_modelo', label: L('Modelo do Motor',           'Engine Model',             'Modelo de Motor'),        type: 'text',   group: 'motor' },
    { key: 'motor_hp',     label: L('Potência',                  'Power',                    'Potencia'),               type: 'bar',    unit: 'hp', group: 'motor' },
    { key: 'norma_emissao',label: L('Norma de Emissão',          'Emission Standard',        'Norma de Emisión'),       type: 'text',   group: 'motor' },

    { key: 'velocidade',   label: L('Velocidade Máx. Operação',  'Max. Operating Speed',     'Velocidad Máx. Operación'), type: 'bar', unit: 'm/min', group: 'perf' },
    { key: 'vibradores',   label: L('Vibradores Hidráulicos',    'Hydraulic Vibrators',      'Vibradores Hidráulicos'), type: 'number', unit: L('un','units','un'), group: 'perf' },
    { key: 'esteiras',     label: L('Esteiras de Direção',       'Steering Tracks',          'Orugas de Dirección'),    type: 'number', unit: L('un','units','un'), group: 'perf' },
    { key: 'perfis',       label: L('Perfis Disponíveis',        'Available Profiles',       'Perfiles Disponibles'),   type: 'number', unit: L('modelos','models','modelos'), group: 'perf' },

    { key: 'sensor_laser', label: L('Sensor Laser de Alinhamento','Laser Alignment Sensor',  'Sensor Láser de Alineación'), type: 'bool', group: 'tech' },
    { key: 'icontrol',     label: L('Sistema i-Control',         'i-Control System',         'Sistema i-Control'),      type: 'bool', group: 'tech' },
    { key: 'eco_mode',     label: L('Eco-Mode',                  'Eco-Mode',                 'Eco-Mode'),               type: 'bool', group: 'tech' },
    { key: 'troca_rapida', label: L('Troca Rápida de Molde',     'Quick Mold Change',        'Cambio Rápido de Molde'), type: 'bool', group: 'tech' },
    { key: 'direcao_auto', label: L('Direção Automatizada',      'Automated Steering',       'Dirección Automatizada'), type: 'bool', group: 'tech' },
    { key: 'controle_remoto', label: L('Controle Remoto',        'Remote Control',           'Control Remoto'),         type: 'bool', group: 'tech' },
  ];

  const products = [
    {
      id: 'imb-7300',
      name: 'IMB-7300',
      subtitle: L('Pavimentadora — Série Industrial', 'Paver — Industrial Series', 'Pavimentadora — Serie Industrial'),
      url: 'pavimentadora.html',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCazj80UbPQR9R9GCudjFBfDDOWQJ6YxniMFaEewO44eMWCrs7Xn-zznluWLPijFzgBiDAVoEHgjNAgV5AZgqds2iQ9bv3jW5q01p9QvkBjpoxXEAlfzs_7PSf7COs7IUEK5z0NxqiUtBX7JC0fZXwNgVJ3tZf9pCypmnfm-2lFB__dxm4Yac3Uig9DiNZ1upp3PuEyw3i1JZNlOrOknY8ib3aHQdh3V4rL-A_h52cZPySQQhe90nxhq1WP3dp2IrLtuu9nNFb6b_JI',
      accent: 'primary',
      specs: {
        tipo:        L('Pavimentadora de Concreto', 'Concrete Paver', 'Pavimentadora de Concreto'),
        aplicacoes:  L('Rodovias, aeroportos, grandes superfícies', 'Highways, airports, large surfaces', 'Carreteras, aeropuertos, grandes superficies'),
        serie:       L('Industrial', 'Industrial', 'Industrial'),
        largura_max: 7.5, largura_min: 3.0,
        peso: 18500, silo: 5.5, comprimento: 9200,
        motor_modelo: 'Cummins QSB 6.7', motor_hp: 250,
        norma_emissao: L('Stage IV / Tier 4 Final', 'Stage IV / Tier 4 Final', 'Stage IV / Tier 4 Final'),
        velocidade: 15, vibradores: 16, esteiras: 4, perfis: null,
        sensor_laser: true, icontrol: false, eco_mode: false,
        troca_rapida: false, direcao_auto: true, controle_remoto: false,
      },
    },
    {
      id: 'imb-1200-evolution',
      name: 'IMB-1200 Evolution',
      subtitle: L('Pavimentadora — Série Profissional', 'Paver — Professional Series', 'Pavimentadora — Serie Profesional'),
      url: 'pavimentadora.html',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBiHR_gNYr94xgDAkMoxOmaUot-rCbyRLBlytge-PAy_BRiq4W4GOUKW-q6QX_LZOCOYpf-e1uoMIRcgiSpOnj0F-gpRr61h2knWces76T7UYeCCJDtysFt_bLDAuRGuN85WQnk26jDPQEOF_3V_vIYRbyisPpHE76ukRiziKN_6eYtiob-vpJ19nU5evbNzzEzsCEg2-iACFxDn9jhQVTmeG_oQ-rAZlTxGnHUyk4VN_VrJy3ZHaGkpNjv3RU603O46qk3pU0-hk0',
      accent: 'primary',
      specs: {
        tipo:        L('Pavimentadora de Concreto', 'Concrete Paver', 'Pavimentadora de Concreto'),
        aplicacoes:  L('Vias urbanas, aeroportos, projetos médios', 'Urban roads, airports, mid-size projects', 'Vías urbanas, aeropuertos, proyectos medianos'),
        serie:       L('Profissional', 'Professional', 'Profesional'),
        largura_max: 4.5, largura_min: 1.2,
        peso: 12500, silo: 4.0, comprimento: 7800,
        motor_modelo: 'Cummins QSB 4.5', motor_hp: 173,
        norma_emissao: L('Stage IV / Tier 4 Final', 'Stage IV / Tier 4 Final', 'Stage IV / Tier 4 Final'),
        velocidade: 15, vibradores: 12, esteiras: 4, perfis: null,
        sensor_laser: true, icontrol: true, eco_mode: true,
        troca_rapida: false, direcao_auto: true, controle_remoto: true,
      },
    },
    {
      id: 'imb-800-master',
      name: 'IMB-800 Master',
      subtitle: L('Pavimentadora — Eficiência Compacta', 'Paver — Compact Efficiency', 'Pavimentadora — Eficiencia Compacta'),
      url: 'pavimentadora.html',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Pp8KVJw7n6c3S24oqhMeaBWm1o4Ij3YAdVGi6juX63TvVimzzTLL5nXgHZTc-v-OZbTSqnubNacQsphyGH-zdEF4GfNBHDoi4H8bMQ3fDeeDkdyJUfYFOQRSXLou4frRGUpxEhPC5guxaX7kOS5hlB8iGJTfQslTUY2B8zP1-2jrCFLcbijDVCKOev3E7QQH93ebbO30BZQToDLdvCy7NP2TtN1Mtz4lz6X5nRBGg1uOB-j8suUTgSherACYnB0JBnvTZ3hspxeQ',
      accent: 'primary',
      specs: {
        tipo:        L('Pavimentadora de Concreto', 'Concrete Paver', 'Pavimentadora de Concreto'),
        aplicacoes:  L('Obras urbanas, ruas e áreas restritas', 'Urban works, streets and restricted areas', 'Obras urbanas, calles y áreas restringidas'),
        serie:       L('Compacta', 'Compact', 'Compacta'),
        largura_max: 2.5, largura_min: 0.8,
        peso: 6800, silo: 2.0, comprimento: 5400,
        motor_modelo: 'Kubota V3800 Turbo Diesel', motor_hp: 110,
        norma_emissao: L('Stage IIIA / Tier 3', 'Stage IIIA / Tier 3', 'Stage IIIA / Tier 3'),
        velocidade: 10, vibradores: 6, esteiras: 4, perfis: null,
        sensor_laser: false, icontrol: false, eco_mode: true,
        troca_rapida: false, direcao_auto: false, controle_remoto: false,
      },
    },
    {
      id: 'imb-ultra-500',
      name: 'IMB-ULTRA 500',
      subtitle: L('Extrusora — Alta Performance', 'Extruder — High Performance', 'Extrusora — Alto Rendimiento'),
      url: 'extrusora.html',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUE3nwYdkpehDIG3xReuYMn_MRYrG2e3YuRFZ9F5qaY7dR0JS3Jp2IeieUD0Y-fnsx0AR59vxfORjt4wQ5UJDBfy51GMghek1-CXgFOO_BxiYj2UP8DWS18aqJpBKiNTuZgf2tirsebSxvm6LY5QNIBrUk1lUJKNvbaM5-oOLeK3PKz7vKLlxqrcpk2Mj-7YLvTN0sUpyJlVzRrEneQ42K0Xu96Ruao5wwWGI7jEBfeaEaJWNKw1z2o_RIv9L4Gh_0R5g7qNJV5POn',
      accent: 'tertiary',
      specs: {
        tipo:        L('Extrusora de Concreto', 'Concrete Extruder', 'Extrusora de Concreto'),
        aplicacoes:  L('Meios-fios, sarjetas, muretas New Jersey, calçadas', 'Curbs, gutters, New Jersey barriers, sidewalks', 'Cordones, cunetas, barreras New Jersey, veredas'),
        serie:       L('Alta Performance', 'High Performance', 'Alto Rendimiento'),
        largura_max: null, largura_min: null,
        peso: 4200, silo: null, comprimento: 4800,
        motor_modelo: 'Kubota V3307', motor_hp: 85,
        norma_emissao: L('Stage V', 'Stage V', 'Stage V'),
        velocidade: 8, vibradores: null, esteiras: null, perfis: 15,
        sensor_laser: true, icontrol: true, eco_mode: true,
        troca_rapida: true, direcao_auto: true, controle_remoto: true,
      },
    },
    {
      id: 'imb-5000-curb',
      name: 'IMB-5000',
      subtitle: L('Extrusora de Meio-Fio', 'Curb Extruder', 'Extrusora de Cordón'),
      url: 'extrusora.html',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUzsvM8JpwadJn5PuVvng8CP2bfaW73JNOnwPOtPbdpcs82R3sBKFBOiADVEsKDBIzV1JbBtr5vJOf6PY-25f9ln2wY2j3yyXtnY-bBLYVrdSJb8d0Pr-h38OHrYcrbtA6deyFMn3bvcJQynOIjgayhzfL-3wCNqdzv0XMpaDftXUwMY9K2bflRY5gZZPnoHw2Zupy65_WDiXqNQifwwRVrVSGj81z1F2SQWEz1yJFLzCzmgIJjFfUJNOgR87U1k9O8n-eQN1t6xA5',
      accent: 'tertiary',
      specs: {
        tipo:        L('Extrusora de Concreto', 'Concrete Extruder', 'Extrusora de Concreto'),
        aplicacoes:  L('Meios-fios e sarjetas em obras urbanas', 'Curbs and gutters on urban projects', 'Cordones y cunetas en obras urbanas'),
        serie:       L('Versátil', 'Versatile', 'Versátil'),
        largura_max: null, largura_min: null,
        peso: 3100, silo: null, comprimento: 4200,
        motor_modelo: 'Kubota V2403', motor_hp: 55,
        norma_emissao: L('Stage IIIA / Tier 3', 'Stage IIIA / Tier 3', 'Stage IIIA / Tier 3'),
        velocidade: 6, vibradores: null, esteiras: null, perfis: 8,
        sensor_laser: false, icontrol: false, eco_mode: false,
        troca_rapida: true, direcao_auto: false, controle_remoto: false,
      },
    },
  ];

  return { groups, fields, products };
})();
