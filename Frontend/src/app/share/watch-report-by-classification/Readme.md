### watch-report-by-label组建使用方法
使用该组建除了需要配置路由外，还要修改一下该组建ts中的代码，例如
profile/profile-routing.module.ts中代码：
```
    {
      path: 'watch/:name',
      component: WatchReportLabelComponent
    },
    {
      path: 'archive/:data'
      component: WatchReportArchiveComponent,
    }
```

watch-report-by-label中的代码
```javascript
  this.route.paramMap.subscribe((params: ParamMap) => {
          if ( params.get('name') != null) {
            this.label = params.get('name');
            this.big_label = 'Report';
          } else {
            this.label = params.get('data');
            this.big_label = 'Archive';
          }
  }
```

首先在自己的路由上设置传递的参数比如:name、:data或者是你定义的新参数，然后在watch-report-by-label中仿照上述形式添加代码

例如新添加传递参数:id
那么需要修改为:
```
  this.route.paramMap.subscribe((params: ParamMap) => {
            if ( params.get('name') != null) {
              this.label = params.get('name');
              this.big_label = 'Report';
            } else if( params.get('data') != null){
              this.label = params.get('data');
              this.big_label = 'Archive';
            } else{
              //加上你的逻辑      
            }
  }
```
