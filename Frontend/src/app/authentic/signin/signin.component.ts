import { Component, OnInit } from '@angular/core';
import { forbiddenUsernameValidator, forbiddenEmailValidator} from './forbidden-signin';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import {NzMessageService} from 'ng-zorro-antd';
import { Router} from '@angular/router';
import { UserSigninfoService } from '../../user-signinfo.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {
  validateForm: FormGroup;
  shake = false;
  constructor(private http: HttpService,
              private message: NzMessageService,
              private router: Router,
              private userinfo: UserSigninfoService) { }
  // define validator to signin form
  ngOnInit(): void {
    this.validateForm = new FormGroup({
      'username': new FormControl(null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20),
          forbiddenUsernameValidator(), forbiddenEmailValidator()]),
      'password': new FormControl(null,
        [Validators.required]),
      'remember': new FormControl(true)
    });
  }
  // submit signin form
  submitForm(): void {
    console.log('login');
    const signinInfo = this.validateForm.value;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.http.user_login(signinInfo.username, signinInfo.password, this.judgeSignin);
  }
  // judge if submit successfully
  judgeSignin = (result: ApiResult) => {
    console.log(result);
    console.log('login');
    if (result.success) {
      this.message.success('Sign up sucessfully');
      this.userinfo.setUserInfobyInfo(true, result.data);
      this.router.navigateByUrl('/explore');
    } else {
      this.message.error('Fail to Sign up.' + result.data.detail);
    }
  }
  get username() { return this.validateForm.get('username'); }
  get password() { return this.validateForm.get('password'); }
  // control panda shaking its hand
  startShake() {
    this.shake = true;
  }
  stopShake() {
    this.shake = false;
  }
}
