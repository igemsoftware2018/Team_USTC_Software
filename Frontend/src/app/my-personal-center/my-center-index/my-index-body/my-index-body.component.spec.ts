import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIndexBodyComponent } from './my-index-body.component';

describe('MyIndexBodyComponent', () => {
  let component: MyIndexBodyComponent;
  let fixture: ComponentFixture<MyIndexBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIndexBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIndexBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
