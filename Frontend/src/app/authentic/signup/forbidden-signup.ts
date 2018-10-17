import {AbstractControl, ValidatorFn} from '@angular/forms';

const email: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ;
const username: RegExp = /^[a-zA-Z0-9_\- ]*$/ ;
const alphabetical: RegExp = /^.*[a-zA-Z]+.*$/;
const numeric: RegExp = /^.*[0-9]+.*$/;
// const special: RegExp = /^.*[!@#\$%\^&\*\-_ ~]+.*$/;

export function forbiddenUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden = false;
    if (!username.test(control.value)) {
      forbidden = true;
    }
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
export function forbiddenEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden: Boolean;
    if (!email.test(control.value)) {
      forbidden = true;
    }
    return forbidden ? {'forbiddenEmail': {value: control.value}} : null;
  };
}
export function forbiddenAlphaValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden: Boolean;
    if (!alphabetical.test(control.value)) {
      forbidden = true;
    }
    return forbidden ? {'forbiddenAlpha': {value: control.value}} : null;
  };
}
export function forbiddenNumericValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden: Boolean;
    if (!numeric.test(control.value)) {
      forbidden = true;
    }
    return forbidden ? {'forbiddenNumeric': {value: control.value}} : null;
  };
}
