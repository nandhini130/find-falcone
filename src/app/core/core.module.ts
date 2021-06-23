import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page403Component } from './components/page403/page403.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Page403Component
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: []
})
export class CoreModule { }
