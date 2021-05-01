import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{
  public innerWidth: any;
  public isMobile = false;
  public isSmallScreen = false;
  urlApp = environment.urlApp;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
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
    const section = document.getElementById(element);
    // @ts-ignore
    section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  backHome(){
    // @ts-ignore
    window.location = this.urlApp;
  }

}
