import { Component, OnInit, Input } from '@angular/core';
import { ReportSubroutineHeader, ReportResultHeader } from '../../headers/article';

@Component({
  selector: 'app-text-panel',
  templateUrl: './text-panel.component.html',
  styleUrls: ['./text-panel.component.less']
})
export class TextPanelComponent implements OnInit {

  @Input() ret: ReportResultHeader;
  constructor() { }

  ngOnInit() {
  }

}
