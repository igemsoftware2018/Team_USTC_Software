import { Component, OnInit } from '@angular/core';
import { Report, Collect } from '../../Interface/userinfo';
import { report1 } from '../../Interface/mock-user';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';


@Component({
  selector: 'app-popular-report',
  templateUrl: './popular-report.component.html',
  styleUrls: ['./popular-report.component.less']
})
export class PopularReportComponent implements OnInit {
  reports: Report[];
  /* for pending */
  count: number;
  pending_show: boolean;
  pending_wrong_show: boolean;
  /* for pending */
  constructor(
    private http: HttpService,
    ) { }

  ngOnInit() {
    /* for pending */
    this.count = 0;
    this.pending_show = true;
    this.pending_wrong_show = false;
    /* for pending */
    this.getPopularReports();
  }

  private getPopularReports = () => {
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.reports = result.data.results;
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
    this.http.get_popular_reports_by_system(callback);
  }
}
