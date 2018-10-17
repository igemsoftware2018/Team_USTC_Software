import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Label, Report } from '../../../../Interface/userinfo';
import {HttpService} from '../../../../http.service';
import {ApiResult} from '../../../../Interface/ApiResult';

@Component({
  selector: 'app-detailinfo-bylabel',
  templateUrl: './detailinfo-bylabel.component.html',
  styleUrls: ['./detailinfo-bylabel.component.less']
})
export class DetailinfoBylabelComponent implements OnInit {
  /* for pending */
  count: number;
  pending_show: boolean;
  pending_wrong_show: boolean;
  /* for pending */
  label: Label;
  label_reports: Report[];
  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
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

}
