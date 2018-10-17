import { TestBed, inject } from '@angular/core/testing';

import { RouterjudgeService } from './routerjudge.service';

describe('RouterjudgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterjudgeService]
    });
  });

  it('should be created', inject([RouterjudgeService], (service: RouterjudgeService) => {
    expect(service).toBeTruthy();
  }));
});
