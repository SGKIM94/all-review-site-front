import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const endPoint = 'http://localhost:5000/api/users/login/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    })
};

@Injectable({
    providedIn: 'root'
})
export class RestService {
    constructor(private http: HttpClient) {}

    private extractData(response: Response): any {
        return response || {};
    }

    login(user): Observable<any> {
        return this.http.post(endPoint, JSON.stringify(user), httpOptions)
            .pipe (
            // tap((e) => console.log(`login w/ id=${e.email}`)),
            catchError(this.handleError<any>('login'))
        );
    }

    getUserData(): Observable<any> {
        return this.http.get(endPoint + '/users/login', httpOptions).pipe (
            map(this.extractData));
    }

    private handleError<T> (operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
            console.log(error);
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }
}
