import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RestService} from '../rest-config/login/login.service';
import {fuseAnimations} from '@fuse/animations/index';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {NavigationExtras, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';


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
  constructor(
      private fuseConfigService: FuseConfigService,
      private formBuilder: FormBuilder,
      private rest: RestService,
      private router: Router,
      private notifierService: NotifierService) {

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

  onSubmit():  void {
    const loginDto = this.loginForm.getRawValue();
    const token = this.routeToLogin(loginDto);

    const loginToken: NavigationExtras = {
      queryParams: {
        'token': token,
        'fragment': 'login'
      }
    };

    this.router.navigate(['/home'], loginToken).then();
  }

  private routeToLogin(loginDto): string {
    let token = '';
    this.rest.login(loginDto).subscribe(response => {
      console.log(JSON.stringify(response, null, 4));
      token = response.token;

    }, error => {
      this.notifier.notify('error', '아이디나 비밀번호를 확인해주시기 바랍니다.');
      console.error(error);
    });

    return token;
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
