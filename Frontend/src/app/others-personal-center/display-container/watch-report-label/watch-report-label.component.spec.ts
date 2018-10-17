import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchReportLabelComponent } from './watch-report-label.component';

describe('WatchReportLabelComponent', () => {
  let component: WatchReportLabelComponent;
  let fixture: ComponentFixture<WatchReportLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchReportLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchReportLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
