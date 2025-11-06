import {CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import {AUTH_SERVICE, AuthService} from '../services/auth/auth-service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AUTH_SERVICE);
  const router = inject(Router);

  if (await authService.isAuthenticated()) {
    return true;
  } else {
    // Инициируем логин на клиенте. На сервере — редирект на страницу логина или ошибку.
    if (typeof window !== 'undefined') {
      await authService.login();
    }
    return false;
  }
};
