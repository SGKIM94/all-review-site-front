import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '../../@fuse/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : fuseAnimations
})

export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginFormErrors: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder) {

    this.openMenu();

    this.setFuseConfig();


    this.loginFormErrors = {
      email: {},
      password: {}
    };

    this._unsubscribeAll = new Subject();
  }

  private setFuseConfig = () => {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        }
      }
    };
  }

  openMenu = () => {
    this.addCollapseActiveClassWithout();
  }

  private addCollapseActiveClassWithout = () => {
    const collapseElement = document.getElementById('collapse');
    if (collapseElement.classList.contains('collapse-active')) {
      collapseElement.classList.remove('collapse-active');
    }

    collapseElement.classList.add('collapse-active');
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
          this.onLoginFormValuesChanged();
        });
  }


  onLoginFormValuesChanged = () => {
    this.loginFormErrors.map((field) => {
      const control = this.loginFormErrors.get(field);

      this.checkFieldError(control, field);
    });
  }

  private checkFieldError = (control, field) => {
    if (control && control.dirty && !control.valid) {
      this.loginFormErrors[field] = control.errors;
    }
  }


  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
