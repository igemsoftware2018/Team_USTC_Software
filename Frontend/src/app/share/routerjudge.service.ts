import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import {UserSigninfoService} from '../user-signinfo.service';


@Injectable({
  providedIn: 'root'
})
export class RouterjudgeService {
  constructor(
    private router: Router,
    private userinfo: UserSigninfoService
  ) { }
  // if myself
  ifMyself = (id: number) => {
    const ifLogin = this.userinfo.isLogin;
    if (!ifLogin) {
      return false;
    }
    const myid = this.userinfo.myInfo.id;
    if (id === myid) {
      return true;
    } else {
      return false;
    }
  }
  //  control routerlink
  goToJudge = (id: number, myurl: string, othersurl: string) => {
    const isme = this.ifMyself(id);
    if (isme) {
      this.router.navigateByUrl('/mypersonalcenter/detailinfo').then(() => this.router.navigateByUrl(myurl));
    } else {
      this.router.navigateByUrl('/userprofile/' + id).then(() => this.router.navigateByUrl(othersurl));
    }
  }
  // 点击头像
  gotoUserIndex = (id: number) => {
    this.goToJudge(id, '/mypersonalcenter/index', '/userprofile/' + id);
  }
  // 点击数字
  gotoUserDetailInfo = ( id: number) => {
    this.goToJudge(id, '/mypersonalcenter/detailinfo', '/userprofile/' + id);
  }
  // 点击label
  gotoReportbyLabel = ( id: number, label_id: number) => {
    this.goToJudge(id, '/mypersonalcenter/detailinfo/label/' + label_id , '/userprofile/' + id + '/label/' + label_id);
  }
  // 点击archive
  gotoReportbyArchive = ( id: number, archive_id: number) => {
    this.goToJudge(id, '/mypersonalcenter/detailinfo/archive/' + archive_id, '/userprofile/' + id + '/archive/' + archive_id);
  }
  // 点击报告名
  gotoReportDisplay = ( id: number, report_id: number) => {
    const isme = this.ifMyself(id);
    if (isme) {
      this.router.navigateByUrl('/report/my/' + report_id);
    } else {
      this.router.navigateByUrl('/report/others/' + report_id);
    }
  }
}
