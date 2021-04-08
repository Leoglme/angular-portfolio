import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{

  public innerWidth: any;
  public isMobile = false;
  public isSmallScreen = false;

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
    console.log(this.isMobile);
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

}
