// Contenido real extraído del dossier "AVIZOR Fauna · TEVA" (v1.0)
// y de la maqueta AVIZOR Fauna.dc.html. Fuente de datos única para el sitio.

export const stats = [
  { figure: "36.087", label: "siniestros relacionados con fauna en 2024" },
  { figure: "≈ 1/3", label: "ocurren en vías interurbanas" },
  { figure: "88%", label: "en carreteras convencionales" },
  { figure: "×2", label: "se han duplicado en la última década" },
];

export const statSource =
  "Fuente: Dirección General de Tráfico y Asociación Española de la Carretera (datos 2024).";

export const speciesShare = [
  { pct: 42, label: "Jabalíes", color: "#1F4A9E" },
  { pct: 32, label: "Corzos", color: "#6F93D6" },
  { pct: 8, label: "Caninos", color: "#A9BFCF" },
  { pct: 18, label: "Otras especies", color: "#d8dcdb" },
];

export const comparison = {
  traditional: [
    "Vallados y pasos de fauna: costosos e invasivos.",
    "Señal P-24 fija o siempre encendida.",
    "El conductor se habitúa y deja de atenderla — “efecto túnel”.",
    "Sin datos del cuándo ni del dónde.",
  ],
  avizor: [
    "Detecta la presencia real del animal en tiempo real.",
    "Activa la señalización solo cuando hay peligro.",
    "El aviso recupera credibilidad: deja de ser ruido de fondo.",
    "Cada evento queda registrado y es explotable.",
  ],
};

export const steps = [
  {
    num: "01",
    tag: "DETECTA",
    title: "Detecta y valida",
    body: "La sensórica identifica al animal —vibración en la fibra, calor y movimiento en radar, vídeo con IR o la señal VHF de un collar— y la tarjeta de control descarta vehículos y personas.",
  },
  {
    num: "02",
    tag: "ENCIENDE",
    title: "Enciende por LoRa",
    body: "La tarjeta activa al instante, vía red LoRa 868 MHz (hasta 9 km), la señalización definida: P-24 LED, panel de mensaje variable o balizas luminosas.",
  },
  {
    num: "03",
    tag: "ALARMA",
    title: "Alarma 4G/5G",
    body: "Avisa por 4G/5G de doble SIM al centro de control y al vehículo conectado (DGT 3.0), y notifica por correo o móvil al equipo de mantenimiento.",
  },
  {
    num: "04",
    tag: "CAPTURA",
    title: "Captura el dato",
    body: "Registra fecha, hora, punto kilométrico y encendidos, y lo vuelca a AVIZOR Cloud para su análisis histórico y la mejora continua del sistema.",
  },
];

export const architectureNode = {
  title: "Tarjeta de control inteligente, fabricada por TEVA",
  subtitle: "Núcleo del sistema",
  specs: [
    "Módulo LoRa 868 MHz (hasta 9 km)",
    "4G/5G de doble SIM",
    "Salida por relés + firmware propio",
    "Microcontrolador −40 a +85 ºC",
    "Procesamiento local (modo degradado)",
  ],
  inputs: [
    "Cámara · analítica de vídeo",
    "Fibra óptica enterrada",
    "Barrera láser multihaz",
    "Antena VHF (radiofrecuencia)",
    "Baliza radar · LiDAR",
  ],
  outputs: [
    { k: "Señalización dinámica", v: "Señales P-24 LED · PMV · balizas · “efecto túnel”" },
    { k: "Centro de control · AVIZOR Cloud", v: "Plataforma web y app · alarmas e históricos · gestión remota" },
    { k: "Vehículo conectado · DGT 3.0", v: "Aviso C-ITS al conductor (V2V) · API de integración" },
  ],
  remote:
    "Gestión remota desde AVIZOR Cloud: brillo de señalización · temperatura y humedad · estado de gateways · carga de baterías · registro de eventos · actualizaciones OTA.",
};

export type GamaItem = {
  id: string;
  code: string;
  solName: string;
  ambito: string;
  tint: string;
  tagline: string;
  desc: string;
  specs: string[];
  refs: string[];
  refTags?: { label: string; ref: string }[]; // enlace inverso a "Referencias" (ref = id de la referencia)
  image?: string;
  video?: string;
  bg: string; // imagen de fondo de la tarjeta en el selector de "La gama"
};

