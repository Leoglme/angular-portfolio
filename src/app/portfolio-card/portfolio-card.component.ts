import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit, AfterViewInit {
  projects = [
    {
      name: 'myTweeter',
      imageUrl: 'my-twitter.png',
      websiteUrl: 'tweeter.dibodev.com',
    },
    {
      name: 'myMeetic',
      imageUrl: 'my-meetic.png',
      websiteUrl: 'my-meetic.dibodev.com',
    },
    {
      name: 'myCinéma',
      imageUrl: 'my-cinema.png',
      websiteUrl: 'my-cinema.dibodev.com',
    },
    {
      name: 'mySpotify',
      imageUrl: 'my-spotify.png',
      websiteUrl: 'my-spotify.dibodev.com',
    },
    {
      name: 'puissance4',
      imageUrl: 'puissance4.png',
      websiteUrl: 'puissance4.dibodev.com',
    },
    {
      name: 'snake',
      imageUrl: 'snake-game.png',
      websiteUrl: 'jeuduserpent.dibodev.com',
    },
    {
      name: 'battleship',
      imageUrl: 'battleship.png',
      websiteUrl: 'battleship.dibodev.com',
    },
    {
      name: 'burger-code',
      imageUrl: 'burger-code.png',
      websiteUrl: 'burger-code.dibodev.com',
    },
    {
      name: 'portfolio',
      imageUrl: 'dibodev.png',
      websiteUrl: 'dibodev.com',
    },
    {
      name: 'wild-circus',
      imageUrl: 'wild-circus.png',
      websiteUrl: 'wild-circus.dibodev.com',
    },
    {
      name: 'travelagency',
      imageUrl: 'travel-agency.png',
      websiteUrl: 'travelagency.dibodev.com',
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.mobileHover();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void{
    const allWorkCard = document.querySelectorAll('.work__card');
    console.log(allWorkCard);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allWorkCard.length; i++){
      // @ts-ignore
      allWorkCard[i].attributes[2].nodeValue =  i * 100;
    }
  }
  mobileHover(): void {
    if (window.matchMedia('(pointer: coarse)').matches) {
      window.onload = (): void => {
        const workCard =  document.getElementsByClassName('work__mask');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < workCard.length; i++){
          // @ts-ignore
          workCard[i].addEventListener('pointerover',  (e) => {
            // @ts-ignore
            e.target.style.opacity = 1;
          });
          // @ts-ignore
          workCard[i].addEventListener('pointerout',  (e) => {
            setTimeout(() =>
                // @ts-ignore
                e.target.style.opacity = 0
              , 2000);
          });
        }
      };
    }
  }
}
