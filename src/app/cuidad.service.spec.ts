import { TestBed } from '@angular/core/testing';

import { CuidadService } from './cuidad.service';

describe('CuidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuidadService = TestBed.get(CuidadService);
    expect(service).toBeTruthy();
  });
});
