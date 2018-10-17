import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Archive, Report } from '../../../../Interface/userinfo';
import {ApiResult} from '../../../../Interface/ApiResult';
import {HttpService} from '../../../../http.service';

@Component({
  selector: 'app-detailinfo-byarchive',
  templateUrl: './detailinfo-byarchive.component.html',
  styleUrls: ['./detailinfo-byarchive.component.less']
})
export class DetailinfoByarchiveComponent implements OnInit {
  /* for pending */
  count: number;
  pending_show: boolean;
  pending_wrong_show: boolean;
  /* for pending */
  archive: Archive;
  archive_reports: Report[];
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
    this.archive = new Archive();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.archive.id = +params.get('archive_id');
    });
    this.get_archive_reports();
  }
  get_archive_reports() {
    const archive_callback = (result: ApiResult) => {
      if (result.success) {
        this.archive_reports = result.data.reports;
        this.archive.date = result.data.date;
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
    this.http.query_archive(this.archive.id, archive_callback);
  }
}
