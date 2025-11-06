import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export abstract class AuthService {
  abstract login(): Promise<void>;
  abstract logout(): Promise<void>;
  abstract isAuthenticated(): Promise<boolean>;
  abstract getUserProfile(): Promise<any | null>;
  abstract getAccessToken(): Promise<string | null>;
}

// Токен для инжектации реализации
import { InjectionToken } from '@angular/core';
export const AUTH_SERVICE = new InjectionToken<AuthService>('AuthService');
