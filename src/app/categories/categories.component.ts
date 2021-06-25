import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {CategoriesService} from '../Services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  private routeSub: Subscription | undefined;
  projects: any;
  currentLanguage = '';
  notFoundRoute = '404/page-not-found';
  constructor(private route: ActivatedRoute, public http: CategoriesService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
    this.mobileHover();
  }

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
  filterRequest(){
    let currentLanguage: any;
    this.routeSub = this.route.params.subscribe(params => {
      currentLanguage = params.sndName !== undefined ? params.name + "/" + params.sndName : params.name;
    });
    this.currentLanguage = currentLanguage;
    // @ts-ignore
    this.projects = this.projects.filter(language => language.languages.includes(currentLanguage));
    if (this.projects.length === 0){
      this.router.navigate(['./' + this.notFoundRoute]).then(r => (''));
    }
  }
  getData(){
    console.log('data');
    this.http.getDataCategories(environment.projectsApi).subscribe(
      (data: any) => {
        console.log(data);
        this.projects = data;
        this.filterRequest();
      },
      (err: any) => {
        console.log(err);
      }, () => {
      }
    );
  }
}
