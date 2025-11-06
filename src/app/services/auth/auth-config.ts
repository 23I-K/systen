import { ApplicationConfig, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {AUTH_SERVICE} from './auth-service';
import {ClientAuthService} from './auth-service-client';
import {ServerAuthService} from './auth-service-server';

export const oidcConfig = {
  authority: 'http://localhost:8080/realms/your-realm', // URL вашего Keycloak Realm
  client_id: 'your-angular-client',
  redirect_uri: `${isPlatformBrowser(platformId) ? window.location.origin : 'http://localhost:4000'}/auth-callback`,
  post_logout_redirect_uri: `${isPlatformBrowser(platformId) ? window.location.origin : 'http://localhost:4000'}`,
  response_type: 'code',
  scope: 'openid profile email',
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true,
  silent_redirect_uri: `${isPlatformBrowser(platformId) ? window.location.origin : 'http://localhost:4000'}/silent-renew.html`
};

export const appConfig: ApplicationConfig = {
  providers: [
    // ... другие провайдеры (provideRouter, provideClientHydration)
    {
      provide: AUTH_SERVICE,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
          return new ClientAuthService();
        } else {
          return new ServerAuthService();
        }
      },
    },
  ],
};
