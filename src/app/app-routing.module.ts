
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { FindFalconeComponent } from './find-falcone/find-falcone.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { Page403Component } from './core/components/page403/page403.component';

const routes: Routes = [
  { path: '', redirectTo: '/find-falcone', pathMatch: 'full'},
  { path: 'find-falcone', component: FindFalconeComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: '403', component: Page403Component },
  { path: '**', redirectTo:'', pathMatch: 'full' }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)], // extraoOptions
  exports: [RouterModule]
})
export class AppRoutingModule { }
