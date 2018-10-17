import { TestBed, inject } from '@angular/core/testing';

import { AppendixService } from './appendix.service';

describe('AppendixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppendixService]
    });
  });

  it('should be created', inject([AppendixService], (service: AppendixService) => {
    expect(service).toBeTruthy();
  }));
});
