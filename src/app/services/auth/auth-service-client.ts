import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {OidcClient, UserManager} from 'oidc-client-ts';
import { oidcConfig } from './auth-config';
import {AuthService} from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ClientAuthService extends AuthService {
  private oidcClient: OidcClient;
  private userManager: UserManager; // Используйте UserManager из oidc-client-ts для более удобного управления

  constructor() {
    super();
    // Инициализация oidcClient на основе oidcConfig
    this.oidcClient = new OidcClient(oidcConfig);
  }

  async login(): Promise<void> {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      await this.oidcClient.signinRedirect(); // Инициирует OIDC flow с редиректом
    }
  }

  async handleCallback(): Promise<void> {
    // Вызывается на странице /auth-callback для обработки ответа от Keycloak
    const user = await this.oidcClient.signinRedirectCallback();
    // Сохраняем данные пользователя (например, в Session Storage)
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    return !!user && !user.expired;
  }

  async getAccessToken(): Promise<string | null> {
    const user = await this.getUser();
    return user?.access_token || null;
  }

  private async getUser() {
    // Логика получения пользователя из хранилища
  }

  getUserProfile(): Promise<any> {
    return Promise.resolve(undefined);
  }

  logout(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
