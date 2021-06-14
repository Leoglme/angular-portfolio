import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../loader/loader.service';
const url = 'assets/landing.js';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{
  loadAPI: Promise<any> | undefined;
  public innerWidth: any;
  public isMobile = false;
  public isSmallScreen = false;
  urlApp = environment.urlApp;
  currentPage = window.location.pathname;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // @ts-ignore
  constructor(private breakpointObserver: BreakpointObserver, router: Router,
              public loaderService: LoaderService) {
    if (this.currentPage  === '/404/page-not-found'){
      // @ts-ignore
      setTimeout(() => this.loaderService = false, 1000);
    }
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
    router.events.subscribe(val => {
      this.currentPage = window.location.pathname;
      this.loadScript();
      this.not_foundResponsive();
    });
  }
  ngOnInit(): void {
    this.getDisplaySize();
    this.responsiveNavbar();
  }
  getDisplaySize(): void {
    this.innerWidth = window.innerWidth;
  }
  // @ts-ignore
  responsiveNavbar(): boolean {
    if (this.innerWidth >= 768){
      return this.isMobile = true;
    }
  }

  scrollToElement(element: any): void {
    let section: Element | null;
    if (element === 'contact'){
       section = document.getElementsByClassName('contact__card')[0];
    }else{
      section = document.getElementById(element);
    }
    // @ts-ignore
    section.scrollIntoView({behavior: "smooth", block: element === 'contact' ? 'end' : 'center', inline: "nearest"});
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  not_foundResponsive(){
    const sideNav = document.getElementsByClassName('mat-sidenav-content') as HTMLCollectionOf<HTMLElement>;
    if (this.currentPage === '/404/page-not-found'){
      sideNav[0].style.overflow  = 'unset';
    }else{
      sideNav[0].style.overflow  = 'auto';
    }
  }
}
