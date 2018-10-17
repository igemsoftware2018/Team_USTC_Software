import {Component, OnInit} from '@angular/core';
import {Report, Simuser} from '../../../Interface/userinfo';
import {USER} from '../../../Interface/mock-user';

import {User} from '../../../Interface/userinfo';
import {HttpService} from '../../../http.service';
import {UserSigninfoService} from '../../../user-signinfo.service';
import {ApiResult} from '../../../Interface/ApiResult';
import {ActivatedRoute, ParamMap, UrlSegment} from '@angular/router';


@Component({
  selector: 'app-display-all-info',
  templateUrl: './display-all-info.component.html',
  styleUrls: ['./display-all-info.component.less'],

})
export class DisplayAllInfoComponent implements OnInit {
  user: User = USER;
  user_id: number;
  i = 0;
  t: Report;

  /* for pending */
  count:number;
  pending_show:boolean;
  pending_wrong_show:boolean;
  /* for pending */

  constructor(
    private userinfo: UserSigninfoService,
    private http: HttpService,
    private router:  ActivatedRoute
  ) { }
  ngOnInit() {
    /* for pending */
    this.count = 0;
    this.pending_show = true;
    this.pending_wrong_show = false;
    /* for pending */
    this.user = new User();
    this.getid();
    this.http.get_followers_by_id(this.user_id, this.followersCB);
    this.http.get_followings_by_id(this.user_id, this.followingCB);
    this.http.get_report_list_by_user_id(this.user_id, this.reportsCB);
  }
  getid = () => {
    this.router.parent.paramMap.subscribe((paramap: ParamMap) => {
      this.user_id = +paramap.get('user_id');
    });
  }
  /*ifFollowing(otheruser: Simuser) {
    const ii = this.user.following.findIndex(function(value) {
      return value.id === otheruser.id;
    });
    if (ii === -1) {
      return false;
    } else {
      return true;
    }
  }*/
  followersCB = (result: ApiResult) => {
    if(result.success) {
      this.user.followers = result.data.results;
      /* for pending */
      this.count++;
    }else {
      this.pending_wrong_show=true;
    }
    if(this.count==3){
      this.pending_show=false;
    }
    /* for pending */
  }
  followingCB = (result: ApiResult) => {
    if(result.success) {
      this.user.following = result.data.results;
      /* for pending */
      this.count++;
    }else {
      this.pending_wrong_show=true;
    }
    if(this.count==3){
      this.pending_show=false;
    }
    /* for pending */
  }
  reportsCB = (result: ApiResult) => {
    if(result.success) {
      this.user.reports = result.data.results;
      /* for pending */
      this.count++;
    }else {
      this.pending_wrong_show=true;
    }
    if(this.count==3){
      this.pending_show=false;
    }
    /* for pending */
  }
}
