import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    if (!this.isLoggedIn){
      this.router.navigate(['/auth/login']);
    }
  }
}
