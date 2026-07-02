// i18n — todas las cadenas visibles del sitio en 4 idiomas.
// Los datos no textuales (colores, imágenes, códigos, cifras) son comunes y
// se combinan por índice con las traducciones desde content.ts.

export type Lang = "es" | "en" | "pt" | "ca";
export const LANGS: Lang[] = ["es", "en", "pt", "ca"];
export const LANG_NAMES: Record<Lang, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  ca: "Català",
};

export interface Dict {
  nav: { problema: string; gama: string; plataforma: string; referencias: string; contacto: string };
  hero: { eyebrow: string; titleA: string; titleB: string; subtitle: string; ctaContact: string; ctaSolutions: string; trust: string };
  flujo: { title: string; sub1: string; sub2: string; steps: { title: string; sub: string }[] };
  problema: { label: string; title: string; subtitle: string; speciesTitle: string; source: string; statLabels: string[]; species: string[] };
  gama: {
    label: string; title: string; subtitle: string; ambitoWord: string; comingSoon: string;
    mapTitle: string; mapDesc: string; mapDescMobile: string; expand: string; collapse: string; mapLoading: string;
    mapLegend: { fo: string; e: string; l: string; b: string };
    items: { solName: string; ambito: string; tagline: string; desc: string; specs: string[]; refs: string[] }[];
  };
  plataforma: { label: string; title: string; subtitle: string; deployLabel: string; items: { k: string; v: string }[] };
  referencias: { label: string; title: string; items: { name: string; scope: string; points?: string[] }[] };
  contacto: {
    label: string; title: string; subtitle: string;
    personLabel: string; phoneLabel: string; emailLabel: string; addressLabel: string;
    formTitle: string; formBody: string; perks: string[];
    fEmail: string; pEmail: string;
    submit: string; sending: string; error: string; privacy: string; sentTitle: string; sentBody: string;
  };
  footer: { blurb: string; tagline: string; navTitle: string; contactTitle: string; rights: string; legal: string };
}

