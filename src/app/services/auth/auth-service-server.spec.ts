import { TestBed } from '@angular/core/testing';

import { AuthServiceServer } from './auth-service-server';

describe('AuthServiceServer', () => {
  let service: AuthServiceServer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceServer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
