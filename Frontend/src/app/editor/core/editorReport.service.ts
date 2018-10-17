import { Injectable} from '@angular/core';
import {  ReportHeader, ReportSubroutineHeader, ReportStepsHeader, ReportResultHeader, subType } from '../headers/article';
import {StepsService} from './steps.service';
import {GetDataService} from '../getData/getData.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { EditorEventService } from '../core/editor-event.service';
import {State} from '../headers/status';

@Injectable()
export class EditorReportService {

  private _report: ReportHeader; // 当前文章
  private _state: boolean;

  public get report () {
    return this._report;
  }

  public set report (report: ReportHeader) {
    this._report = report;
  }


  constructor(public stepsService: StepsService,
              public getDataService: GetDataService,
              public notice: NzNotificationService,
              public event: EditorEventService) { }

  public parser (step: ReportStepsHeader ) {
    // 解析简单模版
    let temp = step.temp ? step.temp : this.stepsService.getTemp(step.id);
    step.ico = step.ico ? step.ico : this.stepsService.getIco(step.id);
    const data = step.data;

    temp += ' - ';
    const tokens = temp.split(' ').filter((elem) => elem !== '');
    let _fields = [];
    let _field: any = {};
    let states = 0;
    for (const token of tokens) {
      if (token === '-') {
        _fields.push(_field);
        _field = {};
        _field.attr = [];
        states = 0;
      } else if (states === 0) {
        states += 1;
        _field.type = token;
      } else if (states === 1) {
        states += 1;
        _field.label = token;
      } else if (states === 2) {
        states += 1;
        _field.default = token;
      } else {
        if (token[0] === '@') {
          _field.attr.push(token);
        } else {
          _field.unit = token;
        }
      }
    }
    _fields = _fields.filter( (elem) => Object.keys(elem).length > 1 );

    for (const fld of _fields) {
      let tmpValue: string;
      if (typeof data[fld.label] !== 'undefined') {
        tmpValue = data[fld.label];
      } else if (fld.default === 'null' || typeof fld.default === 'undefined') {
        tmpValue = '';
      } else {
        tmpValue = fld.default;
      }
      fld.value = tmpValue;
    }

    // Remark 部分
    if ((!step.remark || step.remark === '') && data['Notes']) {
      step.remark = data['Notes'];
    }
    const fld_remark: any = new Object();
    fld_remark.type = 'input';
    fld_remark.label = 'Notes';
    fld_remark.default = '';
    fld_remark.attr = ['@big'];
    fld_remark.value = step.remark ? step.remark : '';
    _fields.push(fld_remark);
    step.fields = _fields;
  }

  public parseAll() {
    for (const sub of this.report.subroutines ) {
      // if (sub.subType === subType.steps) {
        for (const step of sub.steps) {
          this.parser(step);
          sub.name = step.name;
        }
      // } else {
      //   sub.name = sub.subType;
      // }
    }
  }

  public reportSaveAll() {
    for (const sub of this.report.subroutines ) {
      for (const step of sub.steps) {
        this.reportSave(step);
      }
    }
  }

  public reportSave(step: ReportStepsHeader) {
    for (const name of step.fields.name) {
      step.data[name] = step.fields[name];
    }
    delete step.fields;
  }

  public reportSort(arrayAny: any) {
    arrayAny.sort( (a, b) => a.idx - b.idx );
  }

