import { Component, ViewChild, ElementRef, OnInit, Input, OnChanges, OnDestroy} from '@angular/core';
import { ReportHeader, ReportStepsHeader } from '../headers/article';
import { EventService } from './event.service';
import {RenderServiceService} from './render-service.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import * as $ from 'jquery';

@Component({
  selector: 'app-report-render',
  templateUrl: './report-render.component.html',
  styleUrls: ['./report-render.component.less']
})
export class ReportRenderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() reportId: number;

  public extraContent: {};

  constructor(public renderService: RenderServiceService, public event: EventService ) { }

  ngOnInit() {
    this.renderService.getReportFromBackend(this.reportId);
    this.event.downloadEvent.subscribe( (elem) => {
      this.downloadPDF();
    });
  }

  ngOnChanges() {
  }

  ngOnDestroy () {
    // this.renderService.renderReport = null;
    this.renderService.state = 0;
  }

  public downloadPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const content = $('#content');

    if (this.renderService.state !== 1) {
      return;
    }

    html2canvas( content.get(0), {
      useCORS: true,
      allowTaint: false,
      // taintTest: true,
    } ).then( canvas => {
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      const pageWidth = 595.28;
      const pageHeight =  pageWidth / contentWidth * contentHeight;
      // 页高
      let positon = 0;
      let leftHeight = pageHeight;
      // 偏移量

      const pageData = canvas.toDataURL('image/png', 1.0);

      if (leftHeight < 841.89) {
        doc.addImage(pageData, 'PNG', 0, 0, pageWidth, pageHeight);
      } else {
        while (leftHeight > 0 ) {
          doc.addImage(pageData, 'PNG', 0, positon, pageWidth, pageHeight);
          leftHeight -= 841.89;
          positon -= 841.89;
          if (leftHeight > 0) {
            doc.addPage();
          }
        }
      }
      doc.save('test.pdf');
    });
  }

  public picChangeToBase(picUrl: string) {
    const image = new Image();
    image.src = picUrl;
    image.crossOrigin = 'anonymous';

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);
    return dataURL;
  }
}
