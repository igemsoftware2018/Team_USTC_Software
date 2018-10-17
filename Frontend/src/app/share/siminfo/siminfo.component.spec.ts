import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiminfoComponent } from './siminfo.component';

describe('SiminfoComponent', () => {
  let component: SiminfoComponent;
  let fixture: ComponentFixture<SiminfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiminfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiminfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
