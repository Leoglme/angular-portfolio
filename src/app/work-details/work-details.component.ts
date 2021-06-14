import {Component, OnInit, AfterViewInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {allIcons} from './IconList';
declare var Rellax: any;
@Component({
  selector: 'app-work-details',
  templateUrl: './work-details.component.html',
  styleUrls: ['./work-details.component.scss']
})
export class WorkDetailsComponent implements OnInit {
  icons: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer) {
  }

  projectLanguage: string[] | undefined;

  ngOnInit(): void {
    this.renderIcons();
    const rellax = new Rellax('.rellax');
  }

  fetchProjetDetails(): void {
    this.projectLanguage = ['expressJs', 'angular', 'html', 'css', 'cakephp', 'react', 'github', 'trello', 'gitkraken'];
  }

  renderIcons(): void {
    let html = '';
    this.fetchProjetDetails();
    if (this.projectLanguage){
      this.projectLanguage.forEach(lang => {
        if (allIcons.get(lang)){
          html += allIcons.get(lang);
        }
      });
    }
    this.icons = this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
