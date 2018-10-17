import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
const alphabetical: RegExp = /^.*[a-zA-Z]+.*$/;
const numeric: RegExp = /^.*[0-9]+.*$/;
export const userAccountValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const newpassword = control.get('newpassword');
  const confirmpassword = control.get('confirmpassword');
  console.log(confirmpassword.value);
  console.log(newpassword.value);
  return confirmpassword.value === newpassword.value ? null : { 'forbiddenUnSame': true };
};
export function forbiddenAlphaValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden = false;
    if (!alphabetical.test(control.value)) {
      console.log('forbiddenAlpha wrong');
      forbidden = true;
    }
    return forbidden ? {'forbiddenAlpha': true} : null;
  };
}
export function forbiddenNumericValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden = false;
    if (!numeric.test(control.value)) {
      console.log('forbiddenNumeric wrong');
      forbidden = true;
    }
    return forbidden ? {'forbiddenNumeric': true} : null;
  };
}
