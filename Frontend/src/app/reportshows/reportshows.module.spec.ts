import { ReportshowsModule } from './reportshows.module';

describe('ReportshowsModule', () => {
  let reportshowsModule: ReportshowsModule;

  beforeEach(() => {
    reportshowsModule = new ReportshowsModule();
  });

  it('should create an instance', () => {
    expect(reportshowsModule).toBeTruthy();
  });
});
