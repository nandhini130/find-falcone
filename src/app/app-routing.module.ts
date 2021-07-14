
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { FindFalconeComponent } from './find-falcone/find-falcone.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { Page404Component } from './core/components/page404/page404.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './core/guards/authentication.guard'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'find-falcone', component: FindFalconeComponent },
  { path: 'search-result', component: SearchResultComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: Page404Component }
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
