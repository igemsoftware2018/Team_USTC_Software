import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { ReportStepsHeader } from '../../headers/article';

@Component({
  selector: 'app-step-panel',
  templateUrl: './step-panel.component.html',
  styleUrls: ['./step-panel.component.less'],
  animations: [
    trigger('panel', [
      state('inactive', style({height: 0, display: 'none' , opacity: 0})),
      state('active',   style({height: 100 , display: 'block' , opacity: 1})),
      transition('inactive => active', animate('200ms')),
      transition('active => inactive', animate('200ms'))
    ]),
  ]
})
export class StepPanelComponent implements OnInit {
  @Input() step: ReportStepsHeader;

  smallWindows: boolean; // 判断屏幕是不是太小

  panelState: string;

  constructor() { }

  ngOnInit() {
    this.panelState = 'inactive';
    this.getWindowsWidth();
  }

  panelReverse() {
    this.panelState = this.panelState === 'inactive' ? 'active' : 'inactive';
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
