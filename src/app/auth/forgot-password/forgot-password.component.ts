import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;
  forgotPasswordFormErrors: any;

  private unsubScribeAll: Subject<any>;
  constructor(
      private fuseConfigService: FuseConfigService,
      private formBuilder: FormBuilder
  ) {
    this.fuseConfigService.config = {
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

    this.forgotPasswordFormErrors = {
      email: {}
    };

    this.unsubScribeAll = new Subject();
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.forgotPasswordForm.valueChanges
        .pipe(takeUntil(this.unsubScribeAll))
        .subscribe(() => {
          this.onForgotPasswordFormValuesChanged();
        });
  }

  ngOnDestroy(): void {
    this.unsubScribeAll.next();
    this.unsubScribeAll.complete();
  }

  onForgotPasswordFormValuesChanged(): void {
    this.forgotPasswordFormErrors.map((field) => {
      const control = this.forgotPasswordForm.get(field);

      this.checkFieldError(control, field);
    });
  }

  checkFieldError(control, field): void{
    if (control && control.dirty && !control.valid) {
      this.forgotPasswordForm[field] = control.errors;
    }
  }
}
