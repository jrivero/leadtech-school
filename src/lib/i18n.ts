/** Locale-neutral IDs keep bookmarks and learning progress stable across languages. */
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export function homeHref(locale: Locale): string {
  return locale === 'en' ? '/en/' : '/';
}
export function lessonHref(id: string, locale: Locale): string {
  return `${locale === 'en' ? '/en/lessons/' : '/lecciones/'}${id}/`;
}
export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
