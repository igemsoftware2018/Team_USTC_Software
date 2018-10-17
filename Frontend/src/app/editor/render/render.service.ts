import { Injectable } from '@angular/core';
import { ReportHeader, ReportSubroutineHeader, ReportStepsHeader } from '../headers/article';
import { StepsService } from '../core/steps.service';

class DomClass {
  domName: string;
  className?: string;
  innerDom?: any;
  constructor(domName: string, className?: string, inner?: any) {
    this.domName = domName;
    this.className = className;
    this.innerDom = [];
    this.innerDom.push( inner);
  }

  public insertChild(domName: string, className?: string, inner?: any) {
    this.innerDom.push(new DomClass(domName, className, inner));
  }

  public insertInner(_str: any) {
    this.innerDom.push(_str);
  }
}

@Injectable()
export class RenderService {

  constructor(public stepsService: StepsService) { }

  public htmlString: string;
  public domList: DomClass;

  public render(report: any) {
    this.renderToDom(report);
  }

  // 用来生成 DOM 树
  private renderToDom(report: ReportHeader) {
    // Information Part
    this.domList.insertChild('div', 'report_title', report.title);
    const rawTitle = new DomClass('div', 'report_sub_title');
    rawTitle.insertChild('div', 'report_author', 'Recorder: ' + report.author);
    rawTitle.insertChild('div', 'report_date', 'Date: ' + report.mdate);
    this.domList.innerDom.push(rawTitle);

    const IntroductionRaw = new DomClass('div', 'report_introducrtion');
    IntroductionRaw.insertChild('div', 'report_introduction_title', 'Introduction');
    IntroductionRaw.insertChild('div', 'report_introduction_content', report.introduction);
    this.domList.innerDom.push(IntroductionRaw);

    const MaterialRaw = new DomClass('div', 'report_material');
    MaterialRaw.insertChild('div', 'report_material_title', 'Introduction');
    MaterialRaw.insertChild('div', 'report_material_content', '');
    this.domList.innerDom.push(MaterialRaw);

    const ResultRaw = new DomClass('div', 'report_result');
    ResultRaw.insertChild('div', 'report_result_title', 'Result');
    for (const rest of report.result) {
      if (rest.subType === 'Text') {
        ResultRaw.insertChild('div', 'report_result_text', rest.desc);
      } else if ( rest.subType === 'Pictures') {
        // MaterialRaw.insertInner('img', 'report_result_img', rest);
      } else if ( rest.subType === 'List') {
        const ListDom = new DomClass('ul', 'report_result_list');
        for (const li of rest.list) {
          const ulDom = new DomClass('li', 'report_result_list_c', li);
          ListDom.insertInner(ulDom);
        }
        ResultRaw.insertInner(ListDom);
      }
    }
    this.domList.insertInner(ResultRaw);

    const StepRaw = new DomClass('table', 'report_steps');
  }

  private renderStep(step: ReportStepsHeader): void {
    const yieldSentense: string = this.stepsService.getYield(step.id);
  }
}
