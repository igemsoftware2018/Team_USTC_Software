import { Component, OnInit,  ElementRef, ViewChild, OnChanges  } from '@angular/core';
import { ReportHeader } from '../../headers/article';
import { EditorReportService } from '../../core/editorReport.service';
import { SortablejsOptions } from '../../angular-sortablejs/src/sortablejs-options';
import {EventService} from '../../report-render/event.service';

import { EditorEventService } from '../../core/editor-event.service';
import {State} from '../../headers/status';



@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.less'],
})
export class EditAreaComponent implements OnInit {

  editorHeight: string; // 判断高度
  currentReport: ReportHeader;
  flag: string;
  state: State;

  timer: any;

  isPreview: boolean; // 预览相关

  @ViewChild('scrolss') scroll: ElementRef;
  @ViewChild('subDom') subDom: ElementRef;

  options: SortablejsOptions = {
    handle: '.subroutineTitlePart',
  };

  constructor(public editorReportService: EditorReportService,
              public event: EditorEventService,
              public element: ElementRef,
              public downloadService: EventService) { }

  ngOnInit() {
    this.onResize();
    this.flag = 'inactive';
    this.state = State.loading;

    this.timer = setTimeout( () => this.state = State.error, 20000);

    this.event.refresh.subscribe( (value: State) => {
      clearTimeout(this.timer);
      if (value === State.loading) {
        this.state = State.loading;
      } else if (value === State.ready) {
        this.state = State.ready;
        this.getReady();
      } else {
        this.state = State.error;
      }
    });
  }

  private getReady() {
    this.currentReport = this.editorReportService.report;
    this.event.eventEmit.subscribe((value: any) => {
      if (value === 0) {
        this.scroll.nativeElement.scrollTop = 0;
      } else if (value === -1) {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
      } else {
        const subsDoms = this.subDom.nativeElement.querySelectorAll('.subs_flag');
        this.scroll.nativeElement.scrollTop = subsDoms[value - 1].offsetTop;
      }
   });
  }

  public onResize() {
    // 更新大小
    this.editorHeight = (window.innerHeight - 110) + 'px'; // raw 110
  }

  public changeIsPreview () {
    if (this.state === State.ready) {
      this.state = State.preview;
    } else if (this.state === State.preview) {
      this.state = State.ready;
    }
  }

  public getId() {
    return this.currentReport.id;
  }

  public downloadPdf() {
    this.downloadService.downloadEvent.emit(0);
  }
}
