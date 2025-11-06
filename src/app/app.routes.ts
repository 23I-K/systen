import { Routes } from '@angular/router';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], // Защита всего макета
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      // Другие защищенные маршруты...
    ]
  },
  {
    path: 'public',
    component: PublicLayoutComponent // Заглушка для неавторизованных
  },
  {
    path: '**',
    redirectTo: 'public'
  }
];
