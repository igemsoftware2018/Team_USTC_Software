import { TestBed, inject } from '@angular/core/testing';

import { RenderServiceService } from './render-service.service';

describe('RenderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderServiceService]
    });
  });

  it('should be created', inject([RenderServiceService], (service: RenderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
