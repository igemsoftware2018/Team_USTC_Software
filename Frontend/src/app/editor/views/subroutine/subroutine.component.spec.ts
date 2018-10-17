import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubroutineComponent } from './subroutine.component';

describe('SubroutineComponent', () => {
  let component: SubroutineComponent;
  let fixture: ComponentFixture<SubroutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubroutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubroutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
