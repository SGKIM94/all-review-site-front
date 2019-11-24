import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];


@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(
          routes,
          {enableTracing: true}
      )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
