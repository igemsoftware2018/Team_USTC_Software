import {Component, ViewChild, OnInit, TemplateRef, ElementRef} from '@angular/core';
import { USER } from '../../Interface/mock-user';
import { Simuser, Report } from '../../Interface/userinfo';
import { Data, Filter} from '../search-result';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {HttpService} from '../../http.service';
import {ApiResult} from '../../Interface/ApiResult';
import { DB } from '../search-result';
import { RESULT, MOCKDB } from '../mock-search';

class UsingArrays {
  'report': Report[];
  'db': DB[];
  'user': Simuser[];
}
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.less']
})
export class SearchresultComponent implements OnInit {
  @ViewChild('usersTemplate') usersRef: TemplateRef<any>;
  @ViewChild('reportsTemplate') reportsRef: TemplateRef<any>;
  @ViewChild('dbsTemplate') dbsRef: TemplateRef<any>;
  @ViewChild('blastTemplate') blastRef: TemplateRef<any>;
  searchForm: FormGroup;
  User = USER;
  arrays: UsingArrays;
  filters: Filter[];
  data: Data[];
  order_keys: string[] = [];
  order_templates:  (TemplateRef<any>|ElementRef)[] = [];
  isOkLoading = false;
  filtertype2color = {
    'time': 'blue',
    'title': 'cyan',
    'name': 'greekblue',
    'addr': 'gold',
    'author': 'purple',
  };
  filterrel2verb = {
    'eq': '=',
    'gt': '>',
    'lt': '<',
    'is': 'is',
    'like': 'like',
    'in': 'in',
  };
  suggestions = ['aaaaa', 'bbbbb', 'ccccc', 'ddddd', 'abcdefghi'];
  prefix: string[] = [];
  constructor(
    private http: HttpService,
  ) {
  }

  ngOnInit() {
    this.arrays = new UsingArrays();
    this.searchForm = new FormGroup({
      'search_info': new FormControl( null,
      ),
    });
    this.initPrefix();
    console.log(this.usersRef);
  }
  initPrefix = () => {
    for ( let ii  = 32; ii < 127; ii++) {
      const char = String.fromCharCode(ii);
      this.prefix.push(char);
    }
    console.log(this.prefix);
  }
  submitForm = () => {
    const forminfo = this.searchForm.value;
    this.http.get_search_result(forminfo.search_info, this.proccessResult);
  }
  proccessResult = (result: ApiResult) => {
    this.isOkLoading = false;
    this.clearData();
    if (result.success) {
      this.filters = result.data.filters;
      this.data = result.data.data;
      this.data = this.searchResultSort(this.data);
      this.InitData(this.data);
      console.log(this.data);
      this.isOkLoading = true;
    }
  }
  get search_info() { return this.searchForm.get('search_info'); }
  // 排序功能
  searchResultSort = (data: Data[]) => {
    const sorted = data.sort(
      function(a, b) {
        return a.rank - b.rank;
      }
    );
    console.log(sorted);
    return sorted;
  }
  // 填入
  InitData = (data: Data[]) => {
    for (const i of data) {
        this.order_keys.push(i.type);
        if (i.type === 'db') {
          this.arrays[i.type] = i.data.sort(
            function (a, b) {
              return b.count - a.count;
            });
        }
        this.arrays[i.type] = i.data;
        const template = this.type2Template(i.type);
        this.order_templates.push(template);
        console.log(this.order_templates, this.order_keys, this.arrays);
    }
  }
  clearData = () => {
    this.order_keys = [];
    this.order_templates = [];
  }
  type2Template = (type: string) => {
    switch (type) {
      case 'user': return this.usersRef;
      case 'report': return this.reportsRef;
      case 'db': return this.dbsRef;
      case 'blast': return this.blastRef;
    }
  }
}
