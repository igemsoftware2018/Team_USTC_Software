import { NgModule } from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import en from '@angular/common/locales/en';

import { AuthenticRoutingModule } from './authentic-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ShareModule } from '../share/share.module';
import { StartResetComponent } from './start-reset/start-reset.component';
import { CpltResetComponent } from './cplt-reset/cplt-reset.component';
import { SignupComponent } from './signup/signup.component';


registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    AuthenticRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule
  ],
  declarations: [
    SigninComponent,
    StartResetComponent,
    CpltResetComponent,
    SignupComponent,
  ],
  exports: [
    NgZorroAntdModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class AuthenticModule { }
