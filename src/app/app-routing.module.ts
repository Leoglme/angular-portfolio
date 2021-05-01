import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkComponent} from './work/work.component';
import {environment} from '../environments/environment';
import {HomeComponent} from './home/home.component';
import {CategoriesComponent} from './categories/categories.component';
const routes: Routes = [
  {
    path: 'work',
    component: WorkComponent,
  },
  { path: 'projets/:name', component: CategoriesComponent},
  { path: 'projets/:name/:sndName', component: CategoriesComponent},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(){
  }
}
