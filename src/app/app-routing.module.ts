import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoriesComponent} from './categories/categories.component';
import {WorkDetailsComponent} from './work-details/work-details.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AdministrationComponent} from './administration/administration.component';
import {ProjectsComponent} from './administration/projects/projects.component';
import {AdminCategoriesComponent} from './administration/categories/categories.component';
import {ConnectComponent} from './connect/connect.component';

const routes: Routes = [
  {
    path: 'administration',
    component: AdministrationComponent,
  },
  {
    path: 'administration/dashboard',
    component: AdministrationComponent,
  },
  {
    path: 'administration/projects',
    component: ProjectsComponent,
  },
  {
    path: 'administration/categories',
    component: AdminCategoriesComponent,
  },
  {
    path: 'auth/login',
    component: ConnectComponent,
  },
  {path: 'projets/:name', component: CategoriesComponent},
  {path: 'projets/:name/:sndName', component: CategoriesComponent},
  {path: '', component: HomeComponent},
  {path: ':name', component: WorkDetailsComponent},
  {path: '404/page-not-found', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
