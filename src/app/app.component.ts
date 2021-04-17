import { Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'portfolio';
  posts: any;
  scrollRef = 0;
  constructor(
  ) {}

  ngOnInit(): void {
    AOS.init();
    let scrollRef = 0;
    const ctn = document.getElementsByTagName('mat-sidenav-content');
    ctn[0].addEventListener('scroll', () => {
      // increase value up to 10, then refresh AOS
      scrollRef <= 10 ? scrollRef++ : AOS.refresh();
    });
  }
}
