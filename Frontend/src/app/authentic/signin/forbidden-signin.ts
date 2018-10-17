import {AbstractControl, ValidatorFn} from '@angular/forms';

const at: RegExp = /^.*[@]+.*$/
const email: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ;
const username: RegExp = /^[a-zA-Z0-9_\- ]*$/ ;

export function forbiddenUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden: Boolean;
    if (at.test(control.value)) {
      forbidden = false;
    } else {
      if (username.test(control.value)) {
        forbidden = false;
      } else {
        forbidden = true;
      }
    }
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
export function forbiddenEmailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden: Boolean;
    if (!at.test(control.value)) {
      forbidden = false;
    } else {
      if (email.test(control.value)) {
        forbidden = false;
      } else {
        forbidden = true;
      }
    }
    return forbidden ? {'forbiddenEmail': {value: control.value}} : null;
  };
}
