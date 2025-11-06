import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server // Используем SSR для защищённой области
  },
  {
    path: 'public',
    renderMode: RenderMode.Prerender // Статическая страница
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
