import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forbiddenEmailValidator } from './forbidden-email';

@Component({
  selector: 'app-start-reset',
  templateUrl: './start-reset.component.html',
  styleUrls: ['./start-reset.component.less']
})
export class StartResetComponent implements OnInit {
  validateForm: FormGroup;
  shake = false;
  constructor() { }

  ngOnInit() {
    this.validateForm = new FormGroup({
      'email': new FormControl(null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(20),
          , forbiddenEmailValidator()]),
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
  }
  get email() { return this.validateForm.get('email'); }
  startShake() {
    this.shake = true;
  }
  stopShake() {
    this.shake = false;
  }
}
