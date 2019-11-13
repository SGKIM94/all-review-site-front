import {Component, OnDestroy, OnInit} from '@angular/core';
import {fuseAnimations} from '../../@fuse/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {FuseConfigService} from '../../@fuse/services/config.service';

@Component({
  selector: 'app-register-new',
  templateUrl: './register-new.component.html',
  styleUrls: ['./register-new.component.scss'],
  animations : fuseAnimations
})
export class RegisterNewComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  registerFormErrors: any;

  private _unsubscribeAll: Subject<any>;

  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,

  ) {
      this.openMenu();

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  openMenu = () => {
    this.addCollapseActiveClassWithout();

  }

  private addCollapseActiveClassWithout = () => {
    const collapseElement = this.document.getElementById('collapse');
    if (collapseElement.classList.contains('collapse-active')) {
      collapseElement.classList.remove('collapse-active');
    }

    collapseElement.classList.add('collapse-active');
  }
}
