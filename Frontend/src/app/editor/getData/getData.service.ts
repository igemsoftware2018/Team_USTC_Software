import { Injectable } from '@angular/core';
import {EditorStepHeader, EditorSubroutineHeader} from '../headers/steps';

import { HttpService } from '../../http.service';
import { mockStep } from '../mock/mock-steps'; // MockStep
import { mockSub } from '../mock/mock-sub'; // MockStep
import {callbackFunc} from '../../Type/callbackFunc';

@Injectable()
export class GetDataService {
  user: any;

  constructor(public httpService: HttpService) { }

  public getStepsMock() {
    return mockStep;
  }

  public getProcessMock() {
    return mockSub;
  }

  public saveNewStep(step: EditorStepHeader, callback: callbackFunc) {
    const tmp = {};
    tmp['content_json'] = JSON.stringify(step);
    tmp['yield_method'] = step.yield_method;
    console.log(tmp);
    this.httpService.create_step(tmp, callback);
  }

  public saveNewSubroutine(sub: EditorSubroutineHeader, callback: callbackFunc) {
    const tmp = {};
    tmp['content_json'] = JSON.stringify(sub);
    tmp['yield_method'] = 'Actually not use';
    console.log(tmp);
    this.httpService.create_subroutine(tmp, callback);
  }

  public getMySteps(callback: callbackFunc) {
    this.httpService.get_all_my_steps(callback);
  }

  public getMySubs(callback: callbackFunc) {
    this.httpService.get_all_my_subroutines(callback);
  }

  public getMyReport(id: number, callback: callbackFunc) {
    this.httpService.get_report_by_id(id, callback);
  }

  public saveMyReport(report: any, callback: callbackFunc) {
    if (report['id'] && report['id'] !== 0) {
      this.httpService.update_report(report['id'], report, callback);
    } else {
      this.httpService.create_report(report, callback);
    }
  }
}

