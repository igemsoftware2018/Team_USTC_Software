import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSortComponent } from './dynamic-sort.component';

describe('DynamicSortComponent', () => {
  let component: DynamicSortComponent;
  let fixture: ComponentFixture<DynamicSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