export const gama: GamaItem[] = [
  {
    id: "sol-fo",
    code: "Fauna–FO",
    solName: "Fibra óptica enterrada",
    ambito: "Tramos largos y abiertos",
    tint: "#1E2A3D",
    bg: "/images/gama-fo.jpg",
    tagline: "Detección lineal por C-OTDR",
    desc: "Una fibra óptica enterrada al borde de la vía detecta las alteraciones del animal y localiza el punto exacto de la intrusión, a lo largo de kilómetros de trazado y sin puntos ciegos. Ideal para tramos largos y abiertos, incluidos los TEFIVA.",
    specs: [
      "Hasta 80 km por sensor · 1.440 secciones",
      "Detección hasta 20 m antes de la fibra; inmune al clima",
      "Zanja de 30–40 cm, sin barreras ni acometida; sin impacto visual",
    ],
    refs: [],
    image: "/images/carretera-fo.jpg",
    video: "/videos/FO-moving.mp4",
  },
  {
    id: "sol-e",
    code: "Fauna–E",
    solName: "Analítica de vídeo",
    ambito: "Enlaces, accesos y puntos discretos",
    tint: "#1C2836",
    bg: "/images/gama-e.jpg",
    tagline: "Cámara IR + IVS",
    desc: "Cámara con analítica de vídeo embebida y foco IR de 850 nm (IP68/IK10) que distingue animal, vehículo o persona. Pensada para enlaces de autovía/autopista, accesos y puntos concretos delimitados.",
    specs: [
      "Fiabilidad > 96%; secciones de hasta 30 m por equipo",
      "Detección nocturna por vídeo con IR (no térmica)",
      "< 18 W, autonomía solar; router 4G/5G de doble SIM",
    ],
    refs: [
      "JCyL · Somacyl — Sierra de Francia",
      "MITMA — 57 cámaras en A-4 y A-44 (Jaén y Granada)",
    ],
    refTags: [
      { label: "JCyL", ref: "ref-somacyl" },
      { label: "MITMA", ref: "ref-a4a44" },
    ],
    image: "/images/somacyl-instalacion.jpg",
    video: "/videos/Sierra-Francia-Senal.mp4",
  },
  {
    id: "sol-l",
    code: "Fauna–L",
    solName: "Barrera láser multihaz",
    ambito: "Perímetros y pasos recurrentes de fauna",
    tint: "#202C42",
    bg: "/images/gama-l.jpg",
    tagline: "Corte simultáneo de 4 haces IR",
    desc: "Detectores en ambos márgenes forman un perímetro virtual continuo por corte de cuatro haces láser infrarrojos. Escenario idóneo: perímetros de tramos abiertos y puntos negros / TEFIVA con mínima falsa alarma.",
    specs: [
      "Hasta 200 m por detector; descarta vegetación, aves y pequeño porte",
      "Latencia < 1 s (LoRaWAN clase C) + 4G/LTE",
      "Autónomo, IP66 y API de integración con la DGT",
    ],
    refs: ["Junta de Castilla y León — sistema de barreras láser"],
    refTags: [{ label: "JCCM", ref: "ref-jcyl" }],
    image: "/images/baliza-laser.jpg",
    video: "/videos/lasers.mp4",
  },
  {
    id: "sol-li",
    code: "Fauna–LI",
    solName: "Radiofrecuencia VHF",
    ambito: "Especies radiomarcadas (lince ibérico)",
    tint: "#232C46",
    bg: "/images/gama-li.jpg",
    tagline: "Lectura del collar emisor",
    desc: "Detecta especies radiomarcadas captando el pulso VHF de su collar mediante antena omnidireccional, filtro pasa-banda y amplificador de bajo ruido. Protección específica de especies amenazadas, en especial el lince ibérico.",
    specs: [
      "148–173 MHz; reacción < 150 ms",
      "Matriz LED ≥ 8.000 cd, visible a 300 m",
      "Semanas de autonomía (panel 10 W + LiFePO₄)",
    ],
    refs: ["MITMA / Junta de Andalucía — conservación del lince ibérico"],
    refTags: [{ label: "MITMA", ref: "ref-lince" }],
    image: "/images/lince-iberico.jpg",
    video: "/videos/lince_sentandose.mp4",
  },
  {
    id: "sol-b",
    code: "Fauna–B",
    solName: "Baliza disuasoria",
    ambito: "Trazados sinuosos y de montaña",
    tint: "#212A40",
    bg: "/images/gama-b.jpg",
    tagline: "Detecta y disuade",
    desc: "Baliza modular y autónoma, con forma de hito de arista, que detecta y disuade a la fauna en la calzada al tiempo que advierte al conductor. Pensada para disuasión activa y detección puntual en márgenes de carretera.",
    specs: [
      "Doble disuasión: LED + ultrasonidos (8–41 kHz, 135 dB)",
      "Radar Doppler (25 m) y/o LIDAR (hasta 150 m)",
      "Identificador único: enciende solo balizas próximas · PET (OC 06/2023)",
    ],
    refs: ["DGT — presentación en jornada técnica"],
    refTags: [{ label: "DGT", ref: "ref-dgt" }],
    video: "/videos/animacion_baliza.mp4",
  },
];

