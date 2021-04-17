import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loader();
  }
  loader(): void{
    // imitation of new page loading
      const body = document.getElementsByTagName('body')[0];
      const app = document.getElementById('#app');
      window.addEventListener("load", () => {
        loader(10);
      });


      function loader(delay: number): void {
        setTimeout(() => {
          body.classList.add('loading');
        }, delay);

        setTimeout(() => {
          body.classList.add('loaded');
        }, delay + 500);

        setTimeout(() => {
          body.classList.remove('loading');
          body.classList.add('new-page');
          // @ts-ignore
          app.style.visibility = 'visible';
        }, delay + 1950);
      }
  }
}
