import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailinfoBylabelComponent } from './detailinfo-bylabel.component';

describe('DetailinfoBylabelComponent', () => {
  let component: DetailinfoBylabelComponent;
  let fixture: ComponentFixture<DetailinfoBylabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailinfoBylabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailinfoBylabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
