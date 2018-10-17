import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.less']
})
export class UserReportComponent implements OnInit {
  allnum:number=23;
  draftnum:number=23;
  constructor() { }

  ngOnInit() {
  }

}
