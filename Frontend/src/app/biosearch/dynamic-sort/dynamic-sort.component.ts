import { Component, OnInit, ContentChild, TemplateRef, Input} from '@angular/core';

@Component({
  selector: 'app-dynamic-sort',
  templateUrl: './dynamic-sort.component.html',
  styleUrls: ['./dynamic-sort.component.less']
})
export class DynamicSortComponent implements OnInit {
  @Input() titles: string;
  @Input() ResultsTempates: TemplateRef<any>[];
  @ContentChild('users') usersRef: TemplateRef<any>;
  @ContentChild('reports') reportsRef: TemplateRef<any>;
  @ContentChild('dbs') dbsRef: TemplateRef<any>;
  panelStyle = {
    'background' : '#f2f2f2',
  };
  constructor() { }

  ngOnInit() {
  }

}
