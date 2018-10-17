import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../../Interface/userinfo';
import {RouterjudgeService} from '../routerjudge.service';


@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.less'],
})
export class MyReportComponent implements OnInit {
  @Input() report: Report;
  @Input() bkcolor: string;
  constructor(private routerjudge: RouterjudgeService) { }

  ngOnInit() {
  }
  gotoIndex = () => {
    this.routerjudge.gotoUserIndex(this.report.author.id);
  }
  gotoLabel = (label_id: number) => {
    this.routerjudge.gotoReportbyLabel(this.report.author.id, label_id);
  }
  gotoReport = (report_id: number) => {
    this.routerjudge.gotoReportDisplay(this.report.author.id, report_id);
  }
}