  public reportAddStep(stepid: string) {
    const _step_temp = this.stepsService.findStep(stepid);
    const _new_sub = new ReportSubroutineHeader();  // 新建 subroutine
    _new_sub.id = '0';
    _new_sub.desc = _step_temp.desc;
    _new_sub.name = _step_temp.name;
    // _new_sub.idx =  (this.watch-all-info.subroutines[this.watch-all-info.subroutines.length - 1] || {idx: 0}).idx + 1;
    _new_sub.idx = 0;
    _new_sub.steps = [];

    if ( _step_temp.desc === 'Table') {
      _new_sub.subType = subType.table;
      _new_sub.table = new Array<any>() ;
      this.report.subroutines.push(_new_sub);
      return;
    } else if (_step_temp.desc === 'Picture') {
      _new_sub.subType = subType.pictures;
      this.report.subroutines.push(_new_sub);
      _new_sub.pic = [];
      return;
    } else if (_step_temp.desc === 'List') {
      _new_sub.subType = subType.list;
      _new_sub.list =  new Array<any>();
      this.report.subroutines.push(_new_sub);
      return;
    }

    const _new_step = new ReportStepsHeader();  // 新建 step
    _new_step.name = _step_temp.id;
    _new_step.data = {};
    _new_step.idx = 1;
    _new_step.ico = _step_temp.ico;
    _new_step.temp = _step_temp.template;
    _new_step.id = _step_temp.id;
    _new_step.name = _step_temp.name;
    _new_step.yield_method = _step_temp.yield_method;
    this.parser(_new_step);
    _new_sub.steps.push(_new_step);
    this.report.subroutines.push(_new_sub);
  }

  public reportAddSubroutine(subid: string) {
    const _sub_temp = this.stepsService.findSubroutine(subid);

    const _new_sub = new ReportSubroutineHeader();  // 新建 subroutine
    _new_sub.id = _sub_temp.id ? _sub_temp.id : '0';
    _new_sub.desc = _sub_temp.desc;
    _new_sub.name = _sub_temp.name;
    // _new_sub.idx =  (this.watch-all-info.subroutines[this.watch-all-info.subroutines.length - 1] || {idx: 0}).idx + 1;

    _new_sub.idx = 0;
    _new_sub.steps = [];

    let idx = 0;
    for (const step_id of _sub_temp.steps) { // 建立每一个 steps
      const _step_temp = this.stepsService.findStep(step_id);
      const _new_step = new ReportStepsHeader();
      _new_step.id = step_id;
      _new_step.name = _step_temp.name;
      _new_step.ico = _step_temp.ico;
      _new_step.data = _sub_temp.default[idx];
      idx ++;
      _new_step.idx = 1;
      _new_step.temp = _step_temp.template;
      _new_step.id = _step_temp.id;
      _new_step.name = _step_temp.name;
      _new_step.yield_method = _step_temp.yield_method;
      this.parser(_new_step);
      _new_sub.steps.push(_new_step);
    }
    this.report.subroutines.push(_new_sub);
  }

  // reportAddInfo() {
  //   const _new_sub = new ReportSubroutineHeader();  // 新建 subroutine
  //   _new_sub.id = '-98';
  //   _new_sub.desc = '';
  //   _new_sub.subType = subType.info;
  //   _new_sub.name = 'Info';
  //   _new_sub.idx =  0;
  //   _new_sub.list = [];
  //   this.infoSub = _new_sub;
  //   this.watch-all-info.subroutines.push(_new_sub);
  //   _new_sub.pic = [];
  // }

  public reportDeleteStep(stepid: string) {
    // not implement error
    // It will never be completed.
  }

  private getId(sub: any): number {
    let _id = 0;
    while ( _id < this.report.subroutines.length && this.report.subroutines[_id] !== sub) {
      _id ++;
    }
    return _id;
  }

  public reportDeleteSubroutine(sub: any) {
    // not implement error
    this.report.subroutines.splice(this.getId(sub), 1);
  }

  public reportSwap(subIdx_1: number, subIdx_2: number) {
    // not implement error
    // 被废弃
    this.report.subroutines[this.getId(subIdx_1)].idx = subIdx_2;
    this.report.subroutines[this.getId(subIdx_2)].idx = subIdx_1;
  }

  public mockReport() {
    // 模拟文章数据
    const newSub = new ReportSubroutineHeader;
    newSub.id = 'add';
    newSub.idx = 1;
    newSub.steps = [];

    const newStep = new ReportStepsHeader;
    newStep.name = 'add';
    newStep.idx = 1;
    newStep.data = {speed: '4000'};
    newStep.temp = '- input speed 3000 rpm @small - input temp 20 @small - input xxx 55555 @mid - input yy 666 @big';
    newSub.steps.push(newStep);
    this.report.subroutines.push(newSub);
  }

