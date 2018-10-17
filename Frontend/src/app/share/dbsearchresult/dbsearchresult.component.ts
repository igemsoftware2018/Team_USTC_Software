import { Component, OnInit, Input } from '@angular/core';
import { DB } from '../../biosearch/search-result';

@Component({
  selector: 'app-dbsearchresult',
  templateUrl: './dbsearchresult.component.html',
  styleUrls: ['./dbsearchresult.component.less']
})
export class DBsearchresultComponent implements OnInit {
  @Input() db: DB;
  img_src: string;
  constructor() {}

  ngOnInit() {
    this.img_src = '../../../assets/img/searchresult/icon/' + this.db.title.replace(/\s/g, '_') + '.png';
  }

}
