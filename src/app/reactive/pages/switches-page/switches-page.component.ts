import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person {
  gender: string,
  wanNotificatin: boolean,
}

@Component({
  selector: 'app-switches-page',
  standalone: false,

  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent implements OnInit {

  ngOnInit(): void {
    this.myform.reset(this.person);
  }

  private fb: FormBuilder =  new FormBuilder();

  public myform = this.fb.group({
    gender: ['M',[Validators.required]],  // 'name' como string
    wanNotificatin: [true, Validators.required],
    termAndConditions: [false, Validators.requiredTrue],
    //favorite: [0,[Validators.required, Validators.min(0)]],  // 'inStorage' como número con validación
  });

  public  person : Person  = {
    gender:  'F',
    wanNotificatin: false,
  }

  isValidField(field: keyof typeof this.myform.controls): boolean | null {
    return this.myform.controls[field].errors && this.myform.controls[field].touched;
  }

  getFieldError(field:  keyof typeof this.myform.controls): string | null{
    if(!this.myform.controls[field] ) return null;

    const errors =  this.myform.controls[field].errors || {};

    for (const element of Object.keys(errors)) {
      switch(element){
        case 'required':
          return 'Debe de aceptar las condiciones de uso'

        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } caracteres`
      }
    }

    return null;
  }


  onSave(): void{
    if(this.myform.invalid) {
      this.myform.markAllAsTouched();
      return
    };
    const { termAndConditions, ...newPerson  } = this.myform.value ;
    this.person = (newPerson as Person) ;

    console.log(this.person);
  }
}
