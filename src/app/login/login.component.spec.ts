import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginComponent: LoginComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginComponent = TestBed.get(LoginComponent);

    fixture.detectChanges();
  });

  it('email 값이 올바르지 않을 때 error 가 loginFormErrors 에 저장되는지', () => {
    // given
    const control = {
      dirty: true,
      valid: false,
      errors: 'error',
    };

    const field = 'field';

    // when
    loginComponent.checkFieldError(control, field);

    // then
    expect(loginComponent.checkFieldError).toHaveBeenCalled();
    expect(loginComponent.loginFormErrors[field]).toBeTruthy('error');
  });
});
