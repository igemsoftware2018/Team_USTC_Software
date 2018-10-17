import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReportComponent } from './my-report.component';

describe('MyReportComponent', () => {
  let component: MyReportComponent;
  let fixture: ComponentFixture<MyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
