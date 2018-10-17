import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import {AppendixService} from '../../core/appendix.service';
import {EditorReportService} from '../../core/editorReport.service';
import {State} from '../../headers/status';
import {EditorEventService} from '../../core/editor-event.service';
@Component({
  selector: 'app-button-area',
  templateUrl: './button-area.component.html',
  styleUrls: ['./button-area.component.less'],
  animations: [
    trigger('change', [
      state('inactive', style({top: '80%', opacity: 0, display: 'none'})),
      state('active',   style({opacity: 1, display: 'block'})),
      transition('inactive => active', animate('300ms ease')),
      transition('active => inactive', animate('300ms ease'))
    ]),
    trigger('change_r', [
      state('inactive', style({opacity: 1, display: 'block'})),
      state('active',   style({top: '80%', opacity: 0, display: 'none'})),
      transition('inactive => active', animate('300ms ease')),
      transition('active => inactive', animate('300ms ease'))
    ]),
    trigger('change_c', [
      state('inactive', style({background: '#C5E5E8'})),
      state('active',   style({background: '#89AFE7'})),
      transition('inactive => active', animate('300ms ease')),
      transition('active => inactive', animate('300ms ease'))
    ])
  ]
})
export class ButtonAreaComponent implements OnInit {

  flag: string;
  isVisible = false;
  varibleField: string;
  constructor(public append: AppendixService,
              public editor: EditorReportService,
              public event: EditorEventService) { }

  ngOnInit() {
    this.flag = 'active';
    let tmpString = '';

    this.event.refresh.subscribe( (value: number) => {
      if (value === State.ready) {
        console.log('value:', value);
        for (const k in this.editor.report.envs) {
          if (k) {
            tmpString += k + ' = ' + this.editor.report.envs[k] + '\n';
          }
        }
        this.varibleField = tmpString;
      }
    });
  }


  clickButton() {
    this.flag = this.flag === 'active' ? 'inactive' : 'active';
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const words = this.varibleField.split(/\s+/)
          .filter( (elem) => Object.keys(elem).length > 0 )
          .filter( (elem) => elem !== '=');

    const envs = {};
    for (let ii = 0; ii < words.length - 1; ii += 2) {
      envs[words[ii]] = words[ ii + 1 ];
    }

    console.log(envs);
    this.editor.report.envs = envs;
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
