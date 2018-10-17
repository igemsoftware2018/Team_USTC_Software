import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPanelComponent } from './step-panel.component';

describe('StepPanelComponent', () => {
  let component: StepPanelComponent;
  let fixture: ComponentFixture<StepPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
