import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './components/page404/page404.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: []
})
export class CoreModule { }
