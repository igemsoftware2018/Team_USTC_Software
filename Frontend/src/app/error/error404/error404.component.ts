import { Component, OnInit } from '@angular/core';
import { ShareModule } from '../../share/share.module';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.less']
})
export class Error404Component implements OnInit {

  shake = false;
  constructor() { }

  ngOnInit() {
    this.shake = false;
  }
  startShake(): void {
    this.shake = true;
  }
  stopShake(): void {
    this.shake = false;
  }

}
