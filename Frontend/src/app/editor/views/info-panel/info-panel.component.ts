import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorReportService } from '../../core/editorReport.service';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.less']
})
export class InfoPanelComponent implements OnInit {

  constructor(public editor: EditorReportService) { }

  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement') inputElement: ElementRef;

  ngOnInit() {
  }


  handleClose(removedTag: {}): void {
    this.editor.report.label = this.editor.report.label.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.editor.report.label.indexOf(this.inputValue) === -1) {
      this.editor.report.label.push(this.inputValue);
      console.log(this.editor.report.label);
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

}
