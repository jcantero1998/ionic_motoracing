import { TestBed } from '@angular/core/testing';

import { MotodbService } from './motodb.service';

describe('MotodbserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotodbService = TestBed.get(MotodbService);
    expect(service).toBeTruthy();
  });
});
