import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVariableComponent } from './user-variable.component';

describe('UserVariableComponent', () => {
  let component: UserVariableComponent;
  let fixture: ComponentFixture<UserVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
