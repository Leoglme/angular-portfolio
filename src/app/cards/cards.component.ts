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
      btnDisable: '',
      rating: 1,
    },
    {
      language: 'react',
      imageUrl: 'react-logo.png',
      btnDisable: '',
      rating: 1.5,
    },
    {
      language: 'jquery',
      imageUrl: 'jquery-logo-2.png',
      btnDisable: '',
      rating: 2,
    },
    {
      language: 'html | Css',
      imageUrl: 'html-css-logo.png',
      btnDisable: '',
      rating: 2.5,
    },
    {
      language: 'javascript',
      imageUrl: 'javascript-logo.png',
      btnDisable: '',
      rating: 3,
    },
    {
      language: 'php',
      imageUrl: 'logo-php.png',
      btnDisable: '',
      rating: 3.5,
    },
    {
      language: 'wordpress',
      imageUrl: 'logo-wordpress.png',
      btnDisable: '',
      rating: 4,
    },
    {
      language: 'photoshop',
      imageUrl: 'photoshop.png',
      btnDisable: 'true',
      rating: 4.5,
    },
    {
      language: 'unreal engine',
      imageUrl: 'logo-unreal-engine.png',
      btnDisable: '',
      rating: 5,
    },
];
  // Total Stars
  starsTotal = 5;
  product: any;
  skillRating: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
    AOS.init();
    this.UrlExists(this.skills);
    this.rating();
  }


  // @ts-ignore
  UrlExists(obj: string | { language: string; imageUrl: string; }[]): boolean {
    const regexFileName = /^[\w,\s-]+\.*/gm;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < obj.length; i++){
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
   rating(): void{
     this.skills.forEach(skill => {
       // Get percentage
       const starPercentage = (skill.rating / this.starsTotal) * 100;
       // Arrondir au 10 le plus proche
       this.skillRating = `${Math.round(starPercentage / 10) * 10}%`;
       // @ts-ignore - array replace avec le pourcentage pour changer la width
       skill.rating  = this.skillRating;
     });
  }
}
