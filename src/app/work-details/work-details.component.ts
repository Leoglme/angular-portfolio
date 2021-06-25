import {Component, OnInit, AfterViewInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {allIcons} from './IconList';
import {environment} from "../../environments/environment";
import {CategoriesService} from "../Services/categories.service";
import {ActivatedRoute, Router} from "@angular/router";

declare var Rellax: any;

@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss']
})
export class WorkDetailsComponent implements OnInit {
  icons: SafeHtml | undefined;
  projects: any;
  projectName: any;
  projectPicture: any;
  projectColor: any;
  projectDescription: any;
  mockup1: any;
  mockup2: any;
  websiteUrl: any;
  year: any;
  productionTime: any;
  github: any;

  constructor(private sanitizer: DomSanitizer, public http: CategoriesService,
              private router: Router, private activeRoute: ActivatedRoute) {
  }

  projectLanguage: string[] | undefined;
  notFoundRoute = '404/page-not-found';

  ngOnInit(): void {
    this.getData();
    const rellax = new Rellax('.rellax');
  }

  findPos(obj: any) {
    let curtop = 0;
    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while (obj === obj.offsetParent);
      return [curtop];
    } else {
      return null;
    }
  }

  scrollToElement(event: any, cible: any): void {
    const nextCible = document.getElementById(cible);
    if (nextCible) {
      const y = event.target.getBoundingClientRect().top + nextCible.clientHeight;
      window.scroll({
        top: y,
        behavior: 'smooth'
      });
    }
  }

  getData() {
    this.activeRoute.params.subscribe(params => {
      const currentProject = params.name;
      if (currentProject) {
        this.http.getDataCategories(environment.projectDetailsApi + currentProject).subscribe(
          (data: any) => {
            this.projects = data;
            this.projectName = data.name;
            this.projectPicture = data.logo;
            this.projectDescription = data.description;
            this.mockup1 = data.mockup1;
            this.mockup2 = data.mockup2;
            this.websiteUrl = data.url;
            this.productionTime = data.production_time;
            this.github = data.github;
            this.year = data.year;
            this.projectColor = 'background: ' + data.color;
            const tempLang: any[] = [];
            if (data.languages) {
              data.languages.forEach((lang: any) => {
                if (lang.split('/').length > 1 && lang !== 'sass/scss') {
                  lang.split('/').forEach((explodeLang: any) => {
                    tempLang.push(explodeLang);
                  });
                } else {
                  tempLang.push(lang);
                }
              });
              console.log(tempLang);
            }
            this.projectLanguage = tempLang;
            this.renderIcons();
            if (!this.projects) {
              this.router.navigate(['./' + this.notFoundRoute]).then(r => (''));
            }
          },
          (err: any) => {
            this.router.navigate(['./' + this.notFoundRoute]).then(r => (''));
          }, () => {
          }
        );
      } else {
        this.router.navigate(['./' + this.notFoundRoute]).then(r => (''));
      }
    });
  }

  renderIcons(): void {
    let html = '';
    if (this.projectLanguage) {
      this.projectLanguage.forEach(lang => {
        if (allIcons.get(lang)) {
          html += allIcons.get(lang);
        }
      });
    }
    this.icons = this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
