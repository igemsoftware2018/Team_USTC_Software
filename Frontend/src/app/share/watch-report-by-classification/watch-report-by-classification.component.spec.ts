import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchReportByClassificationComponent } from './watch-report-by-classification.component';

describe('WatchReportByClassificationComponent', () => {
  let component: WatchReportByClassificationComponent;
  let fixture: ComponentFixture<WatchReportByClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchReportByClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchReportByClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
