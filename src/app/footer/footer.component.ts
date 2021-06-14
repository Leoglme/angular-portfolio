import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  mail = environment.mail;
  discordUrl = environment.discordUrl;
  githubUrl = environment.githubUrl;
  appUrl = environment.urlApp;
  ngOnInit(): void {
  }

  scrollToElement(element: any): void {
    // @ts-ignore
    const section = document.getElementById(element);
    // @ts-ignore
    section.scrollIntoView({behavior: "smooth", block: element === 'contact' ? 'end' : 'center', inline: "nearest"});
  }

  redirect(url: string) {
    // @ts-ignore
    window.location = url;
  }
}
