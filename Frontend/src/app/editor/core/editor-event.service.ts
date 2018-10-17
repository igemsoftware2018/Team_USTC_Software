import { Injectable, EventEmitter, } from '@angular/core';

@Injectable()
export class EditorEventService {
  public eventEmit: any;
  public refresh: any;

  constructor() {
      this.eventEmit = new EventEmitter();
      this.refresh = new EventEmitter();
  }

}