const es: Dict = {
  nav: { problema: "El problema", gama: "La gama", plataforma: "Plataforma", referencias: "Referencias", contacto: "Contacto" },
  hero: {
    eyebrow: "Detección inteligente de fauna · Señalización activa",
    titleA: "Del aviso permanente",
    titleB: "al aviso inteligente.",
    subtitle: "AVIZOR Fauna detecta la presencia de animales en la carretera y la convierte, en tiempo real, en señalización activa, en alarma para el conductor y en dato útil para la administración.",
    ctaContact: "Ponerse en contacto",
    ctaSolutions: "Ver soluciones",
    trust: "Administraciones que ya confían en la tecnología",
  },
  flujo: {
    title: "Detecta. Alerta. Protege.",
    sub1: "En milisegundos, ",
    sub2: " transforma la presencia de un animal en una alerta accionable para el conductor y el centro de control.",
    steps: [
      { title: "Detecta", sub: "Precisión milimétrica" },
      { title: "Alerta", sub: "Aviso en tiempo real" },
      { title: "Protege", sub: "Reduce el riesgo" },
    ],
  },
  problema: {
    label: "El problema",
    title: "La fauna en la carretera ha dejado de ser un accidente puntual.",
    subtitle: "Los siniestros con animales crecen año tras año y se concentran allí donde la señalización tradicional ya no basta: la vía convencional e interurbana.",
    speciesTitle: "Especies implicadas · 2024",
    source: "Fuente: Dirección General de Tráfico y Asociación Española de la Carretera (datos 2024).",
    statLabels: [
      "siniestros relacionados con fauna en 2024",
      "ocurren en vías interurbanas",
      "en carreteras convencionales",
      "se han duplicado en la última década",
    ],
    species: ["Jabalíes", "Corzos", "Caninos", "Otras especies"],
  },
  gama: {
    label: "La gama",
    title: "Una solución para cada ámbito de la vía.",
    subtitle: "Cada escenario de riesgo pide una tecnología distinta. Seleccione el ámbito y acceda a la solución correspondiente.",
    ambitoWord: "Ámbito",
    comingSoon: "Próximamente",
    mapTitle: "Ejemplo de aplicación · Sierra de Collserola",
    mapDesc: "Mapa 3D interactivo del terreno con la traza real de detección Fauna-FO superpuesta. Explore el relieve, cambie de estilo y active las capas de datos.",
    mapDescMobile: "Traza real de detección en la Sierra de Collserola, con un tramo por cada tecnología de la gama AVIZOR Fauna.",
    expand: "↗ Expandir mapa",
    collapse: "↙ Contraer mapa",
    mapLoading: "Cargando mapa…",
    mapLegend: { fo: "Rojo · Fauna-FO", e: "Azul · Fauna-E", l: "Verde · Fauna-L", b: "Morado · Fauna-B" },
    items: [
      {
        solName: "Fibra óptica enterrada", ambito: "Tramos largos y abiertos", tagline: "Detección lineal por C-OTDR",
        desc: "Una fibra óptica enterrada al borde de la vía detecta las alteraciones del animal y localiza el punto exacto de la intrusión, a lo largo de kilómetros de trazado y sin puntos ciegos. Ideal para tramos largos y abiertos, incluidos los TEFIVA.",
        specs: ["Hasta 80 km por sensor · 1.440 secciones", "Detección hasta 20 m antes de la fibra; inmune al clima", "Zanja de 30–40 cm, sin barreras ni acometida; sin impacto visual"],
        refs: [],
      },
      {
        solName: "Analítica de vídeo", ambito: "Enlaces, accesos y puntos discretos", tagline: "Cámara IR + IVS",
        desc: "Cámara con analítica de vídeo embebida y foco IR de 850 nm (IP68/IK10) que distingue animal, vehículo o persona. Pensada para enlaces de autovía/autopista, accesos y puntos concretos delimitados.",
        specs: ["Fiabilidad > 96%; secciones de hasta 30 m por equipo", "Detección nocturna por vídeo con IR (no térmica)", "< 18 W, autonomía solar; router 4G/5G de doble SIM"],
        refs: ["JCyL · Somacyl — Sierra de Francia", "MITMA — 57 cámaras en A-4 y A-44 (Jaén y Granada)"],
      },
      {
        solName: "Barrera láser multihaz", ambito: "Perímetros y pasos recurrentes de fauna", tagline: "Corte simultáneo de 4 haces IR",
        desc: "Detectores en ambos márgenes forman un perímetro virtual continuo por corte de cuatro haces láser infrarrojos. Escenario idóneo: perímetros de tramos abiertos y puntos negros / TEFIVA con mínima falsa alarma.",
        specs: ["Hasta 200 m por detector; descarta vegetación, aves y pequeño porte", "Latencia < 1 s (LoRaWAN clase C) + 4G/LTE", "Autónomo, IP66 y API de integración con la DGT"],
        refs: ["Junta de Castilla-La Mancha — sistema de barreras láser"],
      },
      {
        solName: "Radiofrecuencia VHF", ambito: "Especies radiomarcadas (lince ibérico)", tagline: "Lectura del collar emisor",
        desc: "Detecta especies radiomarcadas captando el pulso VHF de su collar mediante antena omnidireccional, filtro pasa-banda y amplificador de bajo ruido. Protección específica de especies amenazadas, en especial el lince ibérico.",
        specs: ["148–173 MHz; reacción < 150 ms", "Matriz LED ≥ 8.000 cd, visible a 300 m", "Semanas de autonomía (panel 10 W + LiFePO₄)"],
        refs: ["MITMA / Junta de Andalucía — conservación del lince ibérico"],
      },
      {
        solName: "Baliza disuasoria", ambito: "Trazados sinuosos y de montaña", tagline: "Detecta y disuade",
        desc: "Baliza modular y autónoma, con forma de hito de arista, que detecta y disuade a la fauna en la calzada al tiempo que advierte al conductor. Pensada para disuasión activa y detección puntual en márgenes de carretera.",
        specs: ["Doble disuasión: LED + ultrasonidos (8–41 kHz, 135 dB)", "Radar Doppler (25 m) y/o LIDAR (hasta 150 m)", "Identificador único: enciende solo balizas próximas · PET (OC 06/2023)"],
        refs: ["DGT — presentación en jornada técnica"],
      },
    ],
  },
  plataforma: {
    label: "La plataforma · El valor del dato",
    title: "Cada cruce se convierte en un dato. Cada dato, en una decisión.",
    subtitle: "El valor diferencial de AVIZOR Fauna no termina en la carretera. Cada detección alimenta AVIZOR Cloud, una plataforma que agrega, depura y analiza la actividad de fauna a lo largo del tiempo, y devuelve a la administración una lectura clara del riesgo. La señalización protege hoy; el dato permite planificar mañana.",
    deployLabel: "Plataforma operativa · A-4 y A-44 (Jaén y Granada)",
    items: [
      { k: "DATOS E HISTÓRICOS", v: "Detecciones y encendidos por p.k.; exportación CSV/XML." },
      { k: "CONTROL DE SEÑALIZACIÓN", v: "Brillo y tiempos de encendido en remoto." },
      { k: "MONITORIZACIÓN", v: "Temperatura, humedad, gateways y señal radio." },
      { k: "ENERGÍA", v: "Estado y carga de baterías solares." },
      { k: "MANTENIMIENTO", v: "Averías en tiempo real y actualizaciones de firmware OTA." },
      { k: "SEGURIDAD (ENS)", v: "Perfiles de usuario; plataforma disponible 24×7." },
    ],
  },
  referencias: {
    label: "Referencias · Casos de éxito",
    title: "Tecnología ya desplegada con la administración.",
    items: [
      { name: "MITMA · Junta de Andalucía", scope: "Detección temprana del lince ibérico mediante radiofrecuencia VHF del collar, con activación automática de la señalización.", points: ["Vallado y señalización en carreteras de Sevilla y Córdoba: más de 15 km de cerramiento, rampas de escape, portillos, paneles informativos y mejora de pasos de drenaje.", "Vallado virtual con emisores de luz y sonido que se activan cuando un animal se acerca a la vía y llega un vehículo, disuadiendo el cruce y avisando al conductor.", "Radiofrecuencia: capta la señal VHF del collar del lince y activa cámaras y señales LED solo ante su presencia.", "Enmarcado en el proyecto europeo LIFE LynxConnect de conectividad entre poblaciones de lince ibérico."] },
      { name: "JCyL · Somacyl — Sierra de Francia", scope: "Proyecto piloto de señalización inteligente en la SA-201 (Sierra de Francia, tramo El Cabaco–El Casarito, p.k. 12+000–16+500). La visión artificial detecta la fauna —sobre todo corzos y jabalíes— y activa la señalización dinámica en tiempo real, avisando solo ante riesgo real.", points: ["Sistema experimental pionero en Castilla y León, en 4 km de la SA-201 (El Cabaco–El Casarito).", "9 cámaras y 11 señales de aviso, de espectro visible y térmicas.", "Espectro térmico: operativo con baja iluminación, niebla o nieve; distingue animales de personas.", "Al detectar fauna se activan grandes paneles luminosos; el paso se graba y registra en la plataforma, con control remoto y alarmas al centro de control.", "Proyecto de la Junta de Castilla y León con TEVA y la Universidad de Salamanca."] },
      { name: "Junta de Castilla-La Mancha", scope: "Detección por barreras láser con avisos automáticos para la seguridad vial.", points: ["Barreras láser multihaz desplegadas en puntos negros de fauna de la red de carreteras autonómica, con corte simultáneo de cuatro haces infrarrojos para minimizar falsas alarmas.", "Detección de hasta 200 m por equipo; descarta vegetación, aves y fauna de pequeño porte, centrando el aviso en los cruces de riesgo real.", "Al cortarse el haz se activa de forma automática la señalización de aviso en el propio tramo, alertando al conductor en tiempo real.", "Comunicación de baja latencia (< 1 s) por LoRaWAN con respaldo 4G/LTE; equipos autónomos e IP66, aptos para intemperie."] },
      { name: "MITMA · A-4 y A-44 (Jaén y Granada)", scope: "Corredor A-4 / A-44 en Jaén y Granada. El Ministerio de Transportes impulsa obras de mejora de la seguridad vial y protección de la fauna en las autovías A-4, A-32 y A-44 y en la N-323, con cargo a los fondos europeos NextGenerationEU.", points: ["57 cámaras de vídeo e infrarrojas desplegadas en ≈14 enlaces; portal operativo avizor-fauna.tecnologiasviales.com.", "Sistemas de detección de animales con paneles luminosos de advertencia y señales P-24 luminosas en los enlaces.", "Mejora de cerramientos y rampas de escape para evitar el acceso de la fauna a la calzada.", "Disuasores acústicos y ópticos y carteles de presencia de lince."] },
      { name: "DGT", scope: "Dirección General de Tráfico — presentación de la baliza LIDAR de detección y aviso de fauna, conectada a DGT 3.0.", points: ["Balizas de control y disuasorias: al acercarse un vehículo, avisan al conductor y ahuyentan a la fauna con luz y sonido. Solo se activan con tráfico, así los animales cruzan libremente cuando no lo hay.", "Vallado cinegético + tecnología: valla convencional con huecos de ~100 m en pasos de fauna, donde cámaras detectan al animal y alertan al conductor.", "Vallado virtual: dispositivos que detectan los faros a 200 m y emiten señales para frenar al animal, sin bloquear el cruce cuando no hay tráfico."] },
    ],
  },
  contacto: {
    label: "Contacto",
    title: "Reciba el dossier técnico y la documentación de AVIZOR Fauna.",
    subtitle: "Casos de referencia, especificaciones técnicas y las últimas novedades del producto, directamente en su email.",
    personLabel: "Persona de contacto", phoneLabel: "Teléfono", emailLabel: "Email", addressLabel: "Dirección",
    formTitle: "Reciba nuestra documentación",
    formBody: "Déjenos su email y le enviaremos el dossier técnico en PDF y el resto de material informativo.",
    perks: [
      "Dossier técnico en PDF",
      "Casos de referencia con administraciones",
      "Novedades de producto y normativa",
    ],
    fEmail: "Email", pEmail: "nombre@administracion.es",
    submit: "Quiero recibir la documentación",
    sending: "Enviando…",
    error: "No se ha podido enviar. Inténtelo de nuevo en unos minutos.",
    privacy: "Sus datos se tratarán conforme a la normativa vigente de protección de datos. Solo utilizaremos su email para enviarle la documentación solicitada y, si lo desea, futuras novedades. Podrá darse de baja cuando quiera.",
    sentTitle: "¡Listo!",
    sentBody: "En breve recibirá el dossier técnico y la documentación en su email.",
  },
  footer: {
    blurb: "Sistemas de detección y señalización activa de fauna en carretera.",
    tagline: "Detectar la fauna. Proteger a las personas.",
    navTitle: "Navegación", contactTitle: "Contacto",
    rights: "© 2026 AVIZOR Fauna · TEVA. Todos los derechos reservados.",
    legal: "Aviso legal · Privacidad · Cookies",
  },
};

