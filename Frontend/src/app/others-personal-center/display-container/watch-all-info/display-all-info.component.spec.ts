import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllInfoComponent } from './display-all-info.component';

describe('ReportComponent', () => {
  let component: DisplayAllInfoComponent;
  let fixture: ComponentFixture<DisplayAllInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAllInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
