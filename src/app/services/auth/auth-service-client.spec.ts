import { TestBed } from '@angular/core/testing';

import { AuthServiceClient } from './auth-service-client';

describe('AuthServiceClient', () => {
  let service: AuthServiceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
