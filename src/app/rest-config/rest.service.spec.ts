import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';

describe('RestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  const token = 'token';
  const service: RestService = TestBed.get(RestService);

  it('Header 에 token 을 저장하는지', () => {
    // given

    // when
    service.setTokenInHttpHeader(token);

    // then
    const authorization = service.headers.get('Authorization');
    expect(authorization).toBeTruthy('token');
  });

  it('token 이 저장된 header 를 리턴하는지', () => {
    // given
    service.setTokenInHttpHeader('token');

    // when
    const headers = service.getHttpHeader();

    // then
    const authorization = headers.get('Authorization');
    expect(authorization).toBeTruthy('token');
  })
});
