import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllComponent } from './report-all.component';

describe('ReportAllComponent', () => {
  let component: ReportAllComponent;
  let fixture: ComponentFixture<ReportAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
