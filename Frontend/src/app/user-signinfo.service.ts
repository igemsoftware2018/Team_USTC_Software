import { Injectable, EventEmitter } from '@angular/core';
import { Simuser } from './Interface/userinfo';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserSigninfoService {
  isLogin = false;
  myInfo: Simuser|undefined = undefined;
  username: string;
  password: string;
  userInfoChange: EventEmitter<boolean>;


  constructor( private http: HttpService) {
    this.userInfoChange = new EventEmitter<boolean>();
  }

  setUserInfobyInfo( iflogin: boolean , info: any) {
    this.isLogin = iflogin;
    if ( ifSimuser(info)) {
      this.myInfo = info;

      this.myInfo.stat = info['stat'];
      this.myInfo.followed = true;
    } else {
     this.myInfo = undefined;
    }
    this.userInfoChange.emit(true);
  }
  // 判断id号是否是自己
  isMyself( user_id: number): boolean {
    if (!this.isLogin) {
      return false;
    }
    if (user_id === this.myInfo.id) {
      return true;
    }
    return false;
  }
}

function ifSimuser(info: any): info is Simuser {
  return info !== undefined;
}
