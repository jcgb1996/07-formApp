import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider } from '../../../shared/validators/validators.functions';

@Component({
  selector: 'app-register-page',
  standalone: false,

  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb: FormBuilder =  new FormBuilder();

  public myform = this.fb.group({
    name: ['',[Validators.required]],
    email: ['', Validators.required],
    uername: ['', [Validators.required, cantBeStrider]],
    password: ['', Validators.required, Validators.minLength(6)],
    password2: ['', Validators.required],
  });


  onSave(): void{
      this.myform.markAllAsTouched();
  }

  isValidField(field: string): void{

  }

}
