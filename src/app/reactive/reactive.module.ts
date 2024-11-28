import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';


@NgModule({
  declarations: [
    BasicPageComponent,
    SwitchesPageComponent,
    DynamicPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveRoutingModule
  ]
})
export class ReactiveModule { }
