import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAreaComponent } from './button-area.component';

describe('ButtonAreaComponent', () => {
  let component: ButtonAreaComponent;
  let fixture: ComponentFixture<ButtonAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
