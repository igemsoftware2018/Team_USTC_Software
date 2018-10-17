import { TestBed, inject } from '@angular/core/testing';

import { UserSigninfoService } from './user-signinfo.service';

describe('UserSigninfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSigninfoService]
    });
  });

  it('should be created', inject([UserSigninfoService], (service: UserSigninfoService) => {
    expect(service).toBeTruthy();
  }));
});