export const selectionGuide = [
  { code: "Fauna-FO", tech: "Fibra óptica enterrada (C-OTDR)", scenario: "Tramos largos y abiertos", data: "80 km/sensor · 1.440 secciones" },
  { code: "Fauna-E", tech: "Analítica de vídeo + IR", scenario: "Enlaces, accesos y puntos discretos", data: "30 m/equipo · fiabilidad > 96%" },
  { code: "Fauna-L", tech: "Barrera láser multihaz", scenario: "Perímetro de tramos / TEFIVA", data: "200 m/detector · < 1 s" },
  { code: "Fauna-LI", tech: "Radiofrecuencia VHF", scenario: "Especies radiomarcadas (lince)", data: "148–173 MHz · < 150 ms" },
  { code: "Fauna-B", tech: "Baliza radar Doppler + LIDAR", scenario: "Disuasión activa y detección", data: "Radar 25 m / LIDAR 150 m · solar" },
];

export const platform = [
  { k: "DATOS E HISTÓRICOS", v: "Detecciones y encendidos por p.k.; exportación CSV/XML." },
  { k: "CONTROL DE SEÑALIZACIÓN", v: "Brillo y tiempos de encendido en remoto." },
  { k: "MONITORIZACIÓN", v: "Temperatura, humedad, gateways y señal radio." },
  { k: "ENERGÍA", v: "Estado y carga de baterías solares." },
  { k: "MANTENIMIENTO", v: "Averías en tiempo real y actualizaciones de firmware OTA." },
  { k: "SEGURIDAD (ENS)", v: "Perfiles de usuario; plataforma disponible 24×7." },
];

export const platformDeployment = {
  label: "Plataforma operativa · A-4 y A-44 (Jaén y Granada)",
  url: "avizor-fauna.tecnologiasviales.com",
};

export const externalChannels = [
  {
    title: "Informes y análisis",
    items: [
      "Históricos por zonas y estadísticas de paso",
      "Alarmas con GPS e intrusión zonificada",
      "Clasificación de objetos y su velocidad",
      "Mapas 4D y tableros de mando",
    ],
  },
  {
    title: "Canales con el ente público",
    items: [
      "Intercambio bidireccional con la DGT de tráfico",
      "Informes para la entidad pública",
      "Interconexión con herramientas de prevención del riesgo en carreteras",
    ],
  },
  {
    title: "Canales al ciudadano",
    items: [
      "Navegación asistida por GPS y apps",
      "Notificaciones por SMS",
      "Avisos por redes sociales",
    ],
  },
];

export const dgtIntegration = [
  "Encaja con la hoja de ruta: los TEFIVA se integran en DGT 3.0.",
  "AVIZOR Fauna aporta el dato que falta: detección efectiva, en el punto y momento exactos.",
  "Localización exacta para avisar solo a los usuarios próximos.",
  "API abierta con la DGT y los centros de gestión de tráfico.",
];

