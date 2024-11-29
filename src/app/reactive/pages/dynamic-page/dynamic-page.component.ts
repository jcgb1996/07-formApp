import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: false,

  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  private fb: FormBuilder =  new FormBuilder();
  public newFavorite: FormControl = new FormControl('',[Validators.required]);

  public myform = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],  // 'name' como string
    favoriteGames: this.fb.array([
        ['metal gear',Validators.required],
        ['death stranding',Validators.required]
      ]),
    //favorite: [0,[Validators.required, Validators.min(0)]],  // 'inStorage' como número con validación
  });

  get favoriteGames(){
     return this.myform.get('favoriteGames') as FormArray;
  }

  onDeleteFavorite(index: number): void{
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    debugger;
    if(this.myform.invalid) {
      this.myform.markAllAsTouched();
      return
    };

    (this.myform.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    console.log(this.myform.value);

    this.myform.reset();
  }

  isValidFieldInArray(formArry: FormArray, index: number): boolean | null  {
    return formArry.controls[index].errors && formArry.controls[index].touched;
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

  onAddToFavorite(): void {
    if(this.newFavorite.invalid) return;

    this.favoriteGames.push( this.fb.control( this.newFavorite.value, Validators.required ) );
    this.newFavorite.reset();
  }

}
