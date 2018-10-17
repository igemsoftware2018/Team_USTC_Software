import { Component, OnInit } from '@angular/core';
import {Label, Report, User} from '../../../Interface/userinfo';
import {USER} from '../../../Interface/mock-user';
import {ActivatedRoute} from '@angular/router';
import {ParamMap} from '@angular/router';
import {ApiResult} from '../../../Interface/ApiResult';
import {HttpService} from '../../../http.service';

@Component({
  selector: 'app-watch-report-label',
  templateUrl: './watch-report-label.component.html',
  styleUrls: ['./watch-report-label.component.less']
})
export class WatchReportLabelComponent implements OnInit {
  user: User = USER;
  label: Label;
  label_reports: Report[];
  reports_onshow = [];
  reports_unshow = [];
  i = 0;
  t: Report;
  /* for pending */
  count: number;
  pending_show: boolean;
  pending_wrong_show: boolean;
  /* for pending */
  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    /* for pending */
    this.count = 0;
    this.pending_show = true;
    this.pending_wrong_show = false;
    /* for pending */
    this.label = new Label();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.label.id = +params.get('label_id');
    });
    this.get_label_reports();
  }
  get_label_reports() {
    const label_callback = (result: ApiResult) => {
      if (result.success) {
        this.label_reports = result.data.reports;
        this.label.name = result.data.name;
        /* for pending */
        this.count++;
      } else {
        this.pending_wrong_show = true;
      }
      if (this.count === 1) {
        this.pending_show = false;
      }
      /* for pending */
    };
    this.http.query_label(this.label.id, label_callback);
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

    if (this.user.reports.length <= 6) {
      this.reports_onshow = this.user.reports.slice(0, this.user.reports.length);
    } else {
      this.reports_onshow = this.user.reports.slice(0, 6);
      this.reports_unshow = this.user.reports.slice(6, this.user.reports.length);
    }
  }

}
