import { Component, Input, OnInit } from '@angular/core';
import {Simuser} from '../../Interface/userinfo';
import {RouterjudgeService} from '../routerjudge.service';
import {ApiResult} from '../../Interface/ApiResult';
import {HttpService} from '../../http.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-info-profile',
  templateUrl: './user-info-profile.component.html',
  styleUrls: ['./user-info-profile.component.less']
})
export class UserInfoProfileComponent implements OnInit {
  @Input() user: Simuser;
  @Input() ismyself: boolean;
  isFollow: boolean;
  btncontent: string;
  old_follow_bl: boolean;
  old_follow_msg: string;
  constructor(
    private routerjudge: RouterjudgeService,
    private http: HttpService,
    private message: NzMessageService,
    ) { }
  ngOnInit() {
    this.btncontent = this.user.followed ? 'unfollow' : 'follow';
    this.isFollow = this.user.followed;
  }
  // 设置点击跳转
  gotoIndex = () => {
    this.routerjudge.gotoUserIndex(this.user.id);
  }
  gotoDetailInfo = () => {
    this.routerjudge.gotoUserDetailInfo(this.user.id);
  }
  // 回调函数定义
  follow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to unfollow' + this.user.username);
      this.isFollow = this.old_follow_bl;
      this.btncontent = this.old_follow_msg;
    }
  }
  unfollow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to follow' + this.user.username);
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
      this.http.follow_user_by_id(this.user.id, this.follow_callback);
    } else {
      this.http.unfollow_user_by_id(this.user.id, this.unfollow_callback);
    }
  }
}
