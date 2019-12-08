import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
