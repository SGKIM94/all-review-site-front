import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {config, interval, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
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
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from 'angular-notifier';

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

export class HomeComponent implements OnInit, OnDestroy {
  public index;
  fuseConfig: any;
  navigation: any;
  imageUrls: (string | IImage)[] = [
    {url: '../../assets/image/1.png', caption: 'Seeing the world'},
    {url: '../../assets/image/2.png', caption: 'Different world'}
  ];
  width: string = '100%';
  height: string = '100vh';
  minHeight: string;
  arrowSize: string = '10px';
  showArrows: boolean = false;
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
  menuClass = ['collapse', 'collapse-active'];
  private unsubscribeAll: Subject<any>;
  private readonly notifier: NotifierService;
  private token: Observable<string>;

  constructor(@Inject(DOCUMENT) private document: any,
              private fuseConfigService: FuseConfigService,
              private fuseNavigationService: FuseNavigationService,
              private fuseSidebarService: FuseSidebarService,
              private fuseSplashScreenService: FuseSplashScreenService,
              private fuseTranslationLoaderService: FuseTranslationLoaderService,
              private translateService: TranslateService,
              private platform: Platform,
              private notifierService: NotifierService,
              private router: ActivatedRoute){

    this.notifier = notifierService;
    this.initializeMenuClass();
    this.openMenu();
    this.navigation = navigation;
    this.fuseNavigationService.register('main', this.navigation);
    this.fuseNavigationService.setCurrentNavigation('main');
    this.translateService.addLangs(['en', 'tr']);
    this.translateService.setDefaultLang('en');
    this.fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);
    this.translateService.use('en');


    if (this.platform.ANDROID || this.platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    this.setRouterToken();
    const tokenValue = this.token.subscribe(
        e => {
          return e;
        }
    );

    this.showLoginNotification();

    this.unsubscribeAll = new Subject();
  }

  private initializeMenuClass(): void {
  }

  ngOnInit(): void {
    this.notifier.notify('error', '로그인에 성공하였습니다.');

    this.setFuseConfig();
  }

  private showLoginNotification(): void {
    this.notifier.notify('error', '아이디나 비밀번호를 확인해주시기 바랍니다.');
    this.notifier.notify('success', '로그인에 성공하였습니다.');
  }

  private setFuseConfig(): void {
    this.fuseConfigService.config
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((configs) => {
          this.fuseConfig = configs;

          this.changeBoxedClassToLayoutWidth();
          this.removeClassListWhenContainTheme();

          this.document.body.classList.add(this.fuseConfig.colorTheme);
        });
  }

  private setRouterToken(): void {
    this.token = this.router
        .queryParamMap
        .pipe(
            map(params => params.get('token').toString() || 'None')
        );
  }

  removeClassListWhenContainTheme(): void {
    const classList = this.document.body.classList;

    for (const item of classList) {
      this.removeThemeClassName(item);
    }
  }

  private removeThemeClassName(item): void {
    if (item.startsWith('theme-')) {
      this.document.body.classList.remove(item);
    }
  }

  changeBoxedClassToLayoutWidth(): void {
    if (this.fuseConfig.layout.width === 'boxed') {
      this.document.body.classList.add('boxed');
      return;
    }

    this.document.body.classList.remove('boxed');
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  private openMenu(): void {
    this.document.body.classList.add('noScroll');

    this.addCollapseActiveClassWithout();
  }

  private addCollapseActiveClassWithout(): void {
    if (this.haveActiveClass()) {
      this.menuClass.splice(1, 1);
    }

    this.menuClass[1] = 'collapse-active';
  }

  private haveActiveClass(): boolean {
    return this.menuClass.includes('collapse-active');
  }
}
