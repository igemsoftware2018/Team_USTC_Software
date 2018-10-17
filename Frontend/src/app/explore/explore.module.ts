import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { IndexComponent } from './index/index.component';
import { PopularReportComponent } from './popular-report/popular-report.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd';
import { PopularIgemersComponent } from './popular-igemers/popular-igemers.component';
registerLocaleData(en);
@NgModule({
  imports: [
    CommonModule,
    ExploreRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PopularReportComponent,
    IndexComponent,
    PopularIgemersComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class ExploreModule { }