const en: Dict = {
  nav: { problema: "The problem", gama: "The range", plataforma: "Platform", referencias: "References", contacto: "Contact" },
  hero: {
    eyebrow: "Intelligent wildlife detection · Active signage",
    titleA: "From static warning",
    titleB: "to smart warning.",
    subtitle: "AVIZOR Fauna detects the presence of animals on the road and turns it, in real time, into active signage, a driver alert and useful data for the authorities.",
    ctaContact: "Get in touch",
    ctaSolutions: "See solutions",
    trust: "Authorities that already trust the technology",
  },
  flujo: {
    title: "Detect. Alert. Protect.",
    sub1: "In milliseconds, ",
    sub2: " turns the presence of an animal into an actionable alert for the driver and the control centre.",
    steps: [
      { title: "Detect", sub: "Millimetre precision" },
      { title: "Alert", sub: "Real-time warning" },
      { title: "Protect", sub: "Reduces the risk" },
    ],
  },
  problema: {
    label: "The problem",
    title: "Wildlife on the road is no longer an isolated accident.",
    subtitle: "Animal-related crashes rise year after year and cluster where traditional signage is no longer enough: conventional and interurban roads.",
    speciesTitle: "Species involved · 2024",
    source: "Source: Spanish Directorate-General of Traffic and Spanish Road Association (2024 data).",
    statLabels: [
      "wildlife-related crashes in 2024",
      "occur on interurban roads",
      "on conventional roads",
      "have doubled in the last decade",
    ],
    species: ["Wild boar", "Roe deer", "Canids", "Other species"],
  },
  gama: {
    label: "The range",
    title: "A solution for every stretch of road.",
    subtitle: "Each risk scenario calls for a different technology. Select the context and access the matching solution.",
    ambitoWord: "Context",
    comingSoon: "Coming soon",
    mapTitle: "Application example · Serra de Collserola",
    mapDesc: "Interactive 3D terrain map with the real Fauna-FO detection trace overlaid. Explore the relief, switch styles and toggle the data layers.",
    mapDescMobile: "Real detection trace on Sierra de Collserola, with one stretch per technology in the AVIZOR Fauna range.",
    expand: "↗ Expand map",
    collapse: "↙ Collapse map",
    mapLoading: "Loading map…",
    mapLegend: { fo: "Red · Fauna-FO", e: "Blue · Fauna-E", l: "Green · Fauna-L", b: "Purple · Fauna-B" },
    items: [
      {
        solName: "Buried optical fibre", ambito: "Long, open stretches", tagline: "Linear detection via C-OTDR",
        desc: "An optical fibre buried at the roadside detects the animal's disturbances and pinpoints the exact intrusion point, along kilometres of route with no blind spots. Ideal for long, open stretches, including TEFIVA.",
        specs: ["Up to 80 km per sensor · 1,440 sections", "Detection up to 20 m before the fibre; weather-immune", "30–40 cm trench, no barriers or power supply; no visual impact"],
        refs: [],
      },
      {
        solName: "Video analytics", ambito: "Junctions, access roads and discrete points", tagline: "IR camera + IVS",
        desc: "Camera with embedded video analytics and an 850 nm IR spotlight (IP68/IK10) that distinguishes animal, vehicle or person. Designed for motorway/expressway junctions, access roads and specific delimited points.",
        specs: ["Reliability > 96%; sections up to 30 m per unit", "Night detection via IR video (not thermal)", "< 18 W, solar-powered; dual-SIM 4G/5G router"],
        refs: ["JCyL · Somacyl — Sierra de Francia", "MITMA — 57 cameras on the A-4 and A-44 (Jaén and Granada)"],
      },
      {
        solName: "Multi-beam laser barrier", ambito: "Perimeters and recurring wildlife crossings", tagline: "Simultaneous break of 4 IR beams",
        desc: "Detectors on both verges form a continuous virtual perimeter by breaking four infrared laser beams. Ideal scenario: perimeters of open stretches and black spots / TEFIVA with minimal false alarms.",
        specs: ["Up to 200 m per detector; ignores vegetation, birds and small animals", "Latency < 1 s (LoRaWAN class C) + 4G/LTE", "Standalone, IP66 and DGT integration API"],
        refs: ["Junta de Castilla-La Mancha — laser barrier system"],
      },
      {
        solName: "VHF radio frequency", ambito: "Radio-tagged species (Iberian lynx)", tagline: "Reading the emitter collar",
        desc: "Detects radio-tagged species by capturing the VHF pulse from their collar via an omnidirectional antenna, band-pass filter and low-noise amplifier. Specific protection for threatened species, especially the Iberian lynx.",
        specs: ["148–173 MHz; reaction < 150 ms", "LED matrix ≥ 8,000 cd, visible at 300 m", "Weeks of autonomy (10 W panel + LiFePO₄)"],
        refs: ["MITMA / Junta de Andalucía — Iberian lynx conservation"],
      },
      {
        solName: "Deterrent beacon", ambito: "Winding, mountain roads", tagline: "Detects and deters",
        desc: "A modular, standalone edge-marker beacon that detects and deters wildlife on the roadway while warning the driver. Designed for active deterrence and point detection at road margins.",
        specs: ["Dual deterrence: LED + ultrasound (8–41 kHz, 135 dB)", "Doppler radar (25 m) and/or LIDAR (up to 150 m)", "Unique ID: lights only nearby beacons · PET (OC 06/2023)"],
        refs: ["DGT — presentation at a technical session"],
      },
    ],
  },
  plataforma: {
    label: "The platform · The value of data",
    title: "Every crossing becomes data. Every datum, a decision.",
    subtitle: "AVIZOR Fauna's differential value does not end on the road. Every detection feeds AVIZOR Cloud, a platform that aggregates, cleans and analyses wildlife activity over time, giving the authorities a clear reading of the risk. Signage protects today; data lets you plan for tomorrow.",
    deployLabel: "Platform in operation · A-4 and A-44 (Jaén and Granada)",
    items: [
      { k: "DATA & HISTORY", v: "Detections and activations by milepost; CSV/XML export." },
      { k: "SIGNAGE CONTROL", v: "Remote brightness and activation timing." },
      { k: "MONITORING", v: "Temperature, humidity, gateways and radio signal." },
      { k: "ENERGY", v: "Status and charge of solar batteries." },
      { k: "MAINTENANCE", v: "Real-time faults and OTA firmware updates." },
      { k: "SECURITY (ENS)", v: "User profiles; platform available 24×7." },
    ],
  },
  referencias: {
    label: "References · Success stories",
    title: "Technology already deployed with public authorities.",
    items: [
      { name: "MITMA · Junta de Andalucía", scope: "Early detection of the Iberian lynx via the collar's VHF radio frequency, with automatic activation of the signage.", points: ["Fencing and signage on roads in Seville and Córdoba: over 15 km of fencing, escape ramps, gates, informational panels and improved drainage crossings.", "Virtual fencing with light and sound emitters that activate when an animal nears the road and a vehicle approaches, deterring the crossing and warning the driver.", "Radio frequency: captures the VHF signal from the lynx's collar and activates cameras and LED signs only when it is present.", "Framed within the EU LIFE LynxConnect project for connectivity between Iberian lynx populations."] },
      { name: "JCyL · Somacyl — Sierra de Francia", scope: "Pilot intelligent-signage project on the SA-201 (Sierra de Francia, El Cabaco–El Casarito stretch, km 12+000–16+500). Artificial vision detects wildlife —mainly roe deer and wild boar— and activates dynamic signage in real time, warning drivers only when there is a real risk.", points: ["Experimental system, a first in Castilla y León, along 4 km of the SA-201 (El Cabaco–El Casarito).", "9 cameras and 11 warning signs, both visible-spectrum and thermal.", "Thermal spectrum: keeps working in low light, fog or snow and tells animals from people.", "On detecting wildlife, large luminous panels activate; the crossing is recorded and logged on the platform, with remote control and alerts to the control centre.", "A Junta de Castilla y León project with TEVA and the University of Salamanca."] },
      { name: "Junta de Castilla-La Mancha", scope: "Detection via laser barriers with automatic warnings for road safety.", points: ["Multi-beam laser barriers deployed at wildlife black spots on the regional road network, with simultaneous breaking of four infrared beams to minimise false alarms.", "Detection range of up to 200 m per unit; filters out vegetation, birds and small animals, focusing the alert on real-risk crossings.", "Breaking the beam automatically activates warning signage on the stretch itself, alerting the driver in real time.", "Low-latency (< 1 s) LoRaWAN communication backed up by 4G/LTE; autonomous, IP66-rated units built for the outdoors."] },
      { name: "MITMA · A-4 and A-44 (Jaén and Granada)", scope: "A-4 / A-44 corridor in Jaén and Granada. Spain's Ministry of Transport is driving works to improve road safety and wildlife protection on the A-4, A-32 and A-44 motorways and the N-323 road, funded by the EU NextGenerationEU programme.", points: ["57 video and infrared cameras deployed across ≈14 junctions; live portal avizor-fauna.tecnologiasviales.com.", "Animal-detection systems with luminous warning panels and lit P-24 signs at the junctions.", "Upgraded fencing and escape ramps to keep wildlife off the carriageway.", "Acoustic and optical deterrents and lynx-presence warning signs."] },
      { name: "DGT", scope: "Directorate-General of Traffic — presentation of the LIDAR wildlife detection and warning beacon, connected to DGT 3.0.", points: ["Control and deterrent beacons: as a vehicle approaches, they warn the driver and scare wildlife away with light and sound. They only activate with traffic, so animals cross freely when there is none.", "Game fencing + technology: a conventional fence with ~100 m gaps at wildlife crossings, where cameras detect the animal and alert the driver.", "Virtual fencing: devices that detect headlights at 200 m and emit signals to stop the animal, without blocking the crossing when there is no traffic."] },
    ],
  },
  contacto: {
    label: "Contact",
    title: "Get the technical dossier and documentation for AVIZOR Fauna.",
    subtitle: "Reference cases, technical specifications and the latest product updates, straight to your inbox.",
    personLabel: "Contact person", phoneLabel: "Phone", emailLabel: "Email", addressLabel: "Address",
    formTitle: "Receive our documentation",
    formBody: "Leave your email and we'll send you the PDF dossier plus the rest of the informational material.",
    perks: [
      "Technical dossier in PDF",
      "Reference cases with public administrations",
      "Product and regulation updates",
    ],
    fEmail: "Email", pEmail: "name@authority.es",
    submit: "Send me the documentation",
    sending: "Sending…",
    error: "Couldn't send it. Please try again in a few minutes.",
    privacy: "Your data will be processed in accordance with current data protection regulations. We will only use your email to send you the requested documentation and, if you wish, future updates. You can unsubscribe at any time.",
    sentTitle: "All set!",
    sentBody: "You'll receive the technical dossier and documentation in your inbox shortly.",
  },
  footer: {
    blurb: "Wildlife detection and active signage systems for roads.",
    tagline: "Detect the wildlife. Protect the people.",
    navTitle: "Navigation", contactTitle: "Contact",
    rights: "© 2026 AVIZOR Fauna · TEVA. All rights reserved.",
    legal: "Legal notice · Privacy · Cookies",
  },
};

