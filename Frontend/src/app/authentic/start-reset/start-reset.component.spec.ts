import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartResetComponent } from './start-reset.component';

describe('StartResetComponent', () => {
  let component: StartResetComponent;
  let fixture: ComponentFixture<StartResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
