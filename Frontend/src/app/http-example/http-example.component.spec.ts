import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpExampleComponent } from './http-example.component';

describe('HttpExampleComponent', () => {
  let component: HttpExampleComponent;
  let fixture: ComponentFixture<HttpExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
