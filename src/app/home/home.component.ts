import {Component, Inject, OnInit} from '@angular/core';
import {config, interval, Subject} from 'rxjs';
import {colorSets} from '@swimlane/ngx-charts/release/utils';
import {map, takeUntil} from 'rxjs/operators';
import {IImage} from 'ng-simple-slideshow';
import {DOCUMENT} from '@angular/common';
import {FuseConfigService} from '../../@fuse/services/config.service';
import {FuseNavigationService} from '../../@fuse/components/navigation/navigation.service';
import {FuseSidebarService} from '../../@fuse/components/sidebar/sidebar.service';
import {FuseSplashScreenService} from '../../@fuse/services/splash-screen.service';
import {FuseTranslationLoaderService} from '../../@fuse/services/translation-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {Platform} from '@angular/cdk/platform';
import {navigation} from '../navigation/navigation';
import {locale as navigationEnglish} from '../navigation/i18n/en';
import {locale as navigationTurkish} from '../navigation/i18n/tr';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


const timeInterval$ = interval(10000);

timeInterval$.pipe(
    map(() => {
      console.log('123');
    })
);


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public index;
  fuseConfig: any;
  navigation: any;
  imageUrls: (string | IImage)[] = [
    {url: 'assets/image/1.png', caption: 'Seeing the world'},
    {url: 'assets/image/2.png', caption: 'Different world'}
  ];
  height: string = '100vh';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3000;
  stopAutoPlayOnSlide; boolean = true;
  debug: boolean = false;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = false;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'transparent';
  lazyLoad: boolean = false;
  hideOnNoSlides: boolean = false;
  private _unsubscribeAll: Subject<any>;

  constructor(@Inject(DOCUMENT) private document: any,
              private _fuseConfigService: FuseConfigService,
              private _fuseNavigationService: FuseNavigationService,
              private _fuseSidebarService: FuseSidebarService,
              private _fuseSplashScreenService: FuseSplashScreenService,
              private _fuseTranslationLoaderService: FuseTranslationLoaderService,
              private _translateService: TranslateService,
              private _platform: Platform){

    console.log(' inin ');
    this.openMenu();
    this.navigation = navigation;
    this._fuseNavigationService.register('main', this.navigation);
    this._fuseNavigationService.setCurrentNavigation('main');
    this._translateService.addLangs(['en', 'tr']);
    this._translateService.setDefaultLang('en');
    this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);
    this._translateService.use('en');

    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    this._unsubscribeAll = new Subject();

  }

  ngOnInit(): void {
    this._fuseConfigService.config
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((configs) => {
          this.fuseConfig = configs;

          this.changeBoxedClassToLayoutWidth();
          this.removeClassListWhenContainTheme();

          this.document.body.classList.add(this.fuseConfig.colorTheme);
        });
  }

  removeClassListWhenContainTheme(): void {
    const thisObject = this;
    this.document.body.classList.map((item) => {
      if (item.startsWith('theme-')) {
        thisObject.document.body.classList.remove(item);
      }
    });
  }

  changeBoxedClassToLayoutWidth(): void {
    if (this.fuseConfig.layout.width === 'boxed') {
      this.document.body.classList.add('boxed');
      return;
    }

    this.document.body.classList.remove('boxed');
  }

  ngOnDestroy = () => {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private openMenu = () => {
    this.document.body.classList.add('noScroll');

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
