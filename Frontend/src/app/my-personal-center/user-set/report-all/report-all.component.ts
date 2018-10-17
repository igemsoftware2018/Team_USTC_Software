import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-all',
  templateUrl: './report-all.component.html',
  styleUrls: ['./report-all.component.less']
})
export class ReportAllComponent implements OnInit {
  myreports=[
{title:'Plasmid Extraction',
    isDraft:true,
  Date:'2018/8/16 18:17:16'
},
    {
      title:'Plasmid Extraction',
      isDraft:false,
      Date:'2018/8/16 18:17:16',
      readNum:2000,
      commentNum:33
    }

  ]
  constructor() { }

  ngOnInit() {
  }

}