export const advantages = [
  { title: "Aviso inteligente", body: "Se activa solo ante intrusión real; sin habituación del conductor." },
  { title: "Tecnología propia", body: "Red LoRa y tarjeta de control fabricadas por TEVA." },
  { title: "Gestión con AVIZOR Cloud", body: "Datos, control remoto y mantenimiento predictivo." },
  { title: "Mínima obra civil", body: "Sin barreras ni acometida; comunicaciones inalámbricas." },
  { title: "Cobertura a medida", body: "De 80 km/sensor a puntos concretos, con localización precisa." },
  { title: "Independiente del clima", body: "Frente a visión artificial y cámaras térmicas convencionales." },
];

export const references = [
  {
    id: "ref-lince",
    name: "MITMA · Junta de Andalucía",
    scope: "Detección temprana del lince ibérico mediante radiofrecuencia VHF del collar, con activación automática de la señalización.",
    sol: "Fauna-LI",
    target: "sol-li",
    image: "/images/lince-iberico.jpg",
  },
  {
    id: "ref-somacyl",
    name: "JCyL · Somacyl — Sierra de Francia",
    scope: "Señal inteligente con analítica de vídeo: señal autónoma solar con cámara; alarmas a centro de control, SMS o correo.",
    sol: "Fauna-E",
    target: "sol-e",
    image: "/images/somacyl-instalacion.jpg",
  },
  {
    id: "ref-jcyl",
    name: "Junta de Castilla y León",
    scope: "Detección por barreras láser con avisos automáticos para la seguridad vial.",
    sol: "Fauna-L",
    target: "sol-l",
    image: "/images/baliza-laser.jpg",
  },
  {
    id: "ref-a4a44",
    name: "MITMA · A-4 y A-44 (Jaén y Granada)",
    scope: "57 cámaras de vídeo e infrarrojas desplegadas en ≈14 enlaces; portal operativo avizor-fauna.tecnologiasviales.com.",
    sol: "Fauna-E",
    target: "sol-e",
    image: "/images/map-jaen.jpeg",
  },
  {
    id: "ref-dgt",
    name: "DGT",
    scope: "Dirección General de Tráfico — presentación de la baliza LIDAR de detección y aviso de fauna, conectada a DGT 3.0.",
    sol: "Fauna-B",
    target: "sol-b",
    image: "/images/baliza-stand-dgt.jpg",
  },
];

export const contact = {
  person: "Nuno Pereira",
  phone: "+34 605 493 338",
  phoneHref: "+34605493338",
  email: "npereira@grupoteva.com",
  address: "C/ Valportillo Segunda, 14 · 28108 Alcobendas (Madrid)",
  web: "www.grupoteva.com",
  webHref: "https://www.grupoteva.com",
  tagline: "Detectar la fauna. Proteger a las personas.",
  claim: "Detecta - Alerta - Protege",
};

export const gamaOptions = [
  "Fauna-FO · Fibra óptica (gran longitud)",
  "Fauna-E · Analítica de vídeo (enlaces y accesos)",
  "Fauna-L · Barrera láser (pasos recurrentes)",
  "Fauna-LI · Radiofrecuencia VHF (lince ibérico)",
  "Fauna-B · Baliza disuasoria (montaña / sinuoso)",
  "Necesito asesoramiento",
];

// Logotipos institucionales reales (sustituyen a las etiquetas de texto
// en la franja de confianza del hero).
// Versiones "hero": silueta blanca sobre fondo transparente (sin caja blanca),
// pensadas para mostrarse sobre el vídeo oscuro del hero. Ver
// scripts/ o el proceso de generación en public/images/*-hero.png.
export const trustLogos = [
  { name: "MITMA", src: "/images/logo-ministerio-transp-hero.png" },
  { name: "JCyL · Somacyl", src: "/images/logo-somacyl-hero.png" },
  { name: "Junta de Andalucía", src: "/images/logo-juntaA-hero.png" },
  { name: "DGT", src: "/images/logo-dgt-hero.png" },
  { name: "JCCM", src: "/images/logo-jccm-hero.png" },
];
