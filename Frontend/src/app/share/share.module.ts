import { NgModule } from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';
import en from '@angular/common/locales/en';

import { PandaComponent } from './panda/panda.component';
import { OthersReportComponent } from './others-report/others-report.component';
import { SiminfoComponent } from './siminfo/siminfo.component';
import { FollowuserComponent } from './followuser/followuser.component';
import { UserInfoProfileComponent } from './user-info-profile/user-info-profile.component';
import { ReportCardComponent } from './report-card/report-card.component';
import { MyReportComponent } from './my-report/my-report.component';
import { WatchReportByClassificationComponent } from './watch-report-by-classification/watch-report-by-classification.component';
import { RouterModule} from '@angular/router';
import { ClassificationComponent } from './classification/classification.component';
import { IgemerCardComponent } from './igemer-card/igemer-card.component';
import { PendingComponent } from './pending/pending.component';
import { WrongPendingComponent } from './wrong-pending/wrong-pending.component';
import { DBsearchresultComponent } from './dbsearchresult/dbsearchresult.component';


registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PandaComponent,
    OthersReportComponent,
    SiminfoComponent,
    FollowuserComponent,
    UserInfoProfileComponent,
    ReportCardComponent,
    MyReportComponent,
    WatchReportByClassificationComponent,
    ClassificationComponent,
    IgemerCardComponent,
    PendingComponent,
    WrongPendingComponent,
    DBsearchresultComponent
  ],
  // 公用导出组件放在exports数组内
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  exports: [
    PandaComponent,
    NgZorroAntdModule,
    OthersReportComponent,
    SiminfoComponent,
    FollowuserComponent,
    UserInfoProfileComponent,
    ReportCardComponent,
    MyReportComponent,
    WatchReportByClassificationComponent,
    ClassificationComponent,
    IgemerCardComponent,
    PendingComponent,
    WrongPendingComponent,
    DBsearchresultComponent
  ]
})
export class ShareModule { }
