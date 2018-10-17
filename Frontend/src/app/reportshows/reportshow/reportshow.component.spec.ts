import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportshowComponent } from './reportshow.component';



describe('ReportComponent', () => {
  let component: ReportshowComponent;
  let fixture: ComponentFixture<ReportshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