  /*
  ** 下面是文章加载、保存等。
  */

  public initReport() {
    // 初始化文章
    this._state = true;
    this.report = new  ReportHeader();
    this.report.title = '';
    this.report.introduction = '';
    this.report.label = [];
    this.report.mdate = '';
    this.report.ndate = '';
    this.report.result = [];
    this.report.envs = {};
    this.report.subroutines = [];
    this.parseAll();
    setTimeout( () => this.event.refresh.emit(State.ready), 1000); // 假装载入一会
  }

  public saveReport (): void {
    this._state = false;
    // 序列化反序列化大法
    const _sent_report = JSON.parse(JSON.stringify(this.report));
    if (!_sent_report) {
      return;
    }
    if (!_sent_report.id ) {
      _sent_report.id = 0;
    }
    for (const attr of ['introduction', 'title', 'mdate', 'ndate', ]) {
      if (!_sent_report[attr]) {
        _sent_report[attr] = '';
      }
    }
    for (const attr of ['label', 'author', 'result', 'subroutines']) {
      if (!_sent_report[attr]) {
        _sent_report[attr] = [];
      }
    }
    for (const sub of _sent_report.subroutines) {
      for (const attr of [ 'idx', 'desc']) {
        if (sub[attr]) {
          delete sub[attr];
        }
      }
      for (const step of sub.steps) {
        for (const fld of step.fields) {
          if (fld.label === 'Notes') {
            step.remark = fld.value;
          } else {
            step.data[fld.label] = fld.value;
          }
        }
        for (const attr of ['idx', 'temp', 'fields', 'desc', 'ico']) {
          if (step[attr]) {
            delete step[attr];
          }
        }
      }
    }
    for (const ret of _sent_report['result']) {
      if (ret.subType === 'Pictures') {
        const tmpPics = [];
        for (const pic of ret.pic) {
          if (pic.status === 'done') {
            tmpPics.push(pic);
          }
        }
        ret.pic = tmpPics;
      }
    }
    _sent_report['result'] = JSON.stringify(_sent_report['result']);
    _sent_report['subroutines'] = JSON.stringify(_sent_report['subroutines']);
    _sent_report['envs'] = _sent_report['envs'] ? JSON.stringify(_sent_report['envs']) : JSON.stringify({}) ;
    _sent_report['authors'] = _sent_report['author'];

    delete _sent_report['author'];
    if (_sent_report['id'] && _sent_report['id'] !== 0) {
      _sent_report['id'] =  parseInt(_sent_report['id'], 10);
    }
    console.log(_sent_report);
    this.getDataService.saveMyReport(_sent_report, rst => {
      if (rst['status'] === 200) {
        this.report.id = rst['data']['id'].toString();
        this.report.mdate = rst['data']['mtime'];
        this.report.ndate = rst['data']['ntime'];
        this.report.author = [rst['data']['authors']];
        this.notice.success('Add Report Successful', '');
      } else {
        this.notice.blank('Add Report Failed', rst['data']['detail']);
      }
    });
  }

  public loadReport (reportId: number): void {
    this.getDataService.getMyReport(reportId, rst => {
      if (rst['status'] === 200) {
        const tmp: ReportHeader = new ReportHeader();
        tmp.id = rst['data']['id'].toString();
        tmp.title = rst['data']['title'];
        tmp.mdate = rst['data']['mtime'];
        tmp.ndate = rst['data']['ntime'];
        tmp.author = [rst['data']['author']];
        tmp.label = rst['data']['label'];
        tmp.envs = JSON.parse(rst['data']['envs']);
        tmp.subroutines = (JSON.parse(rst['data']['subroutines']) as ReportSubroutineHeader[]);
        tmp.result = (JSON.parse(rst['data']['result']) as ReportResultHeader[]);
        tmp.introduction = rst['data']['introduction'];
        this.report = tmp;
        this.parseAll();
        this._state = true;
        this.event.refresh.emit(State.ready);
      } else {
        this.notice.blank('Load Report Failed', rst['data']['detail']);
        this.event.refresh.emit(State.error);
      }
    });
  }
}
