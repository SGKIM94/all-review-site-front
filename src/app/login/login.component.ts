import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {UserRestService} from '../rest-config/user/user.service';
import {fuseAnimations} from '@fuse/animations/index';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import * as ResponseCode from '../rest-config/code';
import {RestService} from '../rest-config/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : fuseAnimations
})

export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginFormErrors: any;
  menuClass = ['collapse', 'collapse-active'];
  private unsubscribeAll: Subject<any>;
  private readonly notifier: NotifierService;
  fragment: Observable<string>;

  constructor(
      private fuseConfigService: FuseConfigService,
      private formBuilder: FormBuilder,
      private userRest: UserRestService,
      private router: Router,
      private notifierService: NotifierService,
      private rest: RestService) {

    this.openMenu();
    this.setFuseConfig();
    this.initializeLoginFormErrors();
    this.unsubscribeAll = new Subject();
    this.notifier = notifierService;
  }

  private initializeLoginFormErrors(): void {
    this.loginFormErrors = {
      email: {},
      password: {}
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

  openMenu(): void {
    this.addCollapseActiveClassWithout();
  }

  onSubmit(): void {
    const loginDto = this.loginForm.getRawValue();

    this.userRest.login(loginDto).subscribe(response => {
      if (ResponseCode.isSuccessResponse(response.code)) {
          this.showErrorNotice();
          return;
      }

      this.rest.setTokenInHttpHeader(response.information.token);

      this.routeToHome();

    }, error => {
        this.showErrorNotice();
    });
  }

  private routeToHome(): void {
    this.router
        .navigate(['/home'], this.getNavigationExtrasToHome())
        .then();
  }

  private getNavigationExtrasToHome(): object {
    return {
      fragment: 'login'
    };
  }

  private showErrorNotice(): void {
    this.notifier.notify('error', '아이디나 비밀번호를 확인해주시기 바랍니다.');
  }

  private addCollapseActiveClassWithout(): void {
    if (this.haveActiveClass()) {
      this.menuClass.splice(1, 1);
      return;
    }

    this.menuClass[1] = 'collapse-active';
  }

  private haveActiveClass(): boolean {
    return this.menuClass.includes('collapse-active');
  }

  ngOnInit(): void {
    this.ifLoginFragmentShowNotification();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges
        .pipe(
            takeUntil(this.unsubscribeAll)
        )
        .subscribe(() => {
          this.onLoginFormValuesChanged();
        });
  }

  private ifLoginFragmentShowNotification(): void {
    this.router
        .routerState.root.fragment
        .subscribe(frag => {
          if (this.isLoginFragment(frag)) {
            this.showSuccessNotice('로그인에 성공하였습니다.');
          }
        });
  }

  private showSuccessNotice(message): void {
    this.notifier.notify('error', message);
  }

  private isLoginFragment(frag): boolean {
    return frag === 'login';
  }

  onLoginFormValuesChanged(): void {
    Object.entries(this.loginFormErrors).forEach(([key, value]) => {
      const control = this.loginForm.get(key);
      this.checkFieldError(control, key);
    });
  }

  checkFieldError(control, field): void {
    if (control && control.dirty && !control.valid) {
      this.loginFormErrors[field] = control.errors;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
