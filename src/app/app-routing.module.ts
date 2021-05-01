import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkComponent} from './work/work.component';
import {environment} from '../environments/environment';
import {HomeComponent} from './home/home.component';
import {CategoriesComponent} from './categories/categories.component';
import {WorkDetailsComponent} from './work-details/work-details.component';
const routes: Routes = [
  {
    path: 'work',
    component: WorkComponent,
  },
  { path: 'projets/:name', component: CategoriesComponent},
  { path: 'projets/:name/:sndName', component: CategoriesComponent},
  { path: '', component: HomeComponent},
  { path: ':project_name', component: WorkDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(){
  }
}
