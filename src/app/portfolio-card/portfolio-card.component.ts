import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CategoriesService} from '../Services/categories.service';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit, AfterViewInit {
  projects: any;
  constructor(public http: CategoriesService) { }

  ngOnInit(): void {
    this.getData();
    this.mobileHover();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void{
    const allWorkCard = document.querySelectorAll('.work__card');
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
  getData(){
    this.http.getDataCategories("http://localhost:3000/projects").subscribe(
      (data: any) => {
        this.projects = data;
      },
      (err: any) => {
        console.log(err);
      }, () => {
      }
    );
  }
}
