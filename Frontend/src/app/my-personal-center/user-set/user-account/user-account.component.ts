import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpService} from '../../../http.service';
import { ApiResult } from '../../../Interface/ApiResult';
import { NzMessageService } from 'ng-zorro-antd';
import { userAccountValidator,
         forbiddenAlphaValidator,
         forbiddenNumericValidator} from './forbidden-useraccount';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.less']
})
export class UserAccountComponent implements OnInit {
  useraccount: FormGroup;

  callback = (result: ApiResult) => {
    console.log(result);
    if (result.success) {
      this.message.success('Update sucessfully');
    } else {
      this.message.error('Fail to Update.' + result.data.detail);
    }
  }

  constructor(private fb: FormBuilder, private http: HttpService, private message: NzMessageService) { }

  update_password(): void {

    this.http.update_password(this.useraccount.value.oldpassword, this.useraccount.value.newpassword, this.callback);
  }
  ngOnInit() {
    this.useraccount = new FormGroup({
      oldpassword: new FormControl(),
      newpassword: new FormControl('', [
        forbiddenAlphaValidator(),
        forbiddenNumericValidator(),
        Validators.minLength(7),
        Validators.maxLength(30),
      ]),
      confirmpassword: new FormControl('', [
        forbiddenAlphaValidator(),
        forbiddenNumericValidator(),
        Validators.minLength(7),
        Validators.maxLength(30),
      ])
    }, { validators: userAccountValidator });
  }

}
