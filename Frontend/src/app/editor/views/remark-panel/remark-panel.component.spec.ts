import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkPanelComponent } from './remark-panel.component';

describe('RemarkPanelComponent', () => {
  let component: RemarkPanelComponent;
  let fixture: ComponentFixture<RemarkPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarkPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
