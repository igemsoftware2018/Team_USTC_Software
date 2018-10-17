import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpltResetComponent } from './cplt-reset.component';

describe('CpltResetComponent', () => {
  let component: CpltResetComponent;
  let fixture: ComponentFixture<CpltResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpltResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpltResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
