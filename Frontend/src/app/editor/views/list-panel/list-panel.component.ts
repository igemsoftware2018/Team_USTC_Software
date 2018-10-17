import { Component, OnInit, Input } from '@angular/core';
import { ReportSubroutineHeader, ReportListHeader, ReportResultHeader } from '../../headers/article';

@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.less']
})
export class ListPanelComponent implements OnInit {

  constructor() { }
  @Input() ret: ReportResultHeader;

  ngOnInit() {
    if (this.ret.list === undefined ) {
      this.ret.list =  new Array<ReportListHeader>();
      const  _tmp = new ReportListHeader();
      this.ret.list.push(_tmp);
    }
  }

  pushList() {
    if (this.ret.list === undefined ) {
      this.ret.list =  new Array<ReportListHeader>();
    }
    const  _tmp = new ReportListHeader();
    this.ret.list.push(_tmp);
  }

  delList(idx: number) {
    if (idx >= 0 && idx < this.ret.list.length) {
      this.ret.list.splice(idx, 1);
    }
  }

}
