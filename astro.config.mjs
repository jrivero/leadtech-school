import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://leadtech-school.vercel.app',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
