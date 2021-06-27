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
  linkedinUrl = environment.linkedinUrl;
  githubUrl = environment.githubUrl;
  appUrl = environment.urlApp;
  ngOnInit(): void {
  }

  SmoothVerticalScrolling(e: any, selector: any, time: any, where: any, margin: any) {
    const cible = document.querySelector(selector);
    // @ts-ignore 768
    const eTop = cible.getBoundingClientRect().top - margin;
    const elemHeight = cible.getBoundingClientRect().height;
    let eAmt = eTop / 100;
    let curTime = 0;
    if (navigator.platform === 'iPhone'){
      eAmt += 6;
    }
    while (curTime <= time) {
      window.setTimeout(this.SVS_B, curTime, eAmt, where);
      curTime += time / 100;
    }
  }

  SVS_B(eAmt: any, where: any) {
    if (where === "center" || where === "") {
      window.scrollBy(0, eAmt / 2);
    }
    if (where === "top") {
      window.scrollBy(0, eAmt);
    }
    if (where === "end") {
      window.scrollBy(0, eAmt);
    }
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
