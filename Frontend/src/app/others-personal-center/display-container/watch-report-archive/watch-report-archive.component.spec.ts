import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchReportArchiveComponent } from './watch-report-archive.component';

describe('WatchReportArchiveComponent', () => {
  let component: WatchReportArchiveComponent;
  let fixture: ComponentFixture<WatchReportArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchReportArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchReportArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
