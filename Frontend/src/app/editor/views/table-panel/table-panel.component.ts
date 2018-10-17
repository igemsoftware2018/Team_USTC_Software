import { Component, OnInit, Input } from '@angular/core';
import { ReportResultHeader } from '../../headers/article';

@Component({
  selector: 'app-table-panel',
  templateUrl: './table-panel.component.html',
  styleUrls: ['./table-panel.component.less']
})
export class TablePanelComponent implements OnInit {

  @Input() ret: ReportResultHeader;
  rowNumber: number;
  colNumber: number;

  fieldEditable: number;
  rowEditable: number;
  fieldTemp: string;
  rowTemp: any[];

  constructor() { }

  ngOnInit() {
    this.fieldEditable = -1;
    this.rowEditable = -1;

    if (this.ret.table.length <= 0 ) {
      this.rowNumber = 0;
      this.ret.table = [[]];
      this.addRow();
    } else {
      this.rowNumber = this.ret.table.length - 1;
    }
    try {
      this.colNumber = this.ret.table[0].length;
    } catch {
      this.colNumber = 0;
      this.ret.table.push([]);
    }
    if (this.colNumber === 0) {
      this.addCol('Default');
    }
  }

  // 添加部分
  public addRow() {
    this.rowNumber += 1;
    const _tmp_row = [];
    for (let ii = 0;  ii < this.colNumber; ii++) {
      _tmp_row.push('');
    }
    this.ret.table = [...this.ret.table, _tmp_row];
  }

  public addCol(fieldName: string) {
    this.colNumber += 1;
    for (const row of this.ret.table) {
      row.push('');
    }
    this.ret.table[0].splice(-1, 1, fieldName);
  }

  // 修改属性部分
  public changeFieldState(fieldIdx: number) {
    this.fieldTemp = this.ret.table[0][fieldIdx];
    this.fieldEditable = fieldIdx;
  }

  public changeField() {
    this.ret.table[0].splice(this.fieldEditable, 1, this.fieldTemp);
    console.log(this.ret.table);
    this.fieldEditable = -1;
    this.fieldTemp = '';
  }

  // 删除列部分
  public deleteRow(idx: number) {
    this.rowNumber -= 1;
    const tmp_table = [];
    for (let ii = 0;  ii < this.ret.table.length; ii++) {
      if (ii !== idx) {
        tmp_table.push(this.ret.table[ii]);
      }
    }
    this.ret.table = tmp_table;
  }

  // 修改列部分
  public changeRowState(idx: number) {
    this.rowTemp = new Array(this.colNumber);

    for (let ii = 0;  ii < this.colNumber; ii++) {
      this.rowTemp[ii] = this.ret.table[idx][ii];
    }
    this.rowEditable = idx;
  }

  public changeRow(idx: number) {

    const tmp_table = [];
    for (let ii = 0;  ii < this.ret.table.length; ii++) {
      if (ii !== idx) {
        tmp_table.push(this.ret.table[ii]);
      } else {
        tmp_table.push(this.rowTemp);
      }
    }
    this.ret.table = tmp_table;
    this.rowEditable = -1;
    this.rowTemp = [];
  }
}
