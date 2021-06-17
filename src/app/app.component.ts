import { Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {environment} from '../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'portfolio';
  posts: any;
  scrollRef = 0;
  // tslint:disable-next-line:variable-name
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    AOS.init();
    let scrollRef = 0;
    const ctn = document.getElementsByTagName('mat-sidenav-content');
    ctn[0].addEventListener('scroll', () => {
      // increase value up to 10, then refresh AOS
      scrollRef <= 10 ? scrollRef++ : AOS.refresh();
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scroll(0, 0);
    });
  }
}
