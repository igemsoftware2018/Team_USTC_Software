import {AbstractControl, ValidatorFn} from '@angular/forms';

const email: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ;
export function forbiddenEmailValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden: Boolean;
    if (email.test(control.value)) {
      forbidden = false;
    } else {
      forbidden = true;
    }
    return forbidden ? {'forbiddenEmail': {value: control.value}} : null;
  };
}
