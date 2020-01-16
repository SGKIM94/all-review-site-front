import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {QuestionComponent} from './question/question.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'question', component: QuestionComponent },
    { path: '**', component: HomeComponent },
];


@NgModule({
  imports: [
      RouterModule.forRoot(
          routes
      )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
