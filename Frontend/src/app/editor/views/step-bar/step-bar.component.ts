import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';

import { StepsService } from '../../core/steps.service';
import { EditorReportService } from '../../core/editorReport.service';
import { EditorStepHeader , EditorSubroutineHeader } from '../../headers/steps';
import { __String } from 'typescript';

@Component({
  selector: 'app-step-bar',
  templateUrl: './step-bar.component.html',
  styleUrls: ['./step-bar.component.less']
})
export class StepBarComponent implements OnInit, DoCheck, OnChanges {

  steps: EditorStepHeader[];
  subs: EditorSubroutineHeader[];

  tempNewStepName: string;
  tempNewStepField: string;
  tempNewStepTemp: any[];

  tempNewProcessName: string;
  tempNewProcessValue: string;
  tempNewProcessSteps: string[];

  public isVisibleStep: boolean;
  public isVisibleProcess: boolean;

  constructor(public stepsService: StepsService, public editorReportService: EditorReportService) { }

  ngOnInit() {
    this.steps = this.stepsService.steps;
    this.subs = this.stepsService.subs;
  }

  ngDoCheck() {
    this.steps = this.stepsService.steps;
    this.subs = this.stepsService.subs;
  }

  ngOnChanges() {
    this.steps = this.stepsService.steps;
    this.subs = this.stepsService.subs;
  }

  addSteps(stepId: string) {
    this.editorReportService.reportAddStep(stepId);
  }

  addSubs(subId: string) {
    this.editorReportService.reportAddSubroutine(subId);
  }

  public showStepModel() {
    this.isVisibleStep = true;
    this.tempNewStepName = '';
    this.tempNewStepTemp = [];
    this.tempNewStepField = '';
  }

  public handleCancelStep() {
    this.isVisibleStep = false;
    this.tempNewStepName = '';
    this.tempNewStepTemp = [];
    this.tempNewStepField = '';
  }

  public handleOkStep() {
    this.isVisibleStep = false;
    this.stepsService.addSteps(this.tempNewStepName, this.tempNewStepField, this.tempNewStepTemp);
    this.steps = this.stepsService.steps;
  }

  public showProcessModel() {
    this.isVisibleProcess = true;
    this.tempNewProcessName = '';
    this.tempNewProcessValue = '';
    this.tempNewProcessSteps = [];
  }

  public handleCancelProcess() {
    this.isVisibleProcess = false;
    this.tempNewProcessName = '';
    this.tempNewProcessValue = '';
    this.tempNewProcessSteps = [];
  }

  public handleOkProcess() {
    this.isVisibleProcess = false;
    this.stepsService.addSubroutine(this.tempNewProcessName, this.tempNewProcessSteps);
    console.log(this.stepsService.subs);
    this.subs = this.stepsService.subs;
  }

  public removeFieldStep(idx: number) {
    this.tempNewStepTemp.splice(idx, 1);
  }

  public addFieldStep() {
    this.tempNewStepTemp.push( {value: ''});
  }

  public addStepInSub(stepId: string) {
    this.tempNewProcessSteps = [...this.tempNewProcessSteps, stepId];
  }

  public getStepNameById(stepId: string) {
    let tmp: string = null;
    this.steps.forEach(element => {
      if (stepId === element.id) {
        tmp = element.name;
      }
    });
    return tmp;
  }

}
