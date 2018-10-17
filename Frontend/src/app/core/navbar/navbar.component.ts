import {Component, OnInit, AfterViewChecked, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Simuser } from '../../Interface/userinfo';
import { UserSigninfoService } from '../../user-signinfo.service';
import { HttpService } from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public ifLogin: boolean;
  public user: Simuser|undefined;
  public new_feeds = false;
  public new_notification = false;
  public notification_msg = '';
  constructor(private userinfo: UserSigninfoService,
              private cdRef: ChangeDetectorRef,
              private http: HttpService,
              private message: NzMessageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              ) {
  }

  ngOnInit() {
    // 监听用户信息变化 一旦变化重新加载
    this.userinfo.userInfoChange.subscribe(
      (change: boolean) => {
        if (change) {
          const iflogin = this.userinfo.isLogin;
          const userinfo = this.userinfo.myInfo;
          if (this.ifLogin !== iflogin || this.user !== userinfo) {
            this.ifLogin = iflogin;
            this.user = userinfo;
            // this.cdRef.detectChanges();
          }
        }
      }
    );
    // 监听url变化， 一旦变化请求notification和feeds
    if (this.userinfo.isLogin) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe(() => {
        this.newNotification();
        this.newFeeds();
      });
    }
  }
  ngOnDestroy() {
    this.userinfo.userInfoChange.unsubscribe();
  }
  newNotification() {
    const callback = ( result: ApiResult) => {
      if (result.success) {
        if (result.data.count > 0) {
          this.new_notification = true;
          this.notification_msg = result.data.latest.message;
        } else {
          this.new_notification = false;
          this.notification_msg = '';
        }
      }
    };
    this.http.check_new_notifications(callback);
  }
  newFeeds() {
    const callback = ( result: ApiResult) => {
      if (result.success) {
        if (result.data.count > 0) {
          this.new_feeds = true;
        } else {
          this.new_feeds = false;
        }
      }
    };
    this.http.check_new_feeds(callback);
  }
  logout() {
    this.http.user_logout(this.logout_callback);
  }
  logout_callback = (result: ApiResult) => {
    if (result.success) {
      this.userinfo.setUserInfobyInfo(false, undefined);
      this.message.success('Successfully log out!');
    } else {
      this.message.error('Fail to log out.' + result.data.detail);
    }
  }
}
