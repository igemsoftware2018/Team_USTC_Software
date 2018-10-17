import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReportshowComponent } from './reportshow/reportshow.component';
import { ReportshowsRoutingModule } from './reportshows-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ReportshowotherComponent} from './reportshowother/reportshowother.component';
import {EditorModule} from '../editor/editor.module';
import { ReportAuthorInfoComponent } from './report-author-info/report-author-info.component';
import en from '@angular/common/locales/en';
import { NgZorroAntdModule, NZ_I18N, en_US, zh_CN } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    ReportshowsRoutingModule,
    EditorModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReportshowComponent,
    ReportshowotherComponent,
    ReportAuthorInfoComponent
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class ReportshowsModule { }
