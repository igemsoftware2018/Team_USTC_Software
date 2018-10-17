import {Component, OnInit} from '@angular/core';
import {Simuser, Label, Archive, Report} from '../../../Interface/userinfo';
import { HttpService } from '../../../http.service';
import {UserSigninfoService} from '../../../user-signinfo.service';
import {ApiResult} from '../../../Interface/ApiResult';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.less']
})
export class UserinfoComponent implements OnInit {
  simuser: Simuser;
  labels: Label[];
  archive: Archive[];
  popular_reports: Report[] = [];
  /* for pending */
  count: number;
  pending_show: boolean;
  pending_wrong_show: boolean;
  /* for pending */
  constructor(
    private http: HttpService,
    private userinfo: UserSigninfoService
  ) {
  }

  ngOnInit() {
    /* for pending */
    this.count = 0;
    this.pending_show = true;
    this.pending_wrong_show = false;
    /* for pending */
    this.simuser = this.userinfo.myInfo;
    this.get_classification();
  }
  get_classification = () => {
    const callback_labels = (result: ApiResult) => {
      if (result.success) {
        this.labels = result.data;
        /* for pending */
        this.count++;
      } else {
        this.pending_wrong_show = true;
      }
      if (this.count === 2) {
        this.pending_show = false;
      }
      /* for pending */
    };
    const callback_archive = (result: ApiResult) => {
      if (result.success) {
        this.archive = result.data;
        /* for pending */
        this.count++;
      } else {
        this.pending_wrong_show = true;
      }
      if (this.count === 2) {
        this.pending_show = false;
      }
      /* for pending */
    };
    this.http.get_labels_by_user_id(this.simuser.id, callback_labels);
    this.http.get_archives_by_user_id(this.simuser.id, callback_archive);
  }
}
