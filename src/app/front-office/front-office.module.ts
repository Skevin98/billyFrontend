import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {frontOfficeRoutes} from './front-office.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(frontOfficeRoutes)
  ]
})
export class FrontOfficeModule { }
