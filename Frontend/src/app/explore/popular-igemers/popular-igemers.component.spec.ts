import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularIgemersComponent } from './popular-igemers.component';

describe('PopularIgemersComponent', () => {
  let component: PopularIgemersComponent;
  let fixture: ComponentFixture<PopularIgemersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularIgemersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularIgemersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
