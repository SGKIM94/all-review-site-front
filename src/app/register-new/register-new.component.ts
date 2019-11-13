import { Component, OnInit } from '@angular/core';
import {fuseAnimations} from '../../@fuse/animations';

@Component({
  selector: 'app-register-new',
  templateUrl: './register-new.component.html',
  styleUrls: ['./register-new.component.scss']
  animations : fuseAnimations
})
export class RegisterNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
