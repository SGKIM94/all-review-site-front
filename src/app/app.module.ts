import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { fuseConfig } from 'app/fuse-config';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatRippleModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FuseModule} from '../@fuse/fuse.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';
import {FuseSharedModule} from '../@fuse/shared.module';
import {MaterialModule} from './fuse-config/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {LayoutModule} from 'app/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    QuestionComponent,
    AnswerComponent,
    RegisterComponent,
    HomeComponent,
  ],
    imports: [
        SlideshowModule,
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        SlideshowModule,

        // for datepicker
        MatMomentDateModule,

        // for directive
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatRippleModule,

        FlexLayoutModule,
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        LayoutModule,
        AppRoutingModule,
        MaterialModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
