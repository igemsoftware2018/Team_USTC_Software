import { Injectable } from '@angular/core';

import {EditorStepHeader, EditorSubroutineHeader} from '../headers/steps';
import {GetDataService} from '../getData/getData.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class StepsService {

  _steps: EditorStepHeader[];
  _subs: EditorSubroutineHeader[];

  public get steps() {
    return this._steps;
  }

  public get subs() {
    return this._subs;
  }

  constructor(public getDataService: GetDataService, public notice: NzNotificationService) {}

  public mockData() {
    this._steps = this.getDataService.getStepsMock();
    this._subs = this.getDataService.getProcessMock();
    this.getPersonalModel();
  }

  public findStep(stepId: string) {
    // 查找指定 id 的 step 的第一个
    return this.steps.filter ( step => step.id === stepId)[0];
  }

  public findSubroutine(subId: string) {
    // 查找指定 id 的 subroutine 的第一个
    return this.subs.filter ( sub => sub.id === subId)[0];
  }

  public addSteps(stepName: string, stepYield: string, stepTemp: {value: string}[]) {
    // 没有定义
    const newStep = new EditorStepHeader();
    newStep.desc = stepName;
    newStep.name = stepName;
    newStep.ico = 'assets/img/editor/icons/' + stepName[0].toUpperCase() + '.png';

    if ( newStep.name === undefined || newStep.name === '' ) {
      this.notice.blank('Add Step Failed', 'name can not be blank');
      return ;
    }

    const arr: string[] =  [];
    for (const st of stepTemp) {
      arr.push(st.value);
    }
    newStep.template = '- ' + arr.join(' - ') + ' -';
    newStep.yield_method = stepYield;
    this.getDataService.saveNewStep(newStep, (rst) => {
      if (rst['status'] === 200) {
        newStep.id = rst['data']['id'];
        this._steps = [ ...this._steps, newStep];
      } else {
        this.notice.blank('Add Step Failed', rst['data']['detail']);
      }
    });
  }

  public addSubroutine(name: string, stepsLists: string[]) {
    // 新建新的过程
    const newSub = new EditorSubroutineHeader();
    newSub.name = name;
    newSub.steps = stepsLists;
    newSub.default = [];
    newSub.steps.forEach(element => {
      newSub.default.push({});
    });

    if ( newSub.name === undefined || newSub.name === '' ) {
      this.notice.blank('Add Protocol Failed', 'name can not be blank');
      return ;
    }

    this.getDataService.saveNewSubroutine(newSub, (rst) => {
      if (rst['status'] === 200) {
        newSub.id = rst['data']['id'];
        this._subs = [ ...this._subs, newSub];
      } else {
        this.notice.blank('Add Subroutine Failed', rst['data']['detail']);
      }
    });
  }

  public getPersonalModel() {
    this.getDataService.getMySteps( rst => {
      if (rst['status'] === 200) {
        rst['data'].forEach(element => {
          const tmpStep = (JSON.parse(element['content_json']) as EditorStepHeader);
          tmpStep.id = element['id'].toString();
          this._steps = [...this._steps, tmpStep];
        });
      } else {
        this.notice.blank('Retrive Steps failed.', rst['data']['detail']);
      }
    });

    this.getDataService.getMySubs( rst => {
      if (rst['status'] === 200) {
        rst['data'].forEach(element => {
          const tmpSub = (JSON.parse(element['content_json']) as EditorSubroutineHeader);
          tmpSub.id = element['id'].toString();
          this._subs = [...this._subs, tmpSub];
          console.log(this._subs);
        });
      } else {
        this.notice.blank('Retrive Subroutine failed.', rst['data']['detail']);
      }
    });
  }

  public getTemp(stepId: string) {
    const step_t = this.findStep(stepId);
    return step_t.template;
  }

  public getIco(stepId: string) {
    const step_t = this.findStep(stepId);
    return step_t.ico;
  }

  public getYield(stepId: string) {
    const step_t = this.findStep(stepId);
    return step_t.yield_method;
  }

  public getMaterial(stepId: string) {
    const step_t = this.findStep(stepId);
    return step_t.material;
  }
}
