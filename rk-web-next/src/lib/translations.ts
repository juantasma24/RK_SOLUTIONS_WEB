import type { Lang } from "@/contexts/LanguageContext";

export const tr = {
  navbar: {
    es: {
      left:   [
        { label: "La Manzana",         href: "#que-hace" },
        { label: "Sobre Nosotros",      href: "#" },
        { label: "Soluciones",          href: "#" },
      ],
      right:  [
        { label: "Prensa",              href: "#" },
        { label: "Trabaja con Nosotros",href: "#" },
        { label: "Contacto",            href: "#contacto" },
      ],
      mobile: [
        { label: "Inicio",              href: "#inicio" },
        { label: "La Manzana",          href: "#que-hace" },
        { label: "Sobre Nosotros",      href: "#" },
        { label: "Soluciones",          href: "#" },
        { label: "Prensa",              href: "#" },
        { label: "Trabaja con Nosotros",href: "#" },
        { label: "Contacto",            href: "#contacto" },
      ],
      idioma: "Idioma", euskera: "Euskera", castellano: "Castellano",
      openMenu: "Abrir menú", closeMenu: "Cerrar menú",
    },
    eu: {
      left:   [
        { label: "La Manzana",          href: "#que-hace" },
        { label: "Guri buruz",          href: "#" },
        { label: "Soluzinoak",          href: "#" },
      ],
      right:  [
        { label: "Prentsea",            href: "#" },
        { label: "Lan egin guregaz",    href: "#" },
        { label: "Kontaktua",           href: "#contacto" },
      ],
      mobile: [
        { label: "Hasiera",             href: "#inicio" },
        { label: "La Manzana",          href: "#que-hace" },
        { label: "Guri buruz",          href: "#" },
        { label: "Soluzinoak",          href: "#" },
        { label: "Prentsea",            href: "#" },
        { label: "Lan egin guregaz",    href: "#" },
        { label: "Kontaktua",           href: "#contacto" },
      ],
      idioma: "Hizkuntza", euskera: "Euskerea", castellano: "Gaztelania",
      openMenu: "Menua zabaldu", closeMenu: "Menua itxi",
    },
  },

  hero: {
    es: {
      lines:       ["La Manzana,", "el software", "que entiende", "tu negocio."],
      socialStrong:"+3.000",
      socialText:  " usuarios\neligen La Manzana",
      cta:         "Descubre más",
    },
    eu: {
      lines:       ["La Manzana,", "zure negozioa", "ulertzen dauen", "softwarea."],
      socialStrong:"+3.000",
      socialText:  " erabiltzaile\nLa Manzana aukeratzen",
      cta:         "Jakin gehiago",
    },
  },

  queHace: {
    es: {
      titleParts: ["¿Qué hace", "La Manzana por ti?"],
      features: [
        { strong: "Gestiona",  rest: " tus ventas" },
        { strong: "Controla",  rest: " fichajes y horarios" },
        { strong: "Cumple",    rest: " con TicketBAI y VERI*FACTU" },
      ],
      ariaNext: "Ir a la siguiente sección",
    },
    eu: {
      titleParts: ["Zer egiten dau", "La Manzanak zuregaitik?"],
      features: [
        { strong: "Kudeatu",     rest: " zure salmentak" },
        { strong: "Kontrolatu",  rest: " fitxaketak eta ordutegiak" },
        { strong: "Bete",        rest: " TicketBAI eta VERI*FACTU araudiak" },
      ],
      ariaNext: "Hurrengo atalera joan",
    },
  },

  sectores: {
    es: {
      titleBreak1: "Control de venta y clientes,",
      titleBreak2: " todo conectado.",
      brand:       "That’s La Manzana",
      desc:        "El software de gestión para facturar, controlar, fichar y cumplir.",
      sectors: [
        { label: "Autónomos",  alt: "Autónomos"  },
        { label: "Hostelería", alt: "Hostelería"  },
        { label: "Comercio",   alt: "Comercio"    },
        { label: "Asesores",   alt: "Asesores"    },
      ],
      prevLabel: "Card anterior",
      nextLabel: "Card siguiente",
    },
    eu: {
      titleBreak1: "Salmenten eta bezeroen kontrola,",
      titleBreak2: " dana lotuta.",
      brand:       "Hori da La Manzana.",
      desc:        "Fakturatzeko, kontrolatzeko, fitxatzeko eta araudia betetzeko kudeaketa-softwarea.",
      sectors: [
        { label: "Autonomoak",    alt: "Autonomoak"    },
        { label: "Ostalaritzea",  alt: "Ostalaritzea"  },
        { label: "Merkataritzea", alt: "Merkataritzea" },
        { label: "Aholkulariak",  alt: "Aholkulariak"  },
      ],
      prevLabel: "Aurreko txartela",
      nextLabel: "Hurrengo txartela",
    },
  },

  pilares: {
    es: {
      words: [
        { w: "¿Por",      highlight: false },
        { w: "qué",       highlight: false },
        { w: "elegir",    highlight: false },
        { w: "La",        highlight: true  },
        { w: "Manzana?",  highlight: true  },
      ],
      pilares: [
        { alt: "Fácil de usar",    label: "Fácil de usar",     label2: null as string | null },
        { alt: "Soporte humano",   label: "Soporte",           label2: "humano 24/7" },
        { alt: "Se adapta",        label: "Se adapta a",       label2: "tu negocio" },
        { alt: "Cumple",           label: "Cumple la",         label2: "normativa" },
      ],
      counters: ["Manzanas", "Clientes", "Oficinas", "Años"],
      ariaNext: "Ir a la siguiente sección",
    },
    eu: {
      words: [
        { w: "Zergaitik",  highlight: false },
        { w: "aukeratu",   highlight: false },
        { w: "La",         highlight: true  },
        { w: "Manzana?",   highlight: true  },
      ],
      pilares: [
        { alt: "Erabilteko erraza",  label: "Erabilteko erraza",   label2: null as string | null },
        { alt: "Laguntza humanoa",   label: "Laguntza",            label2: "humanoa 24/7" },
        { alt: "Egokitzen da",       label: "Zure negoziora",      label2: "egokitzen da" },
        { alt: "Araudia beteten",    label: "Araudia",             label2: "beteten dau" },
      ],
      counters: ["Sagarrak", "Bezeroak", "Bulegoak", "Urteak"],
      ariaNext: "Hurrengo atalera joan",
    },
  },

  testimonios: {
    es: {
      title:    "Lo que dicen nuestros clientes",
      role:     "Cliente",
      prevLabel:"Testimonio anterior",
      nextLabel:"Testimonio siguiente",
    },
    eu: {
      title:    "Gure bezeroek diñoena",
      role:     "Bezeroa",
      prevLabel:"Aurreko testimonioa",
      nextLabel:"Hurrengo testimonioa",
    },
  },

  planes: {
    es: {
      titulo:    "Elige el plan\nque se adapte\na tu negocio",
      subtitulo: ["VERI*FACTU", " llega y adaptarse a tiempo ", "marca la diferencia."],
      premium:   [
        "TPV",
        "Fichas de cliente",
        "Control y realización de facturas",
        "Economía: gastos, presupuestos, empleados, etc.",
        "Personalización de pestañas",
      ],
      standard:  [
        "TPV",
        "Fichas de cliente",
        "Control y realización de facturas",
        "Economía: gastos, presupuestos, empleados, etc.",
      ],
      btn: "Quiero este plan",
      ariaNext: "Ir a la siguiente sección",
    },
    eu: {
      titulo:    "Aukeratu zure\nnegoziora egokitzen\ndan plana.",
      subtitulo: ["VERI*FACTU", " bidean da, eta garaiz egokitzea da ", "aldea markatzen dauena."],
      premium:   [
        "TPV",
        "Bezero-fitxak",
        "Fakturen kontrola eta kudeaketa",
        "Ekonomia: gastuak, aurrekontuak, langileak, etab.",
        "Fitxak pertsonalizetea",
      ],
      standard:  [
        "TPV",
        "Bezero-fitxak",
        "Fakturen kontrola eta kudeaketa",
        "Ekonomia: gastuak, aurrekontuak, langileak, etab.",
      ],
      btn: "Plan hau gura dot",
      ariaNext: "Hurrengo atalera joan",
    },
  },

  faq: {
    es: {
      title: "Resolvemos tus dudas antes de empezar.",
      items: [
        { q: "¿Qué es La Manzana y para qué sirve?",               a: "La Manzana es un software de gestión integral que unifica facturación, fichajes, TPV y cumplimiento normativo (TicketBAI y VERI*FACTU) en una sola plataforma. Diseñado para autónomos, hostelería y comercio." },
        { q: "¿Tengo un comercio, es para mí?",                    a: "Sí. La Manzana se adapta a cualquier tipo de comercio: retail, hostelería, servicios profesionales y más. Si necesitas gestionar ventas, fichajes o cumplir la normativa fiscal, es para ti." },
        { q: "¿Puedo usar La Manzana desde cualquier dispositivo?", a: "Sí. Funciona desde ordenador, tablet y móvil. Accede a todos tus datos en tiempo real desde cualquier lugar con conexión a internet." },
        { q: "¿Cumple con TicketBAI y VERI*FACTU?",                a: "Sí, al 100%. La Manzana está homologada y actualizada para cumplir con TicketBAI (País Vasco) y VERI*FACTU (resto de España). Nos encargamos de las actualizaciones normativas." },
        { q: "¿Es fácil de usar para alguien que no es técnico?",   a: "Totalmente. Si sabes enviar un correo electrónico, sabes usar La Manzana. Además, incluimos formación completa y soporte humano 24/7 para cualquier duda." },
        { q: "¿Puedo probar La Manzana antes de contratarla?",      a: "Sí. Ofrecemos 12 meses sin coste para que pruebes todas las funcionalidades sin compromiso. Déjanos tus datos y te contactamos para empezar." },
      ],
    },
    eu: {
      title: "Zure zalantzak argituko doguz hasi baino lehen.",
      items: [
        { q: "Zer da La Manzana eta zertarako balio dau?", a: "La Manzana kudeaketa integralerako software bat da: fakturazinoa, fitxaketak, TPVa eta araudia (TicketBAI eta VERI*FACTU) plataforma bakar baten batzen dituena. Autonomo, ostalaritza eta merkataritzako negozioentzat pentsatuta dago." },
        { q: "¿Tengo un comercio, es para mí?",                    a: "Sí. La Manzana se adapta a cualquier tipo de comercio: retail, hostelería, servicios profesionales y más. Si necesitas gestionar ventas, fichajes o cumplir la normativa fiscal, es para ti." },
        { q: "¿Puedo usar La Manzana desde cualquier dispositivo?", a: "Sí. Funciona desde ordenador, tablet y móvil. Accede a todos tus datos en tiempo real desde cualquier lugar con conexión a internet." },
        { q: "¿Cumple con TicketBAI y VERI*FACTU?",                a: "Sí, al 100%. La Manzana está homologada y actualizada para cumplir con TicketBAI (País Vasco) y VERI*FACTU (resto de España). Nos encargamos de las actualizaciones normativas." },
        { q: "¿Es fácil de usar para alguien que no es técnico?",   a: "Totalmente. Si sabes enviar un correo electrónico, sabes usar La Manzana. Además, incluimos formación completa y soporte humano 24/7 para cualquier duda." },
        { q: "¿Puedo probar La Manzana antes de contratarla?",      a: "Sí. Ofrecemos 12 meses sin coste para que pruebes todas las funcionalidades sin compromiso. Déjanos tus datos y te contactamos para empezar." },
      ],
    },
  },

  contacto: {
    es: {
      title:   { before: "Trabaja con", highlight: "La Manzana", sep: ",", line3: "sin coste", line4: "por 12 meses" },
      incluye: "INCLUYE:",
      items:   ["Software La Manzana", "Soporte técnico 24/7", "Acompañamiento y formación", "Fichaje horario integrado"],
      formIntro:   "Déjanos tus datos y te contamos cómo empezar con La Manzana",
      formIntroStrong: " sin coste el primer año.",
      placeholders: {
        name:     "Nombre y apellido",
        email:    "Correo electrónico",
        phone:    "Móvil",
        comunidad:"Comunidad autónoma",
      },
      privacyPre:  "He Leído y Acepto la ",
      privacyLink: "Política de Privacidad",
      privacyPost: ".",
      btn:         "Quiero saber más",
    },
    eu: {
      title:   { before: "Lan egin", highlight: "La Manzanagaz", sep: ",", line3: "kostu barik", line4: "12 hilean" },
      incluye: "BARNE:",
      items:   ["Software La Manzana", "Sostengu teknikoa 24/7", "Laguntza eta prestakuntza", "Ordutegi-fitxaketa integratua"],
      formIntro:   "Itxi guretzat zure datuak eta esango deutsugu zelan hasi La Manzanagaz",
      formIntroStrong: " lehenengo urtea doban (kostu barik).",
      placeholders: {
        name:     "Izen-abizenak",
        email:    "Posta elektronikoa",
        phone:    "Mugikorra",
        comunidad:"Autonomia-erkidegoa",
      },
      privacyPre:  "",
      privacyLink: "Pribatutasun-politika",
      privacyPost: " irakurri eta onartu dot.",
      btn:         "Gehiago jakin gura dot",
    },
  },
} satisfies Record<string, Record<Lang, unknown>>;

export type Translations = typeof tr;
