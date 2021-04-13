import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WorkComponent} from './work/work.component';

const routes: Routes = [
  {
    path: 'work',
    component: WorkComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
