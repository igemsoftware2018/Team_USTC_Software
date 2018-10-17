import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';

import { EditorReportService } from '../../core/editorReport.service';
import { ReportStepsHeader, ReportSubroutineHeader } from '../../headers/article';

@Component({
  selector: 'app-subroutine',
  templateUrl: './subroutine.component.html',
  styleUrls: ['./subroutine.component.less'],
  animations: [
    trigger('subPanel', [
      state('inactive', style({height: 0, display: 'none' , opacity: 0})),
      state('active',   style({ display: 'block' , opacity: 1})),
      transition('inactive => active', animate('200ms ease')),
      transition('active => inactive', animate('200ms ease'))
    ]),
    trigger('deletePanel', [
      transition('* => void', animate(200, style({height: 0})))
    ]),
  ]
})
export class SubroutineComponent implements OnInit {

  @Input() sub: ReportSubroutineHeader;
  @Input() type: string;

  subState: string; // 控制面板
  subShow: string;

  panelStyle: any = {
    'background'   : '#FFFFFF',
    'border-radius': '15px',
    'border-width': '1px',
    'border-style': 'solid',
    'border-color': '#979797',
  };

  smallWindows: boolean; // 判断屏幕是不是太小

  panelState: string;

  constructor(public editorReportService: EditorReportService) { }

  ngOnInit() {
    this.subState = 'active';
    this.subShow = 'true';
    this.getWindowsWidth();
  }

  getTitle() {
    if ( this.type === 'Steps' ) {
      return this.sub.name;
    } else if ( this.type === 'Info' ) {
      return 'Info';
    } else if (this.type === 'Result') {
      return 'Result';
    } else {
      return this.type;
    }
  }

  reverseState() {
    this.subState = this.subState === 'inactive' ? 'active' : 'inactive';
  }

  startDelete(idx: any) {
    this.subShow = 'void';
    this.editorReportService.reportDeleteSubroutine(idx);
  }


  getWindowsWidth() {
    this.smallWindows =  window.innerWidth < 800;
  }

  changeAttr(): string {
    if (this.smallWindows) {
      return '@mid';
    } else {
      return '@small';
    }
  }

}
