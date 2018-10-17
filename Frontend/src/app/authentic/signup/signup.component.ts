import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  forbiddenEmailValidator,
  forbiddenUsernameValidator,
  forbiddenAlphaValidator,
  forbiddenNumericValidator,
} from './forbidden-signup';
import {HttpService} from '../../http.service';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiResult} from '../../Interface/ApiResult';
import { Router} from '@angular/router';
import { UserSigninfoService } from '../../user-signinfo.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  validateForm: FormGroup;
  shake = false;
  constructor(private http: HttpService,
              private message: NzMessageService,
              private router: Router,
              private userinfo: UserSigninfoService
              ) {}

  ngOnInit() {
    this.validateForm = new FormGroup({
      'username': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          forbiddenUsernameValidator(),
        ]),
      'email': new FormControl(null,
        [Validators.required, forbiddenEmailValidator()]),
      'password': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(30),
          forbiddenNumericValidator(),
          forbiddenAlphaValidator()
        ])
    });
  }
  submitForm(): void {
    const reginfo = this.validateForm.value;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.http.user_register(reginfo.username, reginfo.password, reginfo.email, this.registeCallback);
  }
  registeCallback = (result: ApiResult) => {
    console.log(result);
    if (result.success) {
      this.message.success('Sign up sucessfully. Start to sign in now!');
      this.router.navigateByUrl('/explore');
      this.userinfo.setUserInfobyInfo(true, result.data);
    } else {
      this.message.error(result.data.username + '.' + result.data.email);
    }
  }
  // form value
  get username() { return this.validateForm.get('username'); }
  get password() { return this.validateForm.get('password'); }
  get email() { return this.validateForm.get('email'); }
  // control panda's hands
  startShake() {
    this.shake = true;
  }
  stopShake() {
    this.shake = false;
  }
}
