import { Component, OnInit, Input } from '@angular/core';
import { ReportSubroutineHeader } from '../../headers/article';
import { EditorReportService } from '../../core/editorReport.service';

import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-remark-panel',
  templateUrl: './remark-panel.component.html',
  styleUrls: ['./remark-panel.component.less'],
  animations: [
    trigger('panelResult', [
      state('inactive', style({height: 0, display: 'none' , opacity: 0})),
      state('active',   style({display: 'block' , opacity: 1})),
      transition('inactive => active', animate('200ms')),
      transition('active => inactive', animate('200ms'))
    ]),
  ]
})
export class RemarkPanelComponent implements OnInit {

  smallResultWindows: boolean; // 判断屏幕是不是太小

  panelResultState: string;

  constructor(public editor: EditorReportService) { }

  ngOnInit() {
    this.panelResultState = 'inactive';
    this.getWindowsResultWidth();
  }

  panelResultReverse() {
    this.panelResultState = this.panelResultState === 'inactive' ? 'active' : 'inactive';
  }

  getWindowsResultWidth() {
    this.smallResultWindows =  window.innerWidth < 800;
  }

  delResult(id: number) {
    this.editor.report.result.splice(id, 1);
  }

}
