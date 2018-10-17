import { NgModule } from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import en from '@angular/common/locales/en';
import { RouterModule } from '@angular/router';
import { UserinfoComponent } from './watch-info/userinfo.component';
import { DetailinfoComponent } from './watch-info/detailinfo/detailinfo.component';
import { ShareModule } from '../../share/share.module';
import { DetailinfoBylabelComponent } from './watch-info/detailinfo-bylabel/detailinfo-bylabel.component';
import { DetailinfoByarchiveComponent } from './watch-info/detailinfo-byarchive/detailinfo-byarchive.component';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ShareModule,
    RouterModule
  ],
  declarations: [
    DetailinfoComponent,
    UserinfoComponent,
    DetailinfoBylabelComponent,
    DetailinfoByarchiveComponent,
  ],
  exports: [
    NgZorroAntdModule,
    ShareModule,
    UserinfoComponent,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class WatchInfoModule { }
