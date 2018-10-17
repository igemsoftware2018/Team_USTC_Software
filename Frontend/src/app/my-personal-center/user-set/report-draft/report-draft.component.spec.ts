import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDraftComponent } from './report-draft.component';

describe('ReportDraftComponent', () => {
  let component: ReportDraftComponent;
  let fixture: ComponentFixture<ReportDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
