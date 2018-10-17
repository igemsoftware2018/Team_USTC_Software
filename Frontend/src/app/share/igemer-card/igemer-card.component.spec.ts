import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgemerCardComponent } from './igemer-card.component';

describe('IgemerCardComponent', () => {
  let component: IgemerCardComponent;
  let fixture: ComponentFixture<IgemerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgemerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgemerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
