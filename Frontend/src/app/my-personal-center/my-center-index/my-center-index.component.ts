import { Component, OnInit } from '@angular/core';
import { UserSigninfoService } from '../../user-signinfo.service';
import {Simuser, Report} from '../../Interface/userinfo';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';

@Component({
  selector: 'app-my-center-index',
  templateUrl: './my-center-index.component.html',
  styleUrls: ['./my-center-index.component.less']
})
export class MyCenterIndexComponent implements OnInit {
  user: Simuser;
  collections: Report[];
  favorites: Report[];
  /* for pending */
  count:number;
  pending_show:boolean;
  pending_wrong_show:boolean;
  /* for pending */
  constructor(private myinfo: UserSigninfoService,
              private http: HttpService,
              ) {
    this.user = this.myinfo.myInfo;
  }

  ngOnInit() {
    /* for pending */
    this.count = 0;
    this.pending_show = true;
    this.pending_wrong_show = false;
    /* for pending */
    this.get_collections();
    this.get_favortites();
  }
  get_collections = () => {
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.collections = result.data;
        /* for pending */
        this.count++;
      } else {
        this.pending_wrong_show = true;
      }
      if(this.count === 2) {
        this.pending_show = false;
      }
      /* for pending */
    };
    this.http.get_all_my_collections(callback);
  }
  get_favortites = () => {
    const callback = (result: ApiResult) => {
      if (result.success) {
        this.favorites = result.data;
        /* for pending */
        this.count++;
      } else {
        this.pending_wrong_show = true;
      }
      if(this.count === 2) {
        this.pending_show = false;
      }
      /* for pending */
    };
    this.http.get_all_my_favorite_reports(callback);
  }

}
