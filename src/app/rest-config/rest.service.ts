import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class RestService {
  headers: HttpHeaders;

  constructor() { }

  setTokenInHttpHeader(token): void {
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': token
    });
  }

  getHttpHeader(): HttpHeaders {
    return this.headers;
  }
}
