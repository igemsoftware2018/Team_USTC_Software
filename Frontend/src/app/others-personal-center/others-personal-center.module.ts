import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PersonalInformationComponent } from './display-container/personal-information/personal-information.component';
import { ProfilePageComponent } from './display-container/profile-page/profile-page.component';
import { DisplayAllInfoComponent } from './display-container/watch-all-info/display-all-info.component';
import { ShareModule } from '../share/share.module';
import {OthersPersonalCenterRoutingModule} from './others-personal-center-routing.module';
import { WatchReportLabelComponent } from './display-container/watch-report-label/watch-report-label.component';
import { WatchReportArchiveComponent } from './display-container/watch-report-archive/watch-report-archive.component';


@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ShareModule,
    OthersPersonalCenterRoutingModule
  ],
  declarations: [
    PersonalInformationComponent,
    ProfilePageComponent,
    DisplayAllInfoComponent,
    WatchReportLabelComponent,
    WatchReportArchiveComponent,
  ],
  exports: [
    NgZorroAntdModule,
  ]
})
export class OthersPersonalCenterModule { }
