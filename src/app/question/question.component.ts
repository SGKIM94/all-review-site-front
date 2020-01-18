import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest-config/question/question.service';
import * as ResponseCode from '../rest-config/code';
import {NotifierService} from 'angular-notifier';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  pageRows: Array<string>;
  boards: Array<Array<string>> = [];
  private readonly notifier: NotifierService;


  constructor(
      private rest: RestService,
      private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;

    this.findAll();
    this.pageRows = ['10', '20', '30', '40'];
    const firstBoard = [
      '1',
      'paymint',
      'first board',
      '2019-01-17',
      '2019-01-17'
    ];

    const secondBoard = [
      '2',
      'paymint',
      'second board',
      '2019-01-17',
      '2019-01-17'
    ];

    const thirdBoard = [
      '3',
      'paymint',
      'third board',
      '2019-01-17',
      '2019-01-17'
    ];

    this.boards.push(firstBoard);
    this.boards.push(secondBoard);
    this.boards.push(thirdBoard);
  }

  findAll(): void {
    const pageable = {
      'page': '0',
      'size': '10'
    };

    this.rest.list(pageable).subscribe(response => {
      if (ResponseCode.isSuccessResponse(response.code)) {
        this.showErrorNotice();
        return;
      }

      console.log(' response : ' + JSON.stringify(response, null, 4));

    }, error => {
      this.showErrorNotice();
    });
  }

  private showErrorNotice(): void {
    this.notifier.notify('error', '페이지를 조회하던 중 오류가 발생하였습니다.');
  }

  ngOnInit(): void {
  }
}
