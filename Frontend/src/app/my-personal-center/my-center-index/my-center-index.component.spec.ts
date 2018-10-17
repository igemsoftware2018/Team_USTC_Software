import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCenterIndexComponent } from './my-center-index.component';

describe('MyCenterIndexComponent', () => {
  let component: MyCenterIndexComponent;
  let fixture: ComponentFixture<MyCenterIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCenterIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCenterIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
