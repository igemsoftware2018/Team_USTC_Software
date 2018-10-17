import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAuthorInfoComponent } from './report-author-info.component';

describe('ReportAuthorInfoComponent', () => {
  let component: ReportAuthorInfoComponent;
  let fixture: ComponentFixture<ReportAuthorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAuthorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAuthorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
