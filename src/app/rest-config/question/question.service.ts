import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../user/user.service';

const endPoint = 'http://localhost:5000/questions/list';

// const token = window.localStorage.getItem('token');
const token = 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJ0a2Rybjg1NzgiLCJpYXQiOjE1NzkzNDE3MDh9.JF3oXC1msDCVAyNxzKvGDmrwCjhxhxvqkRyuxYZ3ndg';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
    })
};

export class ResponseService {
    code: string;
    message: string;
    information: Questions;

    constructor(response) {
        this.code = response.code;
        this.message = response.message;
        this.information = response.information;
    }
}

export class Questions {
    questions: Array<Question>;

    constructor(questions: Array<Question>) {
        this.questions = questions;
    }
}

export class Question {
    id: string;
    title: string;
    contents: string;
    deleted: boolean;
    writer: User;

    constructor(question) {
        this.id = question.id;
        this.title = question.title;
        this.contents = question.content;
        this.deleted = question.deleted;
        this.writer = question.wrtier;
    }
}

@Injectable({
    providedIn: 'root'
})

export class RestService {
    constructor(private http: HttpClient) {}

    list(): Observable<ResponseService> {
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
