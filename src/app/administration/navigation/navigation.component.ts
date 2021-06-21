import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


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
  constructor() {
    // @ts-ignore
    this.clicked = this.clicked !== undefined;
  }

  ngOnInit() {
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

}
