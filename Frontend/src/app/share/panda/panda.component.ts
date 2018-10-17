import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panda',
  templateUrl: './panda.component.html',
  styleUrls: ['./panda.component.less'],
})
export class PandaComponent implements OnInit {
  @Input() shake: boolean;
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
