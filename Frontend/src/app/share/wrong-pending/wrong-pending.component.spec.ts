import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongPendingComponent } from './wrong-pending.component';

describe('WrongPendingComponent', () => {
  let component: WrongPendingComponent;
  let fixture: ComponentFixture<WrongPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
