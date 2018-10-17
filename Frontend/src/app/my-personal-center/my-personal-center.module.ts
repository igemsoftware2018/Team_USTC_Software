import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPersonalCenterRoutingModule } from './my-personal-center-routing.module';
import { MyCenterIndexComponent } from './my-center-index/my-center-index.component';
import { ShareModule } from '../share/share.module';
import { UserSetModule } from './user-set/user-set.module';
import { WatchInfoModule } from './user-info/watch-info.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {en_US, NZ_I18N} from 'ng-zorro-antd';
import { MyIndexBodyComponent } from './my-center-index/my-index-body/my-index-body.component';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    MyPersonalCenterRoutingModule,
    ShareModule,
    UserSetModule,
    WatchInfoModule
  ],
  declarations: [MyCenterIndexComponent, MyIndexBodyComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class MyPersonalCenterModule { }
