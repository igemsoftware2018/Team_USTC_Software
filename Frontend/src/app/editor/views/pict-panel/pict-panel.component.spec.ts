import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictPanelComponent } from './pict-panel.component';

describe('PictPanelComponent', () => {
  let component: PictPanelComponent;
  let fixture: ComponentFixture<PictPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
