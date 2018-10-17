import { TestBed, inject } from '@angular/core/testing';

import { EditorEventService } from './editor-event.service';

describe('EditorEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorEventService]
    });
  });

  it('should be created', inject([EditorEventService], (service: EditorEventService) => {
    expect(service).toBeTruthy();
  }));
});
