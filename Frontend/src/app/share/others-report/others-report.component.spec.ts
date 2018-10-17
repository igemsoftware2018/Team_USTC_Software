import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersReportComponent } from './others-report.component';

describe('OthersReportComponent', () => {
  let component: OthersReportComponent;
  let fixture: ComponentFixture<OthersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
