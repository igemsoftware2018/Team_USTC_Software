import { Injectable } from '@angular/core';
import { HttpService } from '../../http.service';
import {EditorStepHeader} from '../headers/steps';
import {ReportHeader, ReportStepsHeader, ReportSubroutineHeader, ReportResultHeader, subType} from '../headers/article';
import { mockStep } from '../mock/mock-steps';

export enum RenderState {
  loading = 0,
  ready = 1,
  no_such_report = 2,
  other_error = 3,
}

@Injectable({
  providedIn: 'root'
})
export class RenderServiceService {

  private _report: ReportHeader;
  public state: RenderState = RenderState.loading;
  public extraContent: {};

  public get report() {
    return this._report;
  }

  public set report(re: ReportHeader) {
    this._report = re;
  }

  constructor(private http: HttpService) {
    this.extraContent = {};
  }

  getReportFromBackend(reportId: number) {
    this.http.get_report_by_id(reportId, rst => {
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
        tmp.material = ['material1', 'matrial2', 'material3'];
        this.report = tmp;
        this.renderReport();
        this.state = RenderState.ready;
      } else {
        this.state = RenderState.other_error;
      }
    });
  }

  public renderReport() {
    if ( this.report.material) {
      this.extraContent['material'] = this.report.material.join(',');
    }
    this.extraContent['s'] = [];
    for (const sub of this.report.subroutines) {
      if (sub.subType === subType.steps) {
        for (const step of sub.steps) {
          this.extraContent['s'].push({'s': this.parseSentense(step), 'n': step.remark});
        }
      } else if (sub.subType === subType.table) {
        this.extraContent['s'].push({'s': 'Table', 'n': '', 'a': sub.table});
      } else if (sub.subType === subType.list) {
        this.extraContent['s'].push({'s': 'List', 'n': '', 'a': sub.list});
      } else if (sub.subType === subType.pictures) {
        this.extraContent['s'].push({'s': 'Picture', 'n': '', 'a': sub.pic});
      }
    }
    console.log(this.extraContent);
  }

  public parseSentense(step: ReportStepsHeader) {
    const reS = /@(\S+)/g;
    let tmpString = step.yield_method;
    while (reS.exec(tmpString)) {
      tmpString = tmpString.replace(reS, (elem) => {
        const tt =  step.data[elem.slice(1)];
        if ( tt === undefined) {
          return '';
        } else {
          return tt;
        }
      });
    }
    return tmpString;
  }
}
