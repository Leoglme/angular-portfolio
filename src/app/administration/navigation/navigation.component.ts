import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef | undefined;

  clicked: boolean;
  tooltipDashboardContent = '<span>Dashboard</span>';
  tooltipProjectContent = '<span>Projets</span>';
  tooltipCategoryContent = '<span>Catégories</span>';
  tooltipDisconnectContent = '<span>Déconnexion</span>';
  isLoggedIn: any;
  constructor(private router: Router) {
    // @ts-ignore
    this.clicked = this.clicked !== undefined;
  }

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  disconnect(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }

}
