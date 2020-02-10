import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../user/user.service';
import {RestService} from '../rest.service';

const endPoint = 'http://localhost:5000/api/questions/list';

// const token = window.localStorage.getItem('token');
const token = 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiJ0a2Rybjg1NzgiLCJ1c2VySWQiOiJ0a2Rybjg1NzgiLCJpYXQiOjE1ODAzODg0ODB9.zcwqoOgxo4DI3rMBSi9j5aA1nY72iviT3VyY34dCtMo';


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

export class QuestionRestService {
    constructor(
        private http: HttpClient,
        private rest: RestService) {
    }

    list(): Observable<ResponseService> {
        this.rest.setTokenInHttpHeader(token);
        return this.http.get(endPoint, this.rest.getHttpHeader())
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
