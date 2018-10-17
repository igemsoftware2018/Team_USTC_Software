import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockRenderComponent } from './mock-render.component';

describe('MockRenderComponent', () => {
  let component: MockRenderComponent;
  let fixture: ComponentFixture<MockRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
