import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorScrollComponent } from './editor-scroll.component';

describe('EditorScrollComponent', () => {
  let component: EditorScrollComponent;
  let fixture: ComponentFixture<EditorScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
