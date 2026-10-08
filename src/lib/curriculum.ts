import { getCollection, type CollectionEntry } from 'astro:content';
import data from '../data/curriculum.json';

export const curriculum = data;
export const modules = data.modules;
export type CourseModule = (typeof modules)[number];
export type Lesson = CollectionEntry<'lecciones'>['data'] & {
  id: string;
  slug: string;
  href: string;
  entry: CollectionEntry<'lecciones'>;
};
const entries = await getCollection('lecciones');
const indexed = new Map(entries.map((entry) => [entry.id, entry]));

// A missing lesson is a build error, never a dead link or a placeholder page.
export const lessons: Lesson[] = modules.flatMap((module) =>
  module.lessons.map((topic) => {
    const id = `${module.id}/${topic.slug}`;
    const entry = indexed.get(id);
    if (!entry) throw new Error(`Falta la lección Markdown: ${id}`);
    if (entry.data.module !== module.id || entry.data.order !== topic.order || entry.data.title !== topic.title) {
      throw new Error(`Frontmatter no coincide con el currículo: ${id}`);
    }
    return { ...entry.data, id, slug: topic.slug, href: `/lecciones/${id}/`, entry };
  }),
);
if (lessons.length !== entries.length) throw new Error('Hay lecciones huérfanas fuera del currículo.');
export const totalLessons = lessons.length;
export const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
export const coreModules = modules.filter((module) => !('supplement' in module && module.supplement));
export const coreLessons = lessons.filter((lesson) => coreModules.some((module) => module.id === lesson.module));
export function getModuleLessons(moduleId: string): Lesson[] {
  return lessons.filter((lesson) => lesson.module === moduleId);
}
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const remainder = minutes % 60;
  return `${Math.floor(minutes / 60)} h${remainder ? ` ${remainder} min` : ''}`;
}
