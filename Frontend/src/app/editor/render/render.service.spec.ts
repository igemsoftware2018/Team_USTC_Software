import { TestBed, inject } from '@angular/core/testing';

import { RenderService } from './render.service';

describe('RenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderService]
    });
  });

  it('should be created', inject([RenderService], (service: RenderService) => {
    expect(service).toBeTruthy();
  }));
});
