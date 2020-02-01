import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class RestService {
  headers: HttpHeaders;
  contentType: string;
  token: string;

  constructor() {
    this.contentType = 'application/json';
    this.token = '';
  }

  setTokenInHttpHeader(token): void {
    this.token = token;
  }

  getHttpHeader(): Object {
    return {
      headers: new HttpHeaders({
        'Content-Type': this.contentType,
        'Authorization': this.token,
      })
    };
  }
}
