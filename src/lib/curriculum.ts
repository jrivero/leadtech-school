import { getCollection, type CollectionEntry } from 'astro:content';
import data from '../data/curriculum.json';
import englishMetadata from '../data/i18n/en.json';
import { lessonHref, type Locale } from './i18n';

export type CourseModule = (typeof data.modules)[number];
type LessonEntry = CollectionEntry<'lecciones'> | CollectionEntry<'englishLessons'>;
export type Lesson = LessonEntry['data'] & {
  id: string;
  slug: string;
  href: string;
  entry: LessonEntry;
};

const spanishEntries = await getCollection('lecciones');
const englishEntries = await getCollection('englishLessons');
const englishModuleFiles = import.meta.glob<{ default: CourseModule }>('../data/i18n/en/*.json', { eager: true });
const translatedModules = new Map(Object.values(englishModuleFiles).map(({ default: module }) => [module.id, module]));

function buildCourse(locale: Locale) {
  const modules = locale === 'es' ? data.modules : data.modules.map((original) => {
    const translated = translatedModules.get(original.id);
    if (!translated) throw new Error(`Missing English curriculum module: ${original.id}`);
    // Translations may change text, never identifiers, ordering or course coverage.
    const structural = (module: CourseModule) => ({
      id: module.id, order: module.order, phase: module.phase, supplement: module.supplement,
      lessons: module.lessons.map(({ slug, order, optional }) => ({ slug, order, optional })),
    });
    if (JSON.stringify(structural(original)) !== JSON.stringify(structural(translated))) {
      throw new Error(`English curriculum structure differs: ${original.id}`);
    }
    return translated;
  });
  if (locale === 'en' && translatedModules.size !== data.modules.length) throw new Error('Orphan English curriculum module.');
  const curriculum = locale === 'es' ? data : { ...data, ...englishMetadata, modules };
  const entries: LessonEntry[] = locale === 'es' ? spanishEntries : englishEntries;
  const indexed = new Map(entries.map((entry) => [entry.id, entry]));
  // Never silently fall back to Spanish or serve placeholders on an English route.
  const lessons: Lesson[] = modules.flatMap((module) => module.lessons.map((topic) => {
    const id = `${module.id}/${topic.slug}`;
    const entry = indexed.get(id);
    if (!entry) throw new Error(`Missing ${locale} Markdown lesson: ${id}`);
    if (entry.data.module !== module.id || entry.data.order !== topic.order || entry.data.title !== topic.title) {
      throw new Error(`Frontmatter does not match ${locale} curriculum: ${id}`);
    }
    return { ...entry.data, id, slug: topic.slug, href: lessonHref(id, locale), entry };
  }));
  if (lessons.length !== entries.length) throw new Error(`Orphan ${locale} lessons outside the curriculum.`);
  const coreModules = modules.filter((module) => !module.supplement);
  return {
    curriculum, modules, lessons, coreModules,
    coreLessons: lessons.filter((lesson) => coreModules.some((module) => module.id === lesson.module)),
    totalLessons: lessons.length,
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.duration, 0),
    getModuleLessons: (moduleId: string): Lesson[] => lessons.filter((lesson) => lesson.module === moduleId),
  };
}
const courses: Partial<Record<Locale, ReturnType<typeof buildCourse>>> = {};
export function getCourse(locale: Locale = 'es') {
  return courses[locale] ??= buildCourse(locale);
}
// Preserve the existing Spanish API and URLs.
export const { curriculum, modules, lessons, totalLessons, totalMinutes, coreModules, coreLessons, getModuleLessons } = getCourse('es');
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const remainder = minutes % 60;
  return `${Math.floor(minutes / 60)} h${remainder ? ` ${remainder} min` : ''}`;
}
