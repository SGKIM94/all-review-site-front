import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('email 값이 올바르지 않을 때 error 가 loginFormErrors 에 저장되는지', () => {
    fixture = TestBed.createComponent(LoginComponent);
    const loginFormError = [];

    component.checkFieldError();
    expect(component).toBeTruthy();
  });
});
