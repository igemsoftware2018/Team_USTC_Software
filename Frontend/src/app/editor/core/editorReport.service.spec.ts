import { TestBed, inject } from '@angular/core/testing';

import { EditorReportService } from './editorReport.service';

describe('EditorReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditorReportService]
    });
  });

  it('should be created', inject([EditorReportService], (service: EditorReportService) => {
    expect(service).toBeTruthy();
  }));
});
