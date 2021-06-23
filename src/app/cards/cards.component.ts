import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {count} from 'rxjs/operators';
import {Router} from '@angular/router';
import {logger} from 'codelyzer/util/logger';

const url = 'assets/slider.js';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewInit {
  skillsAPI = environment.skillsApi;
  skills: any;
  starsTotal = 5;
  product: any;
  skillRating: string | undefined;
  currentSlide = 0;
  perPage = 9;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.fetchCategories();
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngAfterViewInit(): void {
    const allSkillCard = document.querySelectorAll('.skills-card');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allSkillCard.length; i++) {
      // @ts-ignore
      allSkillCard[i].attributes[3].nodeValue = i * 100;
    }
  }

  rating() {
    this.skills.forEach((skill: { rating: string | number; }) => {
      // Get percentage
      // @ts-ignore
      const starPercentage = (skill.rating / this.starsTotal) * 100;
      // Arrondir au 10 le plus proche
      this.skillRating = `${Math.round(starPercentage / 10) * 10}%`;
      // @ts-ignore - array replace avec le pourcentage pour changer la width
      skill.rating = this.skillRating;
    });
  }

  fetchCategories(): void {
    this.http.get(this.skillsAPI)
      // tslint:disable-next-line:variable-name
      .subscribe(Response => {
        this.skills = Response;
        environment.categoriesObject = Response;
        if (this.skills !== undefined) {
          this.rating();
          this.loadScript();
          this.responsiveSlider();
          this.action();
        }
      });
  }

  slideGestion() {
    const slider = document.getElementsByClassName('skills__category')[0];
    const newSlider = document.getElementsByClassName('slider');
    for (const item of this.skills) {
      const countSlider = document.querySelectorAll('.skills__category').length;
      if (this.currentSlide > this.perPage) {
        newSlider[0].innerHTML += '<div class="skills__category">' + this.newCard(item) + '</div>';
        this.currentSlide = 0;
      }else if (countSlider !== 1){
        document.querySelectorAll('.skills__category')[countSlider - 1].innerHTML += this.newCard(item);
      }else {
        slider.innerHTML += this.newCard(item);
      }
      this.currentSlide += 1;
    }
  }

  newCard(skill: any) {
    let resultHtml: string | undefined;
    resultHtml = `<mdb-card class="view skills-card"
                mdbWavesEffect data-aos-delay="300" data-aos="fade-down-right"
                ng-reflect-router-link="${skill.route}"
                style="${skill.btnDisable === 'true' ? 'pointer-events: none;' : ''}">
        <div>
          <!-- Card img -->
          <img class="img-fluid" src="${skill.imageUrl}" alt="Card image cap" style="max-width: 133px;">
          <a>
            <div class="mask"></div>
          </a>
        </div>
        <!--Card content-->
        <mdb-card-body class="card-body">
          <!--Title-->
          <mdb-card-title class="card-title">
            <h4 class="skills__title">${skill.language}</h4>

          </mdb-card-title>
          <div class="stars-outer">
            <div class="stars-inner" style="width: ${skill.rating}"></div>
          </div>

          <button mdbBtn class="skills__btn btn-primary btn ${skill.btnDisable === 'true' ? ' disabled ' : ''}" color="primary">Voir projets</button>
        </mdb-card-body>
      </mdb-card>`;
    return resultHtml;
  }

  action() {
    const cards = document.getElementsByClassName('skills-card');
    // @ts-ignore
    for (const card of cards) {
      card.addEventListener('click',
        () => this.router.navigate(['projets/' + card.getAttribute('ng-reflect-router-link')]));
    }
  }
  responsiveSlider(){
    if (window.innerWidth <= 1700){
      this.perPage = 7;
    }
    if (window.innerWidth <= 1360){
      this.perPage = 5;
    }
    if (window.innerWidth <= 680){
      this.perPage = 2;
    }
    this.slideGestion();
  }
}
