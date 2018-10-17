import {Component, Input, OnInit} from '@angular/core';
import {Simuser} from '../../Interface/userinfo';
import {RouterjudgeService} from '../routerjudge.service';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import {NzMessageService} from 'ng-zorro-antd';
import {UserSigninfoService} from '../../user-signinfo.service';

@Component({
  selector: 'app-followuser',
  templateUrl: './followuser.component.html',
  styleUrls: ['./followuser.component.less'],
})
export class FollowuserComponent implements OnInit {
  @Input() otheruser: Simuser;
  @Input() bkcolor: string;

  btncontent: string ;
  isFollow: boolean;
  old_follow_bl = true;
  old_follow_msg: string;
  btnshow: boolean;
  constructor(
    private routerjudge: RouterjudgeService,
    private http: HttpService,
    private message: NzMessageService,
    private userinfo: UserSigninfoService
  ) { }

  ngOnInit() {
    this.btncontent = this.otheruser.followed ? 'unfollow' : 'follow';
    this.isFollow = this.otheruser.followed;
    this.setBtnShow();
  }
  // 判断是否显示follow btn
  setBtnShow = () => {
    if (!this.userinfo.isLogin) {
      this.btnshow = false;
    } else {
      this.btnshow = this.otheruser.id === this.userinfo.myInfo.id ? false : true;
    }
  }
  gotoIndex = () => {
    this.routerjudge.gotoUserIndex(this.otheruser.id);
  }
  // 回调函数定义
  follow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to unfollow' + this.otheruser.username);
      this.isFollow = this.old_follow_bl;
      this.btncontent = this.old_follow_msg;
    }
  }
  unfollow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to follow' + this.otheruser.username);
      this.isFollow = this.old_follow_bl;
      this.btncontent = this.old_follow_msg;
    }
  }
  toggleFollow = () => {
    // 点击先直接修改
    this.old_follow_bl = this.isFollow;
    this.old_follow_msg = this.btncontent;
    this.isFollow = !this.old_follow_bl;
    this.btncontent = this.old_follow_bl ? 'follow' : 'unfollow';
    // 根据现在是否关注进行请求
    if (!this.old_follow_bl) {
      this.http.follow_user_by_id(this.otheruser.id, this.follow_callback);
    } else {
      this.http.unfollow_user_by_id(this.otheruser.id, this.unfollow_callback);
    }
  }
}
