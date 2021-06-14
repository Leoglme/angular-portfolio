import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CategoriesService} from '../Services/categories.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

const url = 'assets/slider.js';

@Component({
  selector: 'app-portfolio-card',
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.scss']
})
export class PortfolioCardComponent implements OnInit, AfterViewInit {
  projects: any;
  currentSlide = 0;
  perPage = 11;

  constructor(public http: CategoriesService, private router: Router) {
  }

  ngOnInit(): void {
    this.getData();
    this.mobileHover();
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    const allWorkCard = document.querySelectorAll('.work__card');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allWorkCard.length; i++) {
      // @ts-ignore
      allWorkCard[i].attributes[2].nodeValue = i * 100;
    }
  }

  mobileHover(): void {
    if (window.matchMedia('(pointer: coarse)').matches) {
      window.onload = (): void => {
        const workCard = document.getElementsByClassName('work__mask');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < workCard.length; i++) {
          // @ts-ignore
          workCard[i].addEventListener('pointerover', (e) => {
            // @ts-ignore
            e.target.style.opacity = 1;
          });
          // @ts-ignore
          workCard[i].addEventListener('pointerout', (e) => {
            setTimeout(() =>
                // @ts-ignore
                e.target.style.opacity = 0
              , 2000);
          });
        }
      };
    }
  }

  getData() {
    this.http.getDataCategories(environment.projectsApi).subscribe(
      (data: any) => {
        this.projects = data;
        if (this.projects !== undefined) {
          this.loadScript();
          this.responsiveSlider();
          this.action();
        }
      },
      (err: any) => {
        console.log(err);
      }, () => {
      }
    );
  }

  slideGestion() {
    const slider = document.getElementsByClassName('work__container')[0];
    const newSlider = document.getElementsByClassName('slider__works');
    for (const item of this.projects) {
      const countSlider = document.querySelectorAll('.work__container').length;
      if (this.currentSlide > this.perPage) {
        newSlider[0].innerHTML += '<div class="work__container">' + this.newCard(item) + '</div>';
        this.currentSlide = 0;
      } else if (countSlider !== 1) {
        document.querySelectorAll('.work__container')[countSlider - 1].innerHTML += this.newCard(item);
      } else {
        slider.innerHTML += this.newCard(item);
      }
      this.currentSlide += 1;
    }
  }

  newCard(work: any) {
    let resultHtml: string | undefined;
    resultHtml = `<mdb-card class="work__card card"
          ng-reflect-router-link="${work.route}"
          data-aos="zoom-in" data-aos-delay="300">
  <div class="view rgba-white-slight waves-light" mdbWavesEffect>
    <!-- Card img -->
    <img class="img-fluid" src="assets/images/${work.imageUrl}"
                  alt="Card image cap">
    <a>
      <div class="work__mask mask">
        <p class="text__mask">Ouvrir</p>
        <span class="work__mask--footer"><span class="material-icons-outlined">north_east</span>${work.websiteUrl}</span>
      </div>
    </a>
  </div>
</mdb-card>`;
    return resultHtml;
  }

  action() {
    const cards = document.getElementsByClassName('work__card');
    // @ts-ignore
    for (const card of cards) {
      card.addEventListener('click',
        () => this.router.navigate([card.getAttribute('ng-reflect-router-link')]));
    }
  }

  responsiveSlider() {
    if (window.innerWidth <= 1700) {
      this.perPage = 7;
    }
    if (window.innerWidth <= 1360) {
      this.perPage = 5;
    }
    if (window.innerWidth <= 600) {
      this.perPage = 1;
    }
    this.slideGestion();
  }
}
