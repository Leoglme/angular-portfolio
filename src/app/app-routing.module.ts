import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkComponent} from './work/work.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: 'work',
    component: WorkComponent,
  },
  { path: "login", component: LoginComponent},
  // {path: '**', redirectTo: '/404'},
  // {path: '404', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
