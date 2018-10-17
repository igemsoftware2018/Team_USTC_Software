import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRenderComponent } from './report-render.component';

describe('ReportRenderComponent', () => {
  let component: ReportRenderComponent;
  let fixture: ComponentFixture<ReportRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
