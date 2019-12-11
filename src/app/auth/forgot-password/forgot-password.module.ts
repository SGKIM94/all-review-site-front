import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ForgotPasswordComponent} from './forgot-password.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FuseSharedModule} from '../../../@fuse/shared.module';


const routes = [
    {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
    declarations: [
        ForgotPasswordComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class ForgotPasswordModule{}
