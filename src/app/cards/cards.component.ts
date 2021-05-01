import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

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

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.fetchCategories();
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
      .subscribe(Response => {
        this.skills = Response;
        environment.categoriesObject = Response;
        if (this.skills !== undefined){
          this.rating();
        }
      });
  }
}
