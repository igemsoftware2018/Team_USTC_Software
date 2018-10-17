import { Component, OnInit, Input } from '@angular/core';
import {RouterjudgeService} from '../routerjudge.service';
import { Simuser } from '../../Interface/userinfo';
import {ApiResult} from '../../Interface/ApiResult';
import {HttpService} from '../../http.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-igemer-card',
  templateUrl: './igemer-card.component.html',
  styleUrls: ['./igemer-card.component.less']
})
export class IgemerCardComponent implements OnInit {
  @Input() igemer: Simuser;
  isFollow: boolean;
  old_follow_bl: boolean;
  constructor(
    private routerjudge: RouterjudgeService,
    private http: HttpService,
    private message: NzMessageService,
  ) { }

  ngOnInit(
  ) {
    this.isFollow = this.igemer.followed;
  }
  gotoIndex = () => {
    this.routerjudge.gotoUserIndex(this.igemer.id);
  }
  // 回调函数定义
  follow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to unfollow' + this.igemer.username);
      this.isFollow = this.old_follow_bl;
    }
  }
  unfollow_callback = (result: ApiResult) => {
    if (!result.success) {
      this.message.error( 'Fail to follow' + this.igemer.username);
      this.isFollow = this.old_follow_bl;
    }
  }
  toggleFollow = () => {
    // 点击先直接修改
    this.old_follow_bl = this.isFollow;
    this.isFollow = !this.old_follow_bl;
    // 根据现在是否关注进行请求
    if (!this.old_follow_bl) {
      this.http.follow_user_by_id(this.igemer.id, this.follow_callback);
    } else {
      this.http.unfollow_user_by_id(this.igemer.id, this.unfollow_callback);
    }
  }
}
