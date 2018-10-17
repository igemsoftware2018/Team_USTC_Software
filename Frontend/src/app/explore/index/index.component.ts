import { Component, OnInit, HostListener,  ViewChild } from '@angular/core';
import {UserSigninfoService } from '../../user-signinfo.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  public opacity: number;
  @ViewChild('content')
  private contentRef;
  constructor(private myInfo: UserSigninfoService) {
  }
  ngOnInit() {
    const victor = Victor('container', 'output');
    const theme = [
      ['#002c4a', '#005584'],
      ['#35ac03', '#3f4303'],
      ['#101C48', '#54ACB4'],
      ['#18bbff', '#00486b'],
      ['#051622', '#2b8896']
    ];
   function settheme() {
        victor(theme[4]).set();
   }
   settheme();
  }
  @HostListener('window: scroll', [])
  changOpacity() {
    this.opacity = Math.abs(1 - window.pageYOffset / 260);
  }
}
