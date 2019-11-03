import { TestBed } from '@angular/core/testing';

import { ExpositionService } from './exposition.service';

describe('ExpositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpositionService = TestBed.get(ExpositionService);
    expect(service).toBeTruthy();
  });
});