const pt: Dict = {
  nav: { problema: "O problema", gama: "A gama", plataforma: "Plataforma", referencias: "Referências", contacto: "Contacto" },
  hero: {
    eyebrow: "Deteção inteligente de fauna · Sinalização ativa",
    titleA: "Do aviso permanente",
    titleB: "ao aviso inteligente.",
    subtitle: "A AVIZOR Fauna deteta a presença de animais na estrada e transforma-a, em tempo real, em sinalização ativa, num alerta para o condutor e em dados úteis para a administração.",
    ctaContact: "Entrar em contacto",
    ctaSolutions: "Ver soluções",
    trust: "Administrações que já confiam na tecnologia",
  },
  flujo: {
    title: "Deteta. Alerta. Protege.",
    sub1: "Em milissegundos, ",
    sub2: " transforma a presença de um animal num alerta acionável para o condutor e o centro de controlo.",
    steps: [
      { title: "Deteta", sub: "Precisão milimétrica" },
      { title: "Alerta", sub: "Aviso em tempo real" },
      { title: "Protege", sub: "Reduz o risco" },
    ],
  },
  problema: {
    label: "O problema",
    title: "A fauna na estrada deixou de ser um acidente pontual.",
    subtitle: "Os sinistros com animais crescem ano após ano e concentram-se onde a sinalização tradicional já não basta: a via convencional e interurbana.",
    speciesTitle: "Espécies envolvidas · 2024",
    source: "Fonte: Direção-Geral de Tráfego e Associação Espanhola da Estrada (dados de 2024).",
    statLabels: [
      "sinistros relacionados com fauna em 2024",
      "ocorrem em vias interurbanas",
      "em estradas convencionais",
      "duplicaram na última década",
    ],
    species: ["Javalis", "Corços", "Canídeos", "Outras espécies"],
  },
  gama: {
    label: "A gama",
    title: "Uma solução para cada troço da via.",
    subtitle: "Cada cenário de risco exige uma tecnologia diferente. Selecione o contexto e aceda à solução correspondente.",
    ambitoWord: "Contexto",
    comingSoon: "Em breve",
    mapTitle: "Exemplo de aplicação · Serra de Collserola",
    mapDesc: "Mapa 3D interativo do terreno com o traçado real de deteção Fauna-FO sobreposto. Explore o relevo, mude de estilo e ative as camadas de dados.",
    mapDescMobile: "Traçado real de deteção na Sierra de Collserola, com um troço por cada tecnologia da gama AVIZOR Fauna.",
    expand: "↗ Expandir mapa",
    collapse: "↙ Recolher mapa",
    mapLoading: "A carregar o mapa…",
    mapLegend: { fo: "Vermelho · Fauna-FO", e: "Azul · Fauna-E", l: "Verde · Fauna-L", b: "Roxo · Fauna-B" },
    items: [
      {
        solName: "Fibra ótica enterrada", ambito: "Troços longos e abertos", tagline: "Deteção linear por C-OTDR",
        desc: "Uma fibra ótica enterrada na berma da via deteta as alterações provocadas pelo animal e localiza o ponto exato da intrusão, ao longo de quilómetros de traçado e sem pontos cegos. Ideal para troços longos e abertos, incluindo os TEFIVA.",
        specs: ["Até 80 km por sensor · 1.440 secções", "Deteção até 20 m antes da fibra; imune ao clima", "Vala de 30–40 cm, sem barreiras nem alimentação; sem impacto visual"],
        refs: [],
      },
      {
        solName: "Analítica de vídeo", ambito: "Nós, acessos e pontos discretos", tagline: "Câmara IV + IVS",
        desc: "Câmara com analítica de vídeo integrada e foco IV de 850 nm (IP68/IK10) que distingue animal, veículo ou pessoa. Pensada para nós de autoestrada/via rápida, acessos e pontos concretos delimitados.",
        specs: ["Fiabilidade > 96%; secções até 30 m por equipamento", "Deteção noturna por vídeo com IV (não térmica)", "< 18 W, autonomia solar; router 4G/5G de duplo SIM"],
        refs: ["JCyL · Somacyl — Sierra de Francia", "MITMA — 57 câmaras na A-4 e A-44 (Jaén e Granada)"],
      },
      {
        solName: "Barreira laser multifeixe", ambito: "Perímetros e passagens recorrentes de fauna", tagline: "Corte simultâneo de 4 feixes IV",
        desc: "Detetores em ambas as margens formam um perímetro virtual contínuo pelo corte de quatro feixes laser infravermelhos. Cenário ideal: perímetros de troços abertos e pontos negros / TEFIVA com falso alarme mínimo.",
        specs: ["Até 200 m por detetor; ignora vegetação, aves e pequeno porte", "Latência < 1 s (LoRaWAN classe C) + 4G/LTE", "Autónomo, IP66 e API de integração com a DGT"],
        refs: ["Junta de Castilla-La Mancha — sistema de barreiras laser"],
      },
      {
        solName: "Radiofrequência VHF", ambito: "Espécies radiomarcadas (lince-ibérico)", tagline: "Leitura da coleira emissora",
        desc: "Deteta espécies radiomarcadas captando o impulso VHF da sua coleira através de antena omnidirecional, filtro passa-banda e amplificador de baixo ruído. Proteção específica de espécies ameaçadas, em especial o lince-ibérico.",
        specs: ["148–173 MHz; reação < 150 ms", "Matriz LED ≥ 8.000 cd, visível a 300 m", "Semanas de autonomia (painel 10 W + LiFePO₄)"],
        refs: ["MITMA / Junta de Andalucía — conservação do lince-ibérico"],
      },
      {
        solName: "Baliza dissuasora", ambito: "Traçados sinuosos e de montanha", tagline: "Deteta e dissuade",
        desc: "Baliza modular e autónoma, em forma de marco de aresta, que deteta e dissuade a fauna na faixa de rodagem enquanto avisa o condutor. Pensada para dissuasão ativa e deteção pontual nas bermas.",
        specs: ["Dupla dissuasão: LED + ultrassons (8–41 kHz, 135 dB)", "Radar Doppler (25 m) e/ou LIDAR (até 150 m)", "Identificador único: acende apenas balizas próximas · PET (OC 06/2023)"],
        refs: ["DGT — apresentação em jornada técnica"],
      },
    ],
  },
  plataforma: {
    label: "A plataforma · O valor dos dados",
    title: "Cada travessia torna-se um dado. Cada dado, numa decisão.",
    subtitle: "O valor diferencial da AVIZOR Fauna não termina na estrada. Cada deteção alimenta o AVIZOR Cloud, uma plataforma que agrega, depura e analisa a atividade de fauna ao longo do tempo e devolve à administração uma leitura clara do risco. A sinalização protege hoje; os dados permitem planear amanhã.",
    deployLabel: "Plataforma operacional · A-4 e A-44 (Jaén e Granada)",
    items: [
      { k: "DADOS E HISTÓRICO", v: "Deteções e ativações por p.k.; exportação CSV/XML." },
      { k: "CONTROLO DE SINALIZAÇÃO", v: "Brilho e tempos de ativação em remoto." },
      { k: "MONITORIZAÇÃO", v: "Temperatura, humidade, gateways e sinal rádio." },
      { k: "ENERGIA", v: "Estado e carga das baterias solares." },
      { k: "MANUTENÇÃO", v: "Avarias em tempo real e atualizações de firmware OTA." },
      { k: "SEGURANÇA (ENS)", v: "Perfis de utilizador; plataforma disponível 24×7." },
    ],
  },
  referencias: {
    label: "Referências · Casos de sucesso",
    title: "Tecnologia já implementada com a administração.",
    items: [
      { name: "MITMA · Junta de Andalucía", scope: "Deteção precoce do lince-ibérico através da radiofrequência VHF da coleira, com ativação automática da sinalização.", points: ["Vedação e sinalização em estradas de Sevilha e Córdova: mais de 15 km de vedação, rampas de escape, portões, painéis informativos e melhoria das passagens de drenagem.", "Vedação virtual com emissores de luz e som que se ativam quando um animal se aproxima da via e chega um veículo, dissuadindo a passagem e avisando o condutor.", "Radiofrequência: capta o sinal VHF da coleira do lince e ativa câmaras e sinais LED apenas perante a sua presença.", "Enquadrado no projeto europeu LIFE LynxConnect de conectividade entre populações de lince-ibérico."] },
      { name: "JCyL · Somacyl — Sierra de Francia", scope: "Projeto-piloto de sinalização inteligente na SA-201 (Sierra de Francia, troço El Cabaco–El Casarito, p.k. 12+000–16+500). A visão artificial deteta a fauna —sobretudo corços e javalis— e ativa a sinalização dinâmica em tempo real, avisando apenas perante risco real.", points: ["Sistema experimental, pioneiro em Castela e Leão, num troço de 4 km da SA-201 (El Cabaco–El Casarito).", "9 câmaras e 11 sinais de aviso, de espetro visível e térmicos.", "Espetro térmico: mantém-se operacional com baixa luminosidade, nevoeiro ou neve e distingue animais de pessoas.", "Ao detetar fauna ativam-se grandes painéis luminosos; a passagem é gravada e registada na plataforma, com controlo remoto e alarmes ao centro de controlo.", "Projeto da Junta de Castilla y León com a TEVA e a Universidade de Salamanca."] },
      { name: "Junta de Castilla-La Mancha", scope: "Deteção por barreiras laser com avisos automáticos para a segurança rodoviária.", points: ["Barreiras laser multifeixe instaladas em pontos negros de fauna da rede de estradas regional, com corte simultâneo de quatro feixes infravermelhos para minimizar falsos alarmes.", "Deteção até 200 m por equipamento; descarta vegetação, aves e fauna de pequeno porte, concentrando o aviso nas passagens de risco real.", "Ao cortar o feixe ativa-se automaticamente a sinalização de aviso no próprio troço, alertando o condutor em tempo real.", "Comunicação de baixa latência (< 1 s) via LoRaWAN com apoio 4G/LTE; equipamentos autónomos e IP66, preparados para intempéries."] },
      { name: "MITMA · A-4 e A-44 (Jaén e Granada)", scope: "Corredor A-4 / A-44 em Jaén e Granada. O Ministério dos Transportes promove obras de melhoria da segurança rodoviária e proteção da fauna nas autovias A-4, A-32 e A-44 e na estrada N-323, financiadas pelo programa europeu NextGenerationEU.", points: ["57 câmaras de vídeo e infravermelhas implementadas em ≈14 nós; portal operacional avizor-fauna.tecnologiasviales.com.", "Sistemas de deteção de animais com painéis luminosos de aviso e sinais P-24 luminosos nos nós.", "Melhoria das vedações e rampas de escape para evitar o acesso da fauna à via.", "Dissuasores acústicos e óticos e cartazes de presença de lince."] },
      { name: "DGT", scope: "Direção-Geral de Tráfego — apresentação da baliza LIDAR de deteção e aviso de fauna, ligada à DGT 3.0.", points: ["Balizas de controlo e dissuasoras: ao aproximar-se um veículo, avisam o condutor e afugentam a fauna com luz e som. Só se ativam com tráfego, para que os animais atravessem livremente quando não o há.", "Vedação cinegética + tecnologia: vedação convencional com aberturas de ~100 m em passagens de fauna, onde câmaras detetam o animal e alertam o condutor.", "Vedação virtual: dispositivos que detetam os faróis a 200 m e emitem sinais para travar o animal, sem bloquear a passagem quando não há tráfego."] },
    ],
  },
  contacto: {
    label: "Contacto",
    title: "Receba o dossiê técnico e a documentação da AVIZOR Fauna.",
    subtitle: "Casos de referência, especificações técnicas e as últimas novidades do produto, diretamente no seu email.",
    personLabel: "Pessoa de contacto", phoneLabel: "Telefone", emailLabel: "Email", addressLabel: "Morada",
    formTitle: "Receba a nossa documentação",
    formBody: "Deixe-nos o seu email e enviaremos o dossiê técnico em PDF e o restante material informativo.",
    perks: [
      "Dossiê técnico em PDF",
      "Casos de referência com administrações",
      "Novidades de produto e regulamentação",
    ],
    fEmail: "Email", pEmail: "nome@administracao.pt",
    submit: "Quero receber a documentação",
    sending: "A enviar…",
    error: "Não foi possível enviar. Tente novamente dentro de alguns minutos.",
    privacy: "Os seus dados serão tratados de acordo com a legislação de proteção de dados em vigor. Utilizaremos o seu email apenas para lhe enviar a documentação solicitada e, se desejar, futuras novidades. Pode cancelar a subscrição quando quiser.",
    sentTitle: "Pronto!",
    sentBody: "Em breve receberá o dossiê técnico e a documentação no seu email.",
  },
  footer: {
    blurb: "Sistemas de deteção e sinalização ativa de fauna na estrada.",
    tagline: "Detetar a fauna. Proteger as pessoas.",
    navTitle: "Navegação", contactTitle: "Contacto",
    rights: "© 2026 AVIZOR Fauna · TEVA. Todos os direitos reservados.",
    legal: "Aviso legal · Privacidade · Cookies",
  },
};

