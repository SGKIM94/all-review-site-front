import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: HomeComponent },
];


@NgModule({
  imports: [
      RouterModule.forRoot(
          routes,
          {enableTracing: true}
      )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
