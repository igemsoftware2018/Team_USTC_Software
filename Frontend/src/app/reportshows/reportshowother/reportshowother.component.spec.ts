import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportshowotherComponent } from './reportshowother.component';

describe('ReportshowotherComponent', () => {
  let component: ReportshowotherComponent;
  let fixture: ComponentFixture<ReportshowotherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportshowotherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportshowotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
