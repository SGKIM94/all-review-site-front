import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  pageRows: Array<string>;
  boards: Array<string>;

  constructor() {
    this.pageRows = ['10', '20', '30', '40'];
    const firstBoard = [
      '1',
      'paymint',
      'first board',
      '2019-01-17',
      '2019-01-17'
    ];

    this.boards = firstBoard;
  }

  ngOnInit(): void {
  }
}