const ca: Dict = {
  nav: { problema: "El problema", gama: "La gamma", plataforma: "Plataforma", referencias: "Referències", contacto: "Contacte" },
  hero: {
    eyebrow: "Detecció intel·ligent de fauna · Senyalització activa",
    titleA: "De l'avís permanent",
    titleB: "a l'avís intel·ligent.",
    subtitle: "AVIZOR Fauna detecta la presència d'animals a la carretera i la converteix, en temps real, en senyalització activa, en alarma per al conductor i en dada útil per a l'administració.",
    ctaContact: "Posar-se en contacte",
    ctaSolutions: "Veure solucions",
    trust: "Administracions que ja confien en la tecnologia",
  },
  flujo: {
    title: "Detecta. Alerta. Protegeix.",
    sub1: "En mil·lisegons, ",
    sub2: " transforma la presència d'un animal en una alerta accionable per al conductor i el centre de control.",
    steps: [
      { title: "Detecta", sub: "Precisió mil·limètrica" },
      { title: "Alerta", sub: "Avís en temps real" },
      { title: "Protegeix", sub: "Redueix el risc" },
    ],
  },
  problema: {
    label: "El problema",
    title: "La fauna a la carretera ha deixat de ser un accident puntual.",
    subtitle: "Els sinistres amb animals creixen any rere any i es concentren allà on la senyalització tradicional ja no basta: la via convencional i interurbana.",
    speciesTitle: "Espècies implicades · 2024",
    source: "Font: Direcció General de Trànsit i Associació Espanyola de la Carretera (dades del 2024).",
    statLabels: [
      "sinistres relacionats amb fauna el 2024",
      "es produeixen en vies interurbanes",
      "en carreteres convencionals",
      "s'han duplicat en l'última dècada",
    ],
    species: ["Senglars", "Cabirols", "Cànids", "Altres espècies"],
  },
  gama: {
    label: "La gamma",
    title: "Una solució per a cada tram de la via.",
    subtitle: "Cada escenari de risc demana una tecnologia diferent. Seleccioneu el context i accediu a la solució corresponent.",
    ambitoWord: "Context",
    comingSoon: "Pròximament",
    mapTitle: "Exemple d'aplicació · Serra de Collserola",
    mapDesc: "Mapa 3D interactiu del terreny amb la traça real de detecció Fauna-FO superposada. Exploreu el relleu, canvieu d'estil i activeu les capes de dades.",
    mapDescMobile: "Traça real de detecció a la Serra de Collserola, amb un tram per a cada tecnologia de la gamma AVIZOR Fauna.",
    expand: "↗ Ampliar mapa",
    collapse: "↙ Reduir mapa",
    mapLoading: "S'està carregant el mapa…",
    mapLegend: { fo: "Vermell · Fauna-FO", e: "Blau · Fauna-E", l: "Verd · Fauna-L", b: "Morat · Fauna-B" },
    items: [
      {
        solName: "Fibra òptica enterrada", ambito: "Trams llargs i oberts", tagline: "Detecció lineal per C-OTDR",
        desc: "Una fibra òptica enterrada a la vora de la via detecta les alteracions de l'animal i localitza el punt exacte de la intrusió, al llarg de quilòmetres de traçat i sense punts cecs. Ideal per a trams llargs i oberts, inclosos els TEFIVA.",
        specs: ["Fins a 80 km per sensor · 1.440 seccions", "Detecció fins a 20 m abans de la fibra; immune al clima", "Rasa de 30–40 cm, sense barreres ni escomesa; sense impacte visual"],
        refs: [],
      },
      {
        solName: "Analítica de vídeo", ambito: "Enllaços, accessos i punts discrets", tagline: "Càmera IR + IVS",
        desc: "Càmera amb analítica de vídeo integrada i focus IR de 850 nm (IP68/IK10) que distingeix animal, vehicle o persona. Pensada per a enllaços d'autovia/autopista, accessos i punts concrets delimitats.",
        specs: ["Fiabilitat > 96%; seccions de fins a 30 m per equip", "Detecció nocturna per vídeo amb IR (no tèrmica)", "< 18 W, autonomia solar; router 4G/5G de doble SIM"],
        refs: ["JCyL · Somacyl — Sierra de Francia", "MITMA — 57 càmeres a l'A-4 i l'A-44 (Jaén i Granada)"],
      },
      {
        solName: "Barrera làser multifeix", ambito: "Perímetres i passos recurrents de fauna", tagline: "Tall simultani de 4 feixos IR",
        desc: "Detectors a banda i banda formen un perímetre virtual continu pel tall de quatre feixos làser infrarojos. Escenari idoni: perímetres de trams oberts i punts negres / TEFIVA amb falsa alarma mínima.",
        specs: ["Fins a 200 m per detector; descarta vegetació, ocells i fauna de petites dimensions", "Latència < 1 s (LoRaWAN classe C) + 4G/LTE", "Autònom, IP66 i API d'integració amb la DGT"],
        refs: ["Junta de Castilla-La Mancha — sistema de barreres làser"],
      },
      {
        solName: "Radiofreqüència VHF", ambito: "Espècies radiomarcades (linx ibèric)", tagline: "Lectura del collar emissor",
        desc: "Detecta espècies radiomarcades captant el pols VHF del seu collar mitjançant antena omnidireccional, filtre passabanda i amplificador de baix soroll. Protecció específica d'espècies amenaçades, en especial el linx ibèric.",
        specs: ["148–173 MHz; reacció < 150 ms", "Matriu LED ≥ 8.000 cd, visible a 300 m", "Setmanes d'autonomia (panell 10 W + LiFePO₄)"],
        refs: ["MITMA / Junta de Andalucía — conservació del linx ibèric"],
      },
      {
        solName: "Balisa dissuasòria", ambito: "Traçats sinuosos i de muntanya", tagline: "Detecta i dissuadeix",
        desc: "Balisa modular i autònoma, amb forma de fita d'aresta, que detecta i dissuadeix la fauna a la calçada alhora que avisa el conductor. Pensada per a la dissuasió activa i la detecció puntual als marges de carretera.",
        specs: ["Doble dissuasió: LED + ultrasons (8–41 kHz, 135 dB)", "Radar Doppler (25 m) i/o LIDAR (fins a 150 m)", "Identificador únic: encén només balises properes · PET (OC 06/2023)"],
        refs: ["DGT — presentació en jornada tècnica"],
      },
    ],
  },
  plataforma: {
    label: "La plataforma · El valor de la dada",
    title: "Cada encreuament es converteix en una dada. Cada dada, en una decisió.",
    subtitle: "El valor diferencial d'AVIZOR Fauna no acaba a la carretera. Cada detecció alimenta AVIZOR Cloud, una plataforma que agrega, depura i analitza l'activitat de fauna al llarg del temps, i retorna a l'administració una lectura clara del risc. La senyalització protegeix avui; la dada permet planificar demà.",
    deployLabel: "Plataforma operativa · A-4 i A-44 (Jaén i Granada)",
    items: [
      { k: "DADES I HISTÒRIC", v: "Deteccions i encesos per p.k.; exportació CSV/XML." },
      { k: "CONTROL DE SENYALITZACIÓ", v: "Brillantor i temps d'encès en remot." },
      { k: "MONITORATGE", v: "Temperatura, humitat, gateways i senyal ràdio." },
      { k: "ENERGIA", v: "Estat i càrrega de bateries solars." },
      { k: "MANTENIMENT", v: "Avaries en temps real i actualitzacions de firmware OTA." },
      { k: "SEGURETAT (ENS)", v: "Perfils d'usuari; plataforma disponible 24×7." },
    ],
  },
  referencias: {
    label: "Referències · Casos d'èxit",
    title: "Tecnologia ja desplegada amb l'administració.",
    items: [
      { name: "MITMA · Junta de Andalucía", scope: "Detecció precoç del linx ibèric mitjançant la radiofreqüència VHF del collar, amb activació automàtica de la senyalització.", points: ["Tancament i senyalització a carreteres de Sevilla i Còrdova: més de 15 km de tancament, rampes d'escapament, portells, panells informatius i millora dels passos de drenatge.", "Tancament virtual amb emissors de llum i so que s'activen quan un animal s'acosta a la via i arriba un vehicle, dissuadint el creuament i avisant el conductor.", "Radiofreqüència: capta el senyal VHF del collar del linx i activa càmeres i senyals LED només davant la seva presència.", "Emmarcat en el projecte europeu LIFE LynxConnect de connectivitat entre poblacions de linx ibèric."] },
      { name: "JCyL · Somacyl — Sierra de Francia", scope: "Projecte pilot de senyalització intel·ligent a la SA-201 (Sierra de Francia, tram El Cabaco–El Casarito, p.k. 12+000–16+500). La visió artificial detecta la fauna —sobretot cabirols i senglars— i activa la senyalització dinàmica en temps real, avisant només davant risc real.", points: ["Sistema experimental, pioner a Castella i Lleó, en un tram de 4 km de la SA-201 (El Cabaco–El Casarito).", "9 càmeres i 11 senyals d'avís, d'espectre visible i tèrmics.", "Espectre tèrmic: continua operatiu amb baixa il·luminació, boira o neu i distingeix animals de persones.", "En detectar fauna s'activen grans panells lluminosos; el pas es grava i es registra a la plataforma, amb control remot i alarmes al centre de control.", "Projecte de la Junta de Castilla y León amb TEVA i la Universitat de Salamanca."] },
      { name: "Junta de Castilla-La Mancha", scope: "Detecció per barreres làser amb avisos automàtics per a la seguretat viària.", points: ["Barreres làser multifeix desplegades en punts negres de fauna de la xarxa de carreteres autonòmica, amb tall simultani de quatre feixos infrarojos per minimitzar falses alarmes.", "Detecció fins a 200 m per equip; descarta vegetació, ocells i fauna de mida petita, centrant l'avís en els encreuaments de risc real.", "En tallar-se el feix s'activa automàticament la senyalització d'avís al mateix tram, alertant el conductor en temps real.", "Comunicació de baixa latència (< 1 s) per LoRaWAN amb suport 4G/LTE; equips autònoms i IP66, preparats per a la intempèrie."] },
      { name: "MITMA · A-4 i A-44 (Jaén i Granada)", scope: "Corredor A-4 / A-44 a Jaén i Granada. El Ministeri de Transports impulsa obres de millora de la seguretat viària i protecció de la fauna a les autovies A-4, A-32 i A-44 i a la N-323, finançades pel programa europeu NextGenerationEU.", points: ["57 càmeres de vídeo i infraroges desplegades en ≈14 enllaços; portal operatiu avizor-fauna.tecnologiasviales.com.", "Sistemes de detecció d'animals amb panells lluminosos d'advertiment i senyals P-24 lluminosos als enllaços.", "Millora dels tancaments i rampes d'escapament per evitar l'accés de la fauna a la calçada.", "Dissuasors acústics i òptics i cartells de presència de linx."] },
      { name: "DGT", scope: "Direcció General de Trànsit — presentació de la balisa LIDAR de detecció i avís de fauna, connectada a la DGT 3.0.", points: ["Balises de control i dissuasòries: en apropar-se un vehicle, avisen el conductor i espanten la fauna amb llum i so. Només s'activen amb trànsit, així els animals creuen lliurement quan no n'hi ha.", "Tancament cinegètic + tecnologia: tanca convencional amb obertures de ~100 m en passos de fauna, on càmeres detecten l'animal i alerten el conductor.", "Tancament virtual: dispositius que detecten els fars a 200 m i emeten senyals per frenar l'animal, sense bloquejar el pas quan no hi ha trànsit."] },
    ],
  },
  contacto: {
    label: "Contacte",
    title: "Rebeu el dossier tècnic i la documentació d'AVIZOR Fauna.",
    subtitle: "Casos de referència, especificacions tècniques i les últimes novetats del producte, directament al vostre correu.",
    personLabel: "Persona de contacte", phoneLabel: "Telèfon", emailLabel: "Email", addressLabel: "Adreça",
    formTitle: "Rebeu la nostra documentació",
    formBody: "Deixeu-nos el vostre email i us enviarem el dossier tècnic en PDF i la resta de material informatiu.",
    perks: [
      "Dossier tècnic en PDF",
      "Casos de referència amb administracions",
      "Novetats de producte i normativa",
    ],
    fEmail: "Email", pEmail: "nom@administracio.cat",
    submit: "Vull rebre la documentació",
    sending: "Enviant…",
    error: "No s'ha pogut enviar. Torneu-ho a provar d'aquí a uns minuts.",
    privacy: "Les vostres dades es tractaran d'acord amb la normativa vigent de protecció de dades. Només utilitzarem el vostre email per enviar-vos la documentació sol·licitada i, si ho voleu, futures novetats. Us podreu donar de baixa quan vulgueu.",
    sentTitle: "Fet!",
    sentBody: "Rebreu el dossier tècnic i la documentació al vostre email en breu.",
  },
  footer: {
    blurb: "Sistemes de detecció i senyalització activa de fauna a la carretera.",
    tagline: "Detectar la fauna. Protegir les persones.",
    navTitle: "Navegació", contactTitle: "Contacte",
    rights: "© 2026 AVIZOR Fauna · TEVA. Tots els drets reservats.",
    legal: "Avís legal · Privadesa · Galetes",
  },
};

export const translations: Record<Lang, Dict> = { es, en, pt, ca };
