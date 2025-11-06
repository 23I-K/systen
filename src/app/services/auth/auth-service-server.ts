import { Injectable, Inject, Optional } from '@angular/core';
import { Request } from 'express';
// import { verify, decode } from 'jsonwebtoken';
import {AuthService} from './auth-service'; // Используйте библиотеку для верификации JWT, например, jose

@Injectable({ providedIn: 'root' })
export class ServerAuthService extends AuthService {
  constructor(@Optional() @Inject('REQUEST') private request?: Request) {
    super();
  }

  async isAuthenticated(): Promise<boolean> {
    // 1. Извлеките токен из cookie (например, 'keycloak-token') или заголовка Authorization
    const token = this.getTokenFromRequest();
    if (!token) return false;

    // 2. Валидируйте токен (проверьте подпись, срок действия, issuer (iss) и audience (aud))
    try {
      // ЗАМЕЧАНИЕ: В продакшене следует использовать JWKS endpoint Keycloak для получения публичных ключей.
      // Это упрощенный пример. Используйте библиотеку `jose` для безопасной верификации.
      const isValid = await this.verifyTokenWithKeycloak(token);
      return isValid;
    } catch {
      return false;
    }
  }

  async login(): Promise<void> {
    throw new Error('Логин не может быть инициирован на сервере.');
  }

  async logout(): Promise<void> {
    throw new Error('Логаут не может быть инициирован на сервере.');
  }

  async getAccessToken(): Promise<string | null> {
    return this.getTokenFromRequest();
  }

  private getTokenFromRequest(): string | null {
    // Логика извлечения токена из cookies или заголовков запроса
    return this.request?.cookies?.['keycloak-token'] || this.request?.headers?.authorization?.replace('Bearer ', '') || null;
  }

  private async verifyTokenWithKeycloak(token: string): Promise<boolean> {
    // Реализация верификации JWT (проверка подписи, exp, iss, aud)
    // Keycloak предоставляет JWKS endpoint для получения публичных ключей.
    return true; // Заглушка
  }

  getUserProfile(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
