import { Component, Input, OnInit } from '@angular/core';
import { Report, Label, Archive} from '../../Interface/userinfo';

@Component({
  selector: 'app-watch-report-by-classification',
  templateUrl: './watch-report-by-classification.component.html',
  styleUrls: ['./watch-report-by-classification.component.less']
})
export class WatchReportByClassificationComponent implements OnInit {
  @Input() classification_reports: Report[];
  @Input() big_label: string;
  @Input() label: any; // 要展示的哪种归档的report
  /* for pending */
  @Input() pending_show: boolean;
  @Input() pending_wrong_show: boolean;
  /* for pending */
  reports_onshow = [];
  reports_unshow = [];
  i = 0;
  t: Report;
  constructor() { }
  ngOnInit() {
  }
  reportShowMore() {
    this.reports_unshow.reverse();
    for ( this.i = 0; this.i < this.reports_unshow.length && this.i < 6; ++this.i) {
      this.t = this.reports_unshow.pop();
      this.reports_onshow.push(this.t);
    }
    this.i = 0;
    this.reports_unshow.reverse();
  }

  initReports(): void {

    if (this.classification_reports.length <= 6) {
      this.reports_onshow = this.classification_reports.slice(0, this.classification_reports.length);
    } else {
      this.reports_onshow = this.classification_reports.slice(0, 6);
      this.reports_unshow = this.classification_reports.slice(6, this.classification_reports.length);
    }
  }
}
