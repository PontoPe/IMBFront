// IMB cases — fonte única de verdade.
// Translatable fields use {pt, en, es} objects. Use IMB_I18N.pickLang(obj) at render time.
window.IMB_CASES = (function () {
  'use strict';

  function L(pt, en, es) { return { pt: pt, en: en, es: es }; }

  const cases = [
    {
      id: 'guaratuba',
      title: L('Ponte de Guaratuba', 'Guaratuba Bridge', 'Puente de Guaratuba'),
      subtitle: L('Maior ponte estaiada do Sul do Brasil', 'Largest cable-stayed bridge in Southern Brazil', 'Mayor puente atirantado del Sur de Brasil'),
      location: L('Guaratuba, PR — Brasil', 'Guaratuba, PR — Brazil', 'Guaratuba, PR — Brasil'),
      region: L('Sul', 'South', 'Sur'),
      year: '2023 — 2025',
      status: L('Em execução', 'In progress', 'En ejecución'),
      featured: true,
      highlight: L('Em destaque', 'Featured', 'Destacado'),
      client: L('Consórcio Construtor Ponte de Guaratuba', 'Guaratuba Bridge Construction Consortium', 'Consorcio Constructor Puente de Guaratuba'),
      hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwwJcyx5gT9i4Ojc0t3hJ1aGFUwme5uG7fR2nATLD5BfjNI5TrVR94Fxd3EFedPpIh5A62_JZ4XmPAnD58zj33YGLBwHnkgDk_HlpPbSJpAmX0NfvNGsHKqcbAvPkoJ_ztr6L-OEcC7LssEz01-CvpqdXT-um1sOEIxiZ2iuZEIfhHmbj_3TqnFERnTfLx0NTCZVNVkq2WE1zhH_74Grl1vxFVSopcWqXZOuVbWfJentUobw1Jkc-BlB_XpS4R2oVUWftyRCAyG2l5',
      summary: L(
        'Pavimentação dos acessos rodoviários e barreiras New Jersey contínuas para o complexo viário da maior ponte estaiada do Sul do Brasil.',
        'Highway access paving and continuous New Jersey barriers for the road complex of Southern Brazil\'s largest cable-stayed bridge.',
        'Pavimentación de los accesos viales y barreras New Jersey continuas para el complejo vial del mayor puente atirantado del Sur de Brasil.'
      ),
      story: [
        L(
          'O complexo viário da Ponte de Guaratuba conecta o litoral sul do Paraná ao Norte de Santa Catarina, eliminando o gargalo da travessia por balsa que atendia mais de 4 milhões de passageiros por ano.',
          'The Guaratuba Bridge road complex connects southern Paraná\'s coast to northern Santa Catarina, eliminating the ferry crossing bottleneck that served more than 4 million passengers per year.',
          'El complejo vial del Puente de Guaratuba conecta la costa sur de Paraná con el norte de Santa Catarina, eliminando el cuello de botella del cruce en barcaza que atendía a más de 4 millones de pasajeros por año.'
        ),
        L(
          'A IMB Brasil foi escolhida pelo consórcio construtor para executar a pavimentação rígida dos 7,2 km de acessos rodoviários, além das barreiras de proteção tipo New Jersey extrudadas em concreto contínuo nos dois sentidos da via.',
          'IMB Brasil was chosen by the construction consortium to execute the rigid paving of the 7.2 km of highway access, plus the New Jersey-type protective barriers extruded in continuous concrete in both directions.',
          'IMB Brasil fue elegida por el consorcio constructor para ejecutar la pavimentación rígida de los 7,2 km de accesos viales, además de las barreras de protección tipo New Jersey extruidas en concreto continuo en ambos sentidos.'
        ),
        L(
          'Os equipamentos IMB-7300 e IMB-ULTRA 500 trabalharam em paralelo, garantindo o cumprimento do cronograma agressivo mesmo com as condições atípicas do clima litorâneo.',
          'IMB-7300 and IMB-ULTRA 500 units worked in parallel, ensuring the aggressive schedule was met despite the atypical coastal climate conditions.',
          'Los equipos IMB-7300 e IMB-ULTRA 500 trabajaron en paralelo, garantizando el cumplimiento del cronograma agresivo aún con las condiciones atípicas del clima costero.'
        ),
      ],
      metrics: [
        { icon: 'route',     label: L('Pavimentação rígida', 'Rigid paving',         'Pavimentación rígida'),  value: '7.2',    unit: 'km' },
        { icon: 'security',  label: L('Barreira New Jersey', 'New Jersey barrier',   'Barrera New Jersey'),    value: '14.4',   unit: 'km' },
        { icon: 'package_2', label: L('Concreto aplicado',   'Concrete poured',      'Concreto aplicado'),     value: '38.500', unit: 'm³' },
        { icon: 'schedule',  label: L('Prazo cumprido',      'Schedule met',         'Plazo cumplido'),        value: '18',     unit: L('meses','months','meses') },
      ],
      equipment: [
        { id: 'imb-7300',      name: L('Pavimentadora IMB-7300',     'IMB-7300 Paver',              'Pavimentadora IMB-7300') },
        { id: 'imb-ultra-500', name: L('Extrusora IMB-ULTRA 500',    'IMB-ULTRA 500 Extruder',      'Extrusora IMB-ULTRA 500') },
      ],
      testimonial: {
        quote: L(
          'A precisão das pavimentadoras IMB foi decisiva para entregarmos a obra no prazo, mesmo com o cronograma apertado e o clima litorâneo desafiador.',
          'IMB pavers\' precision was decisive in delivering the project on time, even with the tight schedule and challenging coastal climate.',
          'La precisión de las pavimentadoras IMB fue decisiva para entregar la obra a tiempo, incluso con el cronograma ajustado y el clima costero desafiante.'
        ),
        author: 'Eng. Marcelo Fontana',
        role: L('Gerente de Obra', 'Site Manager', 'Gerente de Obra'),
        company: L('Consórcio Ponte de Guaratuba', 'Guaratuba Bridge Consortium', 'Consorcio Puente de Guaratuba'),
      },
    },
    {
      id: 'linha-verde-curitiba',
      title: L('Linha Verde / Av. Brasil', 'Green Line / Av. Brasil', 'Línea Verde / Av. Brasil'),
      subtitle: L('Eixo estruturante do BRT de Curitiba', 'Structuring axis of the Curitiba BRT', 'Eje estructurante del BRT de Curitiba'),
      location: L('Curitiba, PR — Brasil', 'Curitiba, PR — Brazil', 'Curitiba, PR — Brasil'),
      region: L('Sul', 'South', 'Sur'),
      year: '2019 — 2022',
      status: L('Concluída', 'Completed', 'Concluida'),
      featured: false,
      client: L('Prefeitura Municipal de Curitiba', 'Curitiba City Hall', 'Municipalidad de Curitiba'),
      hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALs8apXLBfQ6bVyJmFGZmVi7Zd7WRJNbjmz5pJOTsMJgRjW81KifXAdS4IpmwjJd-8OADO9cKgUBQy1rfqp9zBOhvZJPl4c86tv-UbGtkZa6xGzr3yi_lUAsPGXEdFteqZmnooc9OMHslkidW3qQl-n7migyB77eoBzjmSz8JXh0utwSgxWnW1BGUbddjzITyF9sSa0XBkv5ERBG8QVSYrPKrmCpvZ1VbQyI8qyto7nT-e36c2jnwDnJjS9CeP91Dzwfj3Z2jI2vrw',
      summary: L(
        'Canaletas de BRT, meios-fios e sarjetas em mais de 18 km de eixo urbano estruturante.',
        'BRT lanes, curbs and gutters across more than 18 km of structuring urban axis.',
        'Canaletas de BRT, cordones y cunetas en más de 18 km de eje urbano estructurante.'
      ),
      story: [
        L(
          'A Linha Verde é um dos principais eixos viários de Curitiba, integrando o sistema BRT da capital paranaense ao trânsito metropolitano.',
          'The Green Line is one of Curitiba\'s main road axes, integrating the BRT system of Paraná\'s capital with metropolitan traffic.',
          'La Línea Verde es uno de los principales ejes viales de Curitiba, integrando el sistema BRT de la capital paranaense con el tránsito metropolitano.'
        ),
        L(
          'A IMB executou as canaletas exclusivas do BRT, todos os meios-fios e sarjetas dos canteiros centrais e laterais, totalizando mais de 18 km de via tratada.',
          'IMB executed the exclusive BRT lanes, all curbs and gutters of the central and side medians, totaling more than 18 km of treated road.',
          'IMB ejecutó las canaletas exclusivas del BRT, todos los cordones y cunetas de los canteros centrales y laterales, totalizando más de 18 km de vía tratada.'
        ),
      ],
      metrics: [
        { icon: 'route',      label: L('Eixo tratado',  'Treated axis',   'Eje tratado'),  value: '18', unit: 'km' },
        { icon: 'commute',    label: L('Canaletas BRT', 'BRT lanes',      'Canaletas BRT'), value: '36', unit: 'km' },
        { icon: 'foundation', label: L('Meios-fios',    'Curbs',          'Cordones'),     value: '72', unit: 'km' },
        { icon: 'schedule',   label: L('Duração',       'Duration',       'Duración'),     value: '34', unit: L('meses','months','meses') },
      ],
      equipment: [
        { id: 'imb-1200-evolution', name: L('Pavimentadora IMB-1200 Evolution', 'IMB-1200 Evolution Paver',     'Pavimentadora IMB-1200 Evolution') },
        { id: 'imb-ultra-500',      name: L('Extrusora IMB-ULTRA 500',          'IMB-ULTRA 500 Extruder',       'Extrusora IMB-ULTRA 500') },
      ],
      testimonial: {
        quote: L(
          'A produtividade da extrusora IMB nos permitiu fechar trechos de avenida no fim de semana e reabrir na segunda. Diferencial gigante para obra em via ativa.',
          'IMB extruder productivity allowed us to close avenue stretches on weekends and reopen on Monday. A huge advantage for work on an active road.',
          'La productividad de la extrusora IMB nos permitió cerrar tramos de avenida el fin de semana y reabrir el lunes. Diferencial enorme para obras en vía activa.'
        ),
        author: 'Eng.ª Patrícia Sato',
        role: L('Coordenadora de Mobilidade', 'Mobility Coordinator', 'Coordinadora de Movilidad'),
        company: L('Secretaria Municipal de Obras', 'Municipal Works Department', 'Secretaría Municipal de Obras'),
      },
    },
    {
      id: 'br-101-sul',
      title: L('Duplicação BR-101 Sul', 'BR-101 Southern Duplication', 'Duplicación BR-101 Sur'),
      subtitle: L('Rodovia federal entre SC e RS', 'Federal highway between SC and RS', 'Carretera federal entre SC y RS'),
      location: L('SC — Brasil', 'SC — Brazil', 'SC — Brasil'),
      region: L('Sul', 'South', 'Sur'),
      year: '2017 — 2021',
      status: L('Concluída', 'Completed', 'Concluida'),
      featured: false,
      client: L(
        'DNIT — Departamento Nacional de Infraestrutura de Transportes',
        'DNIT — Brazilian National Transportation Infrastructure Department',
        'DNIT — Departamento Nacional de Infraestructura de Transportes'
      ),
      hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAS0tdBKhlM5Jb7k-KcELLG_kjFXSAt-JiC5AIq15yietppAkfydOUSvbuC4sDDZu44OAtcwFtOB5cbzN1fj3DOXWkJZx9vTPYP0KWXR_hZnEvVx8qX89xr_MCNJBdoNKfLxNcYZtdYek6SJmKd6Q9hUkwQhKAubWcwLXJTfqm9HZKZYtuhv1LXGQaDGcL3VY2eJto0uda1C2R6gPJLu9DaURAQ0M0DoMiFOlMk328HTXI21BUgNKi8Dn6Gx7uh1SzyWKahW-_Bi5rQ',
      summary: L(
        'Pavimentação contínua e barreiras de concreto em mais de 100 km de duplicação da rodovia federal.',
        'Continuous paving and concrete barriers across more than 100 km of federal highway duplication.',
        'Pavimentación continua y barreras de concreto en más de 100 km de duplicación de carretera federal.'
      ),
      story: [
        L(
          'A duplicação da BR-101 no trecho catarinense foi uma das maiores obras de infraestrutura do Sul do país na última década.',
          'The BR-101 duplication in Santa Catarina was one of the largest infrastructure projects in the South of Brazil in the last decade.',
          'La duplicación de la BR-101 en el tramo catarinense fue una de las mayores obras de infraestructura del Sur del país en la última década.'
        ),
        L(
          'A IMB participou com pavimentação rígida em pista nova, recapeamento de pista existente e barreiras New Jersey ao longo de todo o trecho duplicado.',
          'IMB participated with rigid paving on new lanes, resurfacing of existing lanes and New Jersey barriers throughout the duplicated stretch.',
          'IMB participó con pavimentación rígida en carril nuevo, recapado del carril existente y barreras New Jersey a lo largo de todo el tramo duplicado.'
        ),
      ],
      metrics: [
        { icon: 'route',     label: L('Trecho duplicado',     'Duplicated stretch',   'Tramo duplicado'),   value: '108',     unit: 'km' },
        { icon: 'security',  label: L('Barreiras New Jersey', 'New Jersey barriers',  'Barreras New Jersey'), value: '216',   unit: 'km' },
        { icon: 'package_2', label: L('Concreto aplicado',    'Concrete poured',      'Concreto aplicado'), value: '210.000', unit: 'm³' },
        { icon: 'schedule',  label: L('Duração',              'Duration',             'Duración'),          value: '48',      unit: L('meses','months','meses') },
      ],
      equipment: [
        { id: 'imb-7300',      name: L('Pavimentadora IMB-7300',  'IMB-7300 Paver',           'Pavimentadora IMB-7300') },
        { id: 'imb-ultra-500', name: L('Extrusora IMB-ULTRA 500', 'IMB-ULTRA 500 Extruder',   'Extrusora IMB-ULTRA 500') },
      ],
      testimonial: {
        quote: L(
          'Em 4 anos de obra, zero parada de equipamento por falha de fábrica. O suporte de campo da IMB foi pontual sempre que precisamos.',
          'In 4 years of work, zero equipment downtime due to factory failure. IMB field support was prompt every time we needed it.',
          'En 4 años de obra, cero paradas de equipo por falla de fábrica. El soporte de campo de IMB fue puntual cada vez que lo necesitamos.'
        ),
        author: 'Eng. Roberto Andrade',
        role: L('Diretor Técnico', 'Technical Director', 'Director Técnico'),
        company: L('Consórcio BR-101 Sul', 'BR-101 South Consortium', 'Consorcio BR-101 Sur'),
      },
    },
    {
      id: 'aeroporto-floripa',
      title: L('Aeroporto Internacional de Florianópolis', 'Florianópolis International Airport', 'Aeropuerto Internacional de Florianópolis'),
      subtitle: L('Pátio de aeronaves e taxiways', 'Aircraft apron and taxiways', 'Plataforma de aeronaves y calles de rodaje'),
      location: L('Florianópolis, SC — Brasil', 'Florianópolis, SC — Brazil', 'Florianópolis, SC — Brasil'),
      region: L('Sul', 'South', 'Sur'),
      year: '2018',
      status: L('Concluída', 'Completed', 'Concluida'),
      featured: false,
      client: L('Floripa Airport (Zurich Airport)', 'Floripa Airport (Zurich Airport)', 'Floripa Airport (Zurich Airport)'),
      hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCazj80UbPQR9R9GCudjFBfDDOWQJ6YxniMFaEewO44eMWCrs7Xn-zznluWLPijFzgBiDAVoEHgjNAgV5AZgqds2iQ9bv3jW5q01p9QvkBjpoxXEAlfzs_7PSf7COs7IUEK5z0NxqiUtBX7JC0fZXwNgVJ3tZf9pCypmnfm-2lFB__dxm4Yac3Uig9DiNZ1upp3PuEyw3i1JZNlOrOknY8ib3aHQdh3V4rL-A_h52cZPySQQhe90nxhq1WP3dp2IrLtuu9nNFb6b_JI',
      summary: L(
        'Pavimentação rígida do pátio de aeronaves e taxiways com tolerância milimétrica.',
        'Rigid paving of aircraft apron and taxiways with millimetric tolerance.',
        'Pavimentación rígida de la plataforma de aeronaves y calles de rodaje con tolerancia milimétrica.'
      ),
      story: [
        L(
          'O novo terminal do aeroporto de Florianópolis recebeu pavimentação rígida em concreto de alto desempenho para suportar o tráfego de aeronaves de grande porte.',
          'The new Florianópolis airport terminal received high-performance concrete rigid paving to support large aircraft traffic.',
          'La nueva terminal del aeropuerto de Florianópolis recibió pavimentación rígida en concreto de alto desempeño para soportar el tráfico de aeronaves de gran porte.'
        ),
        L(
          'A obra exigiu tolerância de planicidade abaixo de 3 mm em 4 m, atendida pelos sensores laser da pavimentadora IMB-7300.',
          'The project required flatness tolerance below 3 mm in 4 m, met by the IMB-7300 paver\'s laser sensors.',
          'La obra exigió tolerancia de planicidad por debajo de 3 mm en 4 m, alcanzada por los sensores láser de la pavimentadora IMB-7300.'
        ),
      ],
      metrics: [
        { icon: 'square_foot', label: L('Pátio pavimentado',    'Paved apron',          'Plataforma pavimentada'), value: '95.000', unit: 'm²' },
        { icon: 'flight',      label: L('Aeronaves de projeto', 'Design aircraft',      'Aeronaves de proyecto'),  value: 'C-IV',   unit: '' },
        { icon: 'precision_manufacturing', label: L('Planicidade', 'Flatness',           'Planicidad'),             value: '< 3',    unit: 'mm/4m' },
        { icon: 'schedule',    label: L('Prazo de execução',    'Execution time',       'Plazo de ejecución'),     value: '7',      unit: L('meses','months','meses') },
      ],
      equipment: [
        { id: 'imb-7300', name: L('Pavimentadora IMB-7300', 'IMB-7300 Paver', 'Pavimentadora IMB-7300') },
      ],
      testimonial: null,
    },
    {
      id: 'anel-joinville',
      title: L('Anel Rodoviário de Joinville', 'Joinville Ring Road', 'Anillo Vial de Joinville'),
      subtitle: L('Contorno viário do Norte catarinense', 'Road bypass for Northern Santa Catarina', 'Circunvalación vial del Norte catarinense'),
      location: L('Joinville, SC — Brasil', 'Joinville, SC — Brazil', 'Joinville, SC — Brasil'),
      region: L('Sul', 'South', 'Sur'),
      year: '2020 — 2022',
      status: L('Concluída', 'Completed', 'Concluida'),
      featured: false,
      client: L(
        'DEINFRA — Departamento Estadual de Infraestrutura SC',
        'DEINFRA — Santa Catarina State Infrastructure Department',
        'DEINFRA — Departamento Estatal de Infraestructura SC'
      ),
      hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8vj6_3PHVHleyXmOePju5MJa4gX3bUL1gm_2uEzsRr9_K_K2ROxWLUh4vh519tZS_jJypiwHAqdR0lmxSP3-otIkitMCAb3lan1A-P7Q0Bl_3VC8vbfVGWh7uIm0z0xuzuHSrBU5kdQRkoHfT9oxHEqFCBkBxuFrMJcV1QVmUQNLMP5g7ed7ljqiNe5EyssG4aQh4KdSbsNX0AiVTVVX0B-osYCDof7BDaXarbWZpOd0Eq56BrcH5w_ur_w-J7uwFNmMpTP2uA8t9',
      summary: L(
        'Contorno viário e meios-fios extrudados para descongestionar o eixo logístico do Norte catarinense.',
        'Road bypass and extruded curbs to relieve the logistics corridor of Northern Santa Catarina.',
        'Circunvalación vial y cordones extruidos para descongestionar el eje logístico del Norte catarinense.'
      ),
      story: [
        L(
          'O contorno rodoviário de Joinville desviou o tráfego pesado do centro urbano, melhorando o fluxo logístico do polo industrial da região.',
          'The Joinville bypass diverted heavy traffic away from downtown, improving the logistics flow of the regional industrial hub.',
          'La circunvalación vial de Joinville desvió el tráfico pesado del centro urbano, mejorando el flujo logístico del polo industrial de la región.'
        ),
        L(
          'A IMB executou pavimentação flexível de apoio, todos os meios-fios e sarjetas em concreto extrudado e barreiras de proteção em pontos críticos.',
          'IMB performed support flexible paving, all curbs and gutters in extruded concrete and protective barriers at critical points.',
          'IMB ejecutó pavimentación flexible de apoyo, todos los cordones y cunetas en concreto extruido y barreras de protección en puntos críticos.'
        ),
      ],
      metrics: [
        { icon: 'route',      label: L('Contorno executado', 'Bypass executed', 'Circunvalación ejecutada'), value: '22', unit: 'km' },
        { icon: 'foundation', label: L('Meios-fios',         'Curbs',           'Cordones'),                 value: '44', unit: 'km' },
        { icon: 'water_drop', label: L('Sarjetas',           'Gutters',         'Cunetas'),                  value: '44', unit: 'km' },
        { icon: 'schedule',   label: L('Duração',            'Duration',        'Duración'),                 value: '20', unit: L('meses','months','meses') },
      ],
      equipment: [
        { id: 'imb-1200-evolution', name: L('Pavimentadora IMB-1200 Evolution', 'IMB-1200 Evolution Paver', 'Pavimentadora IMB-1200 Evolution') },
        { id: 'imb-5000-curb',      name: L('Extrusora IMB-5000',               'IMB-5000 Extruder',         'Extrusora IMB-5000') },
      ],
      testimonial: null,
    },
    {
      id: 'rodoanel-sp',
      title: L('Rodoanel Mário Covas', 'Mário Covas Beltway', 'Anillo Vial Mário Covas'),
      subtitle: L('Anel viário metropolitano de São Paulo', 'São Paulo metropolitan beltway', 'Anillo vial metropolitano de São Paulo'),
      location: L('Grande São Paulo, SP — Brasil', 'Greater São Paulo, SP — Brazil', 'Gran São Paulo, SP — Brasil'),
      region: L('Sudeste', 'Southeast', 'Sudeste'),
      year: '2014 — 2018',
      status: L('Concluída', 'Completed', 'Concluida'),
      featured: false,
      client: L('DERSA — Desenvolvimento Rodoviário SA', 'DERSA — Highway Development SA', 'DERSA — Desarrollo Vial SA'),
      hero_image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUE3nwYdkpehDIG3xReuYMn_MRYrG2e3YuRFZ9F5qaY7dR0JS3Jp2IeieUD0Y-fnsx0AR59vxfORjt4wQ5UJDBfy51GMghek1-CXgFOO_BxiYj2UP8DWS18aqJpBKiNTuZgf2tirsebSxvm6LY5QNIBrUk1lUJKNvbaM5-oOLeK3PKz7vKLlxqrcpk2Mj-7YLvTN0sUpyJlVzRrEneQ42K0Xu96Ruao5wwWGI7jEBfeaEaJWNKw1z2o_RIv9L4Gh_0R5g7qNJV5POn',
      summary: L(
        'Trechos de pavimentação rígida e barreiras tipo New Jersey em alça do anel viário metropolitano.',
        'Rigid paving stretches and New Jersey barriers on a metropolitan beltway loop.',
        'Tramos de pavimentación rígida y barreras tipo New Jersey en ramal del anillo vial metropolitano.'
      ),
      story: [
        L(
          'O Rodoanel Mário Covas é o anel rodoviário que circunda a Região Metropolitana de São Paulo, conectando as principais rodovias federais e estaduais.',
          'The Mário Covas Beltway is the ring road around the Greater São Paulo region, connecting major federal and state highways.',
          'El Anillo Mário Covas es la circunvalación que rodea la Región Metropolitana de São Paulo, conectando las principales carreteras federales y estatales.'
        ),
        L(
          'A IMB participou de trechos do Anel Sul e Leste com pavimentação rígida em concreto e barreiras de proteção contínuas.',
          'IMB worked on South and East Ring sections with rigid concrete paving and continuous protective barriers.',
          'IMB participó en tramos del Anillo Sur y Este con pavimentación rígida en concreto y barreras de protección continuas.'
        ),
      ],
      metrics: [
        { icon: 'route',     label: L('Trecho executado',  'Stretch executed', 'Tramo ejecutado'),   value: '34',     unit: 'km' },
        { icon: 'security',  label: L('Barreiras',         'Barriers',         'Barreras'),          value: '68',     unit: 'km' },
        { icon: 'package_2', label: L('Concreto aplicado', 'Concrete poured',  'Concreto aplicado'), value: '88.000', unit: 'm³' },
        { icon: 'schedule',  label: L('Duração',           'Duration',         'Duración'),          value: '42',     unit: L('meses','months','meses') },
      ],
      equipment: [
        { id: 'imb-7300',      name: L('Pavimentadora IMB-7300',  'IMB-7300 Paver',         'Pavimentadora IMB-7300') },
        { id: 'imb-ultra-500', name: L('Extrusora IMB-ULTRA 500', 'IMB-ULTRA 500 Extruder', 'Extrusora IMB-ULTRA 500') },
      ],
      testimonial: {
        quote: L(
          'A IMB foi parceira em diversos lotes do Rodoanel. Equipamento robusto e um time de campo que fala a língua do canteiro.',
          'IMB was a partner on several Beltway lots. Robust equipment and a field team that speaks the construction site\'s language.',
          'IMB fue socia en varios lotes del Anillo. Equipo robusto y un equipo de campo que habla el idioma de la obra.'
        ),
        author: 'Eng. Felipe Camargo',
        role: L('Superintendente de Obras', 'Works Superintendent', 'Superintendente de Obras'),
        company: 'DERSA',
      },
    },
  ];

  function pickNum(v) {
    if (v == null) return NaN;
    return parseFloat(String(v).replace(/\./g, '').replace(',', '.'));
  }

  // Helper: pulls Portuguese label for the totals computation (label keyword matching).
  function labelPt(m) {
    return (m.label && typeof m.label === 'object') ? (m.label.pt || '') : String(m.label || '');
  }

  function totals() {
    let kmRodovia = 0;
    let kmBarreira = 0;
    let m3 = 0;
    let obras = cases.length;
    cases.forEach((c) => {
      c.metrics.forEach((m) => {
        const v = pickNum(m.value);
        if (isNaN(v)) return;
        const lbl = labelPt(m);
        if (m.unit === 'km' && /pavimenta|trecho|contorno|eixo|duplicad|executad/i.test(lbl)) kmRodovia += v;
        if (m.unit === 'km' && /barreira/i.test(lbl)) kmBarreira += v;
        if (m.unit === 'm³') m3 += v;
      });
    });
    return { kmRodovia, kmBarreira, m3, obras };
  }

  function getById(id) {
    return cases.find((c) => c.id === id) || null;
  }

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

  function caseHref(c) {
    if (window.IMB_I18N && window.IMB_I18N.caseDetailUrl) return window.IMB_I18N.caseDetailUrl(c.id);
    return 'case.html?id=' + encodeURIComponent(c.id);
  }

  function metricText(m) {
    var value = T(m.value);
    var unit = T(m.unit);
    return unit ? value + ' ' + unit : value;
  }

  function renderCard(c) {
    var title = T(c.title);
    var location = T(c.location);
    var summary = T(c.summary);
    var chips = (c.metrics || []).slice(0, 3).map(function (m) {
      return '<span class="case-card-chip">' + escHtml(metricText(m)) + '</span>';
    }).join('');

    return ''
      + '<article class="case-card group fade-in-up" data-case-id="' + escHtml(c.id) + '">'
      +   '<a href="' + escHtml(caseHref(c)) + '" class="case-card-link" aria-label="' + escHtml(title) + '">'
      +     '<div class="case-card-media">'
      +       '<img src="' + escHtml(c.hero_image) + '" alt="' + escHtml(title) + '" loading="lazy" />'
      +     '</div>'
      +     '<div class="case-card-body">'
      +       '<div class="case-card-location">'
      +         '<span class="material-symbols-outlined">location_on</span>'
      +         '<span>' + escHtml(location) + '</span>'
      +       '</div>'
      +       '<h3 class="case-card-title">' + escHtml(title) + '</h3>'
      +       '<p class="case-card-summary">' + escHtml(summary) + '</p>'
      +       (chips ? '<div class="case-card-chips">' + chips + '</div>' : '')
      +     '</div>'
      +   '</a>'
      + '</article>';
  }

  return { cases, totals, getById, renderCard };
})();
