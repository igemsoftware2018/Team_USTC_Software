import { Injectable } from '@angular/core';
import { ReportResultHeader, subType } from '../headers/article';

import { EditorEventService } from '../core/editor-event.service';
import {EditorReportService} from './editorReport.service';

@Injectable()
export class AppendixService {

  constructor(public editor: EditorReportService, public event: EditorEventService) { }

  goToTop(value: number) {
    this.event.eventEmit.emit(value);
  }

  reportAddText() {
    const _new_sub = new ReportResultHeader();  // 新建 subroutine
    _new_sub.desc = '';
    _new_sub.subType = subType.text;
    _new_sub.list = [];
    _new_sub.pic = [];
    this.editor.report.result.push(_new_sub);
  }

  reportAddPict() {
    const _new_sub = new ReportResultHeader();  // 新建 subroutine
    _new_sub.desc = '';
    _new_sub.subType = subType.pictures;
    _new_sub.list = [];
    _new_sub.pic = [];
    this.editor.report.result.push(_new_sub);
  }

  reportAddTable() {
    const _new_sub = new ReportResultHeader();  // 新建 subroutine
    _new_sub.desc = '';
    _new_sub.subType = subType.table;
    _new_sub.list = [];
    _new_sub.pic = [];
    _new_sub.table = [];
    this.editor.report.result.push(_new_sub);
  }

  reportAddList() {
    const _new_sub = new ReportResultHeader();  // 新建 subroutine
    _new_sub.desc = '';
    _new_sub.subType = subType.list;
    _new_sub.list = [];
    _new_sub.pic = [];
    this.editor.report.result.push(_new_sub);
  }

  reportShowInfo() {
    this.goToTop(0);
    // this.editor.infoSub.state = 'active';
  }

  reportShowTop() {
    this.goToTop(0);
  }

  reportShowResult() {
    this.goToTop(-1);
  }

  // reportAddInfo() {
  //   const _new_sub = new ReportSubroutineHeader();  // 新建 subroutine
  //   _new_sub.id = '-98';
  //   _new_sub.desc = '';
  //   _new_sub.subType = subType.info;
  //   _new_sub.name = 'Info';
  //   _new_sub.idx =  0;
  //   _new_sub.list = [];
  //   this.editor.watch-all-info.subroutines.push(_new_sub);
  //   _new_sub.pic = [];
  // }

}
