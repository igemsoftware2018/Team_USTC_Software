import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DBsearchresultComponent } from './dbsearchresult.component';

describe('DBsearchresultComponent', () => {
  let component: DBsearchresultComponent;
  let fixture: ComponentFixture<DBsearchresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DBsearchresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DBsearchresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
