import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public downloadEvent: any;
  constructor() {
    this.downloadEvent = new EventEmitter();
  }
}
