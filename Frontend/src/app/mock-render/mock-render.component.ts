import { Component, OnInit } from '@angular/core';
import { ReportHeader } from '../editor/headers/article';
import { Report } from '../Interface/Report';
@Component({
  selector: 'app-mock-render',
  templateUrl: './mock-render.component.html',
  styleUrls: ['./mock-render.component.less']
})
export class MockRenderComponent implements OnInit {

  mockReport: ReportHeader = JSON.parse(
    `{
      "title":"Transformation of MtrCAB and CysDes",
      "introduction":"Transformation of plasmid pSB1C3 containing MtrACB and CysDes to top10 E.coil strain.","label":["22"],
      "mdate":"",
      "ndate":"",
      "result":[
          {"desc":"","subType":"Pictures","list":[],"pic":[{"name":"test","url":
          "http://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191-mobileskin-1.jpg"}],"remark":"this is a remark"},
          {"desc":"","subType":"Text","list":[],"pic":[{"name":"test","url":
          "http://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191-mobileskin-1.jpg"}],"remark":"this is a remark"},
          {"desc":"","subType":"Table","table": [
            [
            "col1",
            "col2"
            ],
            [
            "ceil1-1",
            "ceil1-2"
            ],
            [
            "ceil2-1",
            "ceil2-2"
            ]
            ],"pic":[{"name":"test","url":
          "http://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191-mobileskin-1.jpg"}],"remark":"this is a remark"},
          {"desc":"result_2","subType":"List","list":[{"str":"this is list1"},{"str":"this is list2"}],
          "pic":[{"name":"test","url":"http://image.9game.cn/2018/6/4/20525628.jpg"}], "remark":"this is another remark"}],
      "subroutines":[
        {"id":"-1","desc":"","name":"Add","idx":0,"steps":[
          {"name":"Add","data":{"Volume":"111111","Name":"2","container":"3"},"id":"21","remark":"444"}]
        },
        {"id":"1","name":"Incubate","idx":0,"steps":[
            {"name":"Add","data":{"Name":"template","Volume":"0","container":""},"id":"21","remark":""},
            {"name":"Add","data":{"Name":"buffer","Volume":"0","container":""},"id":"21","remark":""},
            {"name":"Add","data":{"Name":"enzyme","Volume":"0","container":""},"id":"21","remark":""},
            {"name":"Mix","data":{"Type":"摇晃"},"id":"21","remark":""},
            {"name":"Incubate","data":{"Num":"37"},"id":"21","remark":""}
          ]
        }],
      "id":0,
      "author":["Yitian Zhou"]}`
    );

  MockReport_2: ReportHeader = JSON.parse(`{
    "title": "This is Title",
    "introduction": "This is abstract aka information",
    "label": [
    "label1",
    "label2"
    ],
    "mdate": "",
    "ndate": "",
    "result": [
    {
    "desc": "This is Text",
    "subType": "Text",
    "list": [],
    "pic": []
    },
    {
    "desc": "",
    "subType": "Pictures",
    "list": [],
    "pic": []
    },
    {
    "desc": "",
    "subType": "Table",
    "list": [],
    "pic": [],
    "table": [
    [
    "col1",
    "col2"
    ],
    [
    "ceil1-1",
    "ceil1-2"
    ],
    [
    "ceil2-1",
    "ceil2-2"
    ]
    ]
    },
    {
    "desc": "",
    "subType": "List",
    "list": [
    {
    "str": "This is list 1 "
    },
    {
    "str": "This is list 2"
    }
    ],
    "pic": []
    }
    ],
    "subroutines": [
    {
    "id": "-1",
    "desc": "",
    "name": "Centifuge",
    "idx": 0,
    "steps": [
    {
    "name": "Centifuge",
    "data": {
    "Time": "1"
    },
    "id": "1"
    }
    ]
    }
    ],
    "envs": {
    "var": "1",
    "aa": "2"
    },
    "id": 0,
    "author": []
    }`);

  constructor() { }

  ngOnInit() {
  }

}
