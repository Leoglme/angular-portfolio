import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  skills = [
    {
      language: 'angular',
      imageUrl: 'angular-logo.png',
    },
    {
      language: 'react',
      imageUrl: 'react-logo.png',
    },
    {
      language: 'jquery',
      imageUrl: 'jquery-logo-2.png',
    },
    {
      language: 'html | Css',
      imageUrl: 'html-css-logo.jpg',
    },
    {
      language: 'javascript',
      imageUrl: 'javascript-logo.jpg',
    },
    {
      language: 'php',
      imageUrl: 'logo-php.png',
    },
    {
      language: 'wordpress',
      imageUrl: 'logo-wordpress.png',
    },
];

  constructor() {
  }

  ngOnInit(): void {
    AOS.init();
    this.UrlExists(this.skills);
  }


  // @ts-ignore
  UrlExists(obj: string | { language: string; imageUrl: string; }[]): boolean {
    const regexFileName = /^[\w,\s-]+\.*/gm;
    for (let i = 0; i < 5; i++){
      // @ts-ignore
      const fileName = obj[i].imageUrl;
      const url = 'assets/images/' + fileName;

      const http = new XMLHttpRequest();
      http.open('HEAD', url, false);
      http.send();
      if (http.status === 404){
        // @ts-ignore
        obj[i].imageUrl = fileName.match(regexFileName)[0] + 'jpg';
      }
    }
  }
}
