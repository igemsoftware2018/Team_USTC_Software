import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularReportComponent } from './popular-report.component';

describe('PopularReportComponent', () => {
  let component: PopularReportComponent;
  let fixture: ComponentFixture<PopularReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
