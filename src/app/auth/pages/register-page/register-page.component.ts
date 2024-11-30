import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validator.service';
import { EmailValidatorService } from '../../../shared/validators/emaio-validator.service';
//import * as customValidator from '../../../shared/validators/validators.functions';

@Component({
  selector: 'app-register-page',
  standalone: false,

  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  //private fb: FormBuilder =  new FormBuilder();
  public myForm!: FormGroup;

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private emailValidatorService:EmailValidatorService ){

    this.myForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
      //email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [emailValidatorService.validate]],
      username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        validatorsService.isFieldOneEqualFieldTwo('password','password2')
      ]
    });
  }


  onSave(): void{
      this.myForm.markAllAsTouched();
  }

  isValidField(field: string): boolean | null{
    console.log(`campo: ${field} valor: ${this.validatorsService.isValidField(this.myForm,field)}`);
     return this.validatorsService.isValidField(this.myForm,field);
  }


}
