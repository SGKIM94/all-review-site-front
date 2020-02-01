import { Component, OnInit } from '@angular/core';
import {Question, Questions, QuestionRestService} from '../rest-config/question/question.service';
import * as ResponseCode from '../rest-config/code';
import {NotifierService} from 'angular-notifier';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  pageRows: Array<string>;
  boards: Array<Question>;
  private readonly notifier: NotifierService;


  constructor(
      private rest: QuestionRestService,
      private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;

    this.findAll();
    this.pageRows = ['10', '20', '30', '40'];
  }

  findAll(): void {
    this.rest.list().subscribe(response => {
      if (ResponseCode.isSuccessResponse(response.code)) {
        this.showErrorNotice();
        return;
      }

      console.log(' response : ' + JSON.stringify(response, null, 4));
      console.log(' response.information : ' + JSON.stringify(response.information, null, 4));

      this.boards = response.information.questions;

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
