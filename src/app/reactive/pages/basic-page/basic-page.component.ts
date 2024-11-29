import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators} from '@angular/forms';


const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
}


@Component({
  selector: 'app-basic-page',
  standalone: false,
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent implements OnInit {

    //public myform: FormGroup = new FormGroup({
    //  name: new FormControl(''),
    //  price: new FormControl(0),
    //  inStorage: new FormControl(0),
    //});



    private fb: FormBuilder =  new FormBuilder();

    constructor(){}

    ngOnInit(): void {
      //this.myform.reset(rtx5090);
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
            return 'Este campo es requerido'

          case 'minlength':
            return `Minimo ${ errors['minlength'].requiredLength } caracteres`
        }
      }

      return null;
    }

    public myform = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3)]],  // 'name' como string
      price: [0, [Validators.required, Validators.min(0)]],  // 'price' como número con validación
      inStorage: [0,[Validators.required, Validators.min(0)]],  // 'inStorage' como número con validación
    });

    onSave(): void{

      if(this.myform.invalid) {
        this.myform.markAllAsTouched();
        return
      };
      console.log(this.myform.value);

      this.myform.reset();
    }

  }
