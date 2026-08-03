export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

/** Slugs localizados por página. La clave es estable; el slug, traducible. */
export const routes = {
  es: {
    home: '',
    experiencias: 'experiencias',
    compania: 'compania',
    contacto: 'contacto',
    privacidad: 'legal/privacidad',
    terminos: 'legal/terminos',
    cookies: 'legal/cookies',
  },
  en: {
    home: '',
    experiencias: 'experiences',
    compania: 'company',
    contacto: 'contact',
    privacidad: 'legal/privacy',
    terminos: 'legal/terms',
    cookies: 'legal/cookies',
  },
} as const;

export type PageKey = keyof (typeof routes)['es'];

export function localePath(lang: Lang, key: PageKey, hash = ''): string {
  const slug = routes[lang][key];
  return `/${lang}/${slug ? `${slug}/` : ''}${hash}`;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export const ui = {
  es: {
    'site.name': 'Numen Games',
    'site.tagline': 'Estructuras de juego y sistemas narrativos para eventos',
    'site.description':
      'Numen Games diseña estructuras narrativas y dinámicas gamificadas que convierten eventos en sistemas de relación: conexiones relevantes, leads cualificados y orientación.',
    'nav.experiencias': 'Experiencias',
    'nav.compania': 'Compañía',
    'nav.contacto': 'Contacto',
    'nav.label': 'Navegación principal',
    'nav.langSwitch': 'Read in English',
    'theme.toggle': 'Cambiar tema de color',
    'theme.dark': 'Tema oscuro activado',
    'theme.light': 'Tema claro activado',

    'hero.l1': 'Esto no es para ti.',
    'hero.l2': 'Es para aventureros.',
    'hero.p1':
      'Para quienes sienten —aunque no sepan explicarlo— que algo en la forma de encontrarse, participar y conectar en un evento… está roto.',
    'hero.p2': 'Si buscas una solución… vuelve atrás.',
    'hero.p3': 'Si buscas una experiencia… sigue.',
    'hero.cta': 'Entrar',

    'acts.1': 'Acto I · Planteamiento',
    'acts.2': 'Acto II · Nudo',
    'acts.3': 'Acto III · Desenlace',

    'journey.label': 'Progreso del viaje',
    'journey.goto': 'Ir al acto',
    'journey.reset': 'Reiniciar el viaje',
    'journey.resetDone': 'Viaje reiniciado. Vuelves al umbral.',
    'journey.act.enter': 'Entras en el',

    'umbral.cta.evento': 'Entrar con tu evento',
    'umbral.cta.oraculo': 'Hablar con un Oráculo',
    'umbral.cta.explorar': 'Explorar la experiencia',

    'footer.motto': 'Leave things better than we found them.',
    'footer.legal': 'Legal',
    'footer.version': 'versión',
    'footer.sigil': 'Numinia no fue creada. Fue recordada.',

    'cookies.text':
      'Esta web no usa cookies de rastreo. Guardamos tu progreso y preferencias en tu navegador.',
    'cookies.more': 'Saber más',
    'cookies.ok': 'Entendido',

    'a11y.skip': 'Saltar al contenido',
    'a11y.choiceMade': 'Has elegido',
    'choice.if': 'Si eliges',
  },
  en: {
    'site.name': 'Numen Games',
    'site.tagline': 'Game structures and narrative systems for events',
    'site.description':
      'Numen Games designs narrative structures and gamified dynamics that turn events into relationship systems: relevant connections, qualified leads and orientation.',
    'nav.experiencias': 'Experiences',
    'nav.compania': 'Company',
    'nav.contacto': 'Contact',
    'nav.label': 'Main navigation',
    'nav.langSwitch': 'Leer en español',
    'theme.toggle': 'Toggle colour theme',
    'theme.dark': 'Dark theme on',
    'theme.light': 'Light theme on',

    'hero.l1': 'This is not for you.',
    'hero.l2': 'It is for adventurers.',
    'hero.p1':
      'For those who feel — even if they cannot explain it — that something about how we meet, take part and connect at events… is broken.',
    'hero.p2': 'If you are looking for a solution… turn back.',
    'hero.p3': 'If you are looking for an experience… go on.',
    'hero.cta': 'Enter',

    'acts.1': 'Act I · Setup',
    'acts.2': 'Act II · Confrontation',
    'acts.3': 'Act III · Resolution',

    'journey.label': 'Journey progress',
    'journey.goto': 'Go to act',
    'journey.reset': 'Reset the journey',
    'journey.resetDone': 'Journey reset. Back to the threshold.',
    'journey.act.enter': 'You enter',

    'umbral.cta.evento': 'Enter with your event',
    'umbral.cta.oraculo': 'Talk to an Oracle',
    'umbral.cta.explorar': 'Explore the experience',

    'footer.motto': 'Leave things better than we found them.',
    'footer.legal': 'Legal',
    'footer.version': 'version',
    'footer.sigil': 'Numinia was not created. It was remembered.',

    'cookies.text':
      'This site sets no tracking cookies. Your progress and preferences live in your browser.',
    'cookies.more': 'Learn more',
    'cookies.ok': 'Got it',

    'a11y.skip': 'Skip to content',
    'a11y.choiceMade': 'You chose',
    'choice.if': 'If you choose',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
