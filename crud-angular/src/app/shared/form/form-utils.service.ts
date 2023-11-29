import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }


  validadeAllFormFields (formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach( field => {
      const control = formGroup.get(field) as UntypedFormControl;

      if (control instanceof UntypedFormGroup) {
        control.markAsTouched({ onlySelf: true })
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true })
        this.validadeAllFormFields(control);
      }

    });
  }


  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFormField(field);

  }

  getErrorMessageFormField(field: UntypedFormControl) {
    if(field?. hasError('required')) {
      return 'Campo Obrigatório'
    }

    if(field?. hasError('minlength')) {
      const requiresLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser ${requiresLength} caracteres.`;
    }
    return 'Campo Inválido.'
  }


  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFormField(field);
  }


  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }


}
