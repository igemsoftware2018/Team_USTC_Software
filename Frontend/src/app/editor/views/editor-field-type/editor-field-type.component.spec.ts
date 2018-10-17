import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFieldTypeComponent } from './editor-field-type.component';

describe('EditorFieldTypeComponent', () => {
  let component: EditorFieldTypeComponent;
  let fixture: ComponentFixture<EditorFieldTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorFieldTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFieldTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
