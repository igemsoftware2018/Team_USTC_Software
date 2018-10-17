import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowuserComponent } from './followuser.component';

describe('FollowuserComponent', () => {
  let component: FollowuserComponent;
  let fixture: ComponentFixture<FollowuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
