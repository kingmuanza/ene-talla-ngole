import { TestBed } from '@angular/core/testing';

import { OeuvreService } from './oeuvre.service';

describe('OeuvreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OeuvreService = TestBed.get(OeuvreService);
    expect(service).toBeTruthy();
  });
});
