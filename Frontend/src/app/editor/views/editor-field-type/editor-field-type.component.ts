import { Component, OnInit, Input, DoCheck } from '@angular/core';
import {EditorReportService} from '../../core/editorReport.service';

@Component({
  selector: 'app-editor-field-type',
  templateUrl: './editor-field-type.component.html',
  styleUrls: ['./editor-field-type.component.less']
})
export class EditorFieldTypeComponent implements OnInit, DoCheck {

  @Input() fld: any;
  @Input() size: string;
  options: string[];
  envField?: string;
  backField?: string;
  changed: Boolean = false;

  constructor(public editor: EditorReportService) { }

  ngOnInit() {
    this.backField = this.fld.value;
    for (const key of this.fld.attr) {
      const keystring: string = key;
      this.changeEnv();
      if (keystring.length >= 5 && keystring.substr(0, 5) === '@opt=') {
        const opts: string = keystring.substr(5);
        this.options = opts.split('/').filter((elem) => elem !== '');
        if (typeof this.fld.value !== 'undefined' && this.fld.value !== '' && !this.isInArray(this.fld.value, this.options)) {
          this.options.push(this.fld.value);
        }
      }
    }
  }

  ngDoCheck() {
    this.changeEnv();
  }

  changeEnv() {
    if ( typeof this.fld.value === 'string' && this.fld.value.substr(0, 1) === '@') {
      this.backField = this.fld.value;
    }
    if ( typeof this.backField === 'string' && this.backField.substr(0, 1) === '@') {
      this.envField = this.backField.substr(1);

      try {
        this.fld.value = this.editor.report.envs[this.envField];
      } catch (err) {
        // 不知道在这里写什么
        this.fld.value = this.backField;
      }
    }
  }

  isInArray(str: string, list: string[]) {
    let flag = false;
    for (const kk of list) {
      if (kk === 'str') {
        flag = true;
      }
    }
    return flag;
  }

  changeInToInput() {
    if (this.fld.value === 'input') {
      this.changed = true;
      this.fld.value = '';
    }
  }

}
