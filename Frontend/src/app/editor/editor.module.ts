import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzNotificationService } from 'ng-zorro-antd';

import { SortablejsModule } from './angular-sortablejs/src/sortablejs.module';

import { StepsService } from './core/steps.service';
import { AppendixService } from './core/appendix.service';
import { EditorReportService } from './core/editorReport.service';
import { GetDataService } from './getData/getData.service';
import { EditorEventService } from './core/editor-event.service';

import { MainComponent } from './views/main/main.component';
import { StepBarComponent } from './views/step-bar/step-bar.component';
import { EditAreaComponent } from './views/edit-area/edit-area.component';
import { ButtonAreaComponent } from './views/button-area/button-area.component';
import { SubroutineComponent } from './views/subroutine/subroutine.component';
import { EditorFieldTypeComponent } from './views/editor-field-type/editor-field-type.component';
import { StepPanelComponent } from './views/step-panel/step-panel.component';
import { TextPanelComponent } from './views/text-panel/text-panel.component';
import { PictPanelComponent } from './views/pict-panel/pict-panel.component';
import { ListPanelComponent } from './views/list-panel/list-panel.component';
import { RemarkPanelComponent } from './views/remark-panel/remark-panel.component';
import { InfoPanelComponent } from './views/info-panel/info-panel.component';
import { EditorScrollComponent } from './views/editor-scroll/editor-scroll.component';
import { TablePanelComponent } from './views/table-panel/table-panel.component';
import {ReportRenderComponent} from './report-render/report-render.component';

import { RouteEditorModule } from './route-editor/route-editor.module';

@NgModule({
  imports: [
    RouteEditorModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    SortablejsModule,
  ],
  declarations: [
    MainComponent,
    StepBarComponent,
    EditAreaComponent,
    ButtonAreaComponent,
    SubroutineComponent,
    EditorFieldTypeComponent,
    StepPanelComponent,
    TextPanelComponent,
    PictPanelComponent,
    ListPanelComponent,
    RemarkPanelComponent,
    InfoPanelComponent,
    EditorScrollComponent,
    TablePanelComponent,
    ReportRenderComponent,
  ],
  providers: [
    StepsService,
    EditorReportService,
    GetDataService,
    AppendixService,
    EditorEventService,
  ],
  exports: [
    ReportRenderComponent,
  ]
})
export class EditorModule { }
