import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { SignInComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    VMessageModule,
    RouterModule
  ]
})
export class HomeModule {

}
