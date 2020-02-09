import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {RestService} from '../rest.service';

const endPoint = 'http://localhost:5000/api/users/';

export class User {
    userId: string;
    password: string;
    name: string;
    email: string;

    constructor(user) {
        this.userId = user.userId;
        this.password = user.password;
        this.name = user.name;
        this.email = user.email;
    }
}

@Injectable({
    providedIn: 'root'
})

export class UserRestService {
    constructor(
        private http: HttpClient,
        private rest: RestService) {}

    register(user): Observable<any> {
        return this.http.post(endPoint + 'register/', JSON.stringify(user), this.rest.getHttpHeader())
            .pipe (
                catchError(this.handleError<any>('register'))
            );
    }

    login(user): Observable<any> {
        return this.http.post(endPoint + 'login/', JSON.stringify(user), this.rest.getHttpHeader())
            .pipe (
            catchError(this.handleError<any>('login'))
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
