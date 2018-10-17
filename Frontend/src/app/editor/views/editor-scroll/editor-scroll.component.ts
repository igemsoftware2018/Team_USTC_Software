import { Component, OnInit, DoCheck } from '@angular/core';
import { EditorReportService } from '../../core/editorReport.service';
import { EditorEventService } from '../../core/editor-event.service';

@Component({
  selector: 'app-editor-scroll',
  templateUrl: './editor-scroll.component.html',
  styleUrls: ['./editor-scroll.component.less']
})
export class EditorScrollComponent implements OnInit, DoCheck {

  constructor(public editor: EditorReportService, public event: EditorEventService) { }

  public iconsList: string[];
  public idxList: number[];

  ngOnInit() {
  }

  ngDoCheck() {
    this.iconsList = [];
    this.idxList = [];
    let idx = 1;
    for (const sub of this.editor.report.subroutines) {
      for (const step of sub.steps) {
        this.iconsList.push(step.ico);
        this.idxList.push(idx);
      }
      idx += 1;
    }
  }

  public sentEvent(value: number) {
    this.event.eventEmit.emit(value);
  }

}
