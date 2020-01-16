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
    const firstBoard = {
      'NO': '1',
      'WR': ''
    }
  }

  ngOnInit(): void {
  }
}
