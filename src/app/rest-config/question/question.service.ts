import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

const endPoint = 'http://localhost:5000/questions/list';

// const token = window.localStorage.getItem('token');
const token = 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJ0a2Rybjg1NzgiLCJpYXQiOjE1NzkzNDE3MDh9.JF3oXC1msDCVAyNxzKvGDmrwCjhxhxvqkRyuxYZ3ndg';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
    })
};

@Injectable({
    providedIn: 'root'
})

export class RestService {
    constructor(private http: HttpClient) {}

    list(): Observable<any> {
        return this.http.get(endPoint, httpOptions)
            .pipe (
                catchError(this.handleError<any>('question list'))
            );
    }

    private handleError<T> (operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
            console.log(error);
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
}
