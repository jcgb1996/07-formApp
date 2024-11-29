import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: false,

  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  private fb: FormBuilder =  new FormBuilder();

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

  onSubmit(): void {

    if(this.myform.invalid) {
      this.myform.markAllAsTouched();
      return
    };
    console.log(this.myform.value);

    this.myform.reset();
  }

}
