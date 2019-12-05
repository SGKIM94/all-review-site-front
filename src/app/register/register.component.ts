import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '../../@fuse/animations';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-register-new',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations : fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  registerFormErrors: any;
  menuClass = ['collapse', 'collapse-active'];

  private unsubscribeAll: Subject<any>;

  constructor(
      private fuseConfigService: FuseConfigService,
      private formBuilder: FormBuilder) {

    this.openMenu();
    this.setFuseConfig();
    this.initializeRegisterErrors();

  }

  private initializeRegisterErrors(): void {
    this.registerFormErrors = {
      name: {},
      phone: {},
      mobile: {},
      password: {},
      passwordConfirm: {},
    };
  }

  private setFuseConfig(): void {
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
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\+?\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, confirmPassword]]
    });

    this.registerForm.valueChanges
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe(() => {
          this.onRegisterFormValuesChanged();
        });
  }

  onRegisterFormValuesChanged(): void {
    this.registerFormErrors.map((field) => {
      const control = this.registerFormErrors.get(field);

      this.checkFieldError(control, field);
    });
  }

  private checkFieldError(control, field): void {
    if (control && control.dirty && !control.valid) {
      this.registerFormErrors[field] = control.errors;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  openMenu(): void {
    this.addCollapseActiveClassWithout();
  }

  onSubmit(): void {
  }

  private addCollapseActiveClassWithout(): void {
    if (this.haveActiveClass()) {
      this.menuClass.splice(1, 1);
    }

    this.menuClass[1] = 'collapse-active';
  }

  private haveActiveClass(): boolean {
    return this.menuClass.includes('collapse-active');
  }
}

function confirmPassword(control: AbstractControl): any {
  if (isControlEmpty(control)) {
    return;
  }

  const parentControl = control.parent;
  const password = parentControl.get('password');
  const passwordConfirm = parentControl.get('passwordConfirm');

  if (isPasswordAndPasswordConfirmEmpty(password, passwordConfirm)) {
    return;
  }

  if (isMatchPasswordWithPasswordConfirm(password, passwordConfirm)) {
    return {
      passwordNotMatch: true
    };
  }

  return {
    passwordNotMatch: false
  };
}

function isControlEmpty(control: AbstractControl): boolean {
  return !control.parent || !control;
}

function isPasswordAndPasswordConfirmEmpty(password, passwordConfirm): boolean {
  return !passwordConfirm || !password || passwordConfirm.value === '';
}

function isMatchPasswordWithPasswordConfirm(password, passwordConfirm): boolean {
  return password.value !== passwordConfirm.value;
}
