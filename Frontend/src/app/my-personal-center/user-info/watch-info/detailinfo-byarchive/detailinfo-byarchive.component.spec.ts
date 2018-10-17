import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailinfoByarchiveComponent } from './detailinfo-byarchive.component';

describe('DetailinfoByarchiveComponent', () => {
  let component: DetailinfoByarchiveComponent;
  let fixture: ComponentFixture<DetailinfoByarchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailinfoByarchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailinfoByarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
