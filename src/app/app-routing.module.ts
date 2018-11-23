import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkComponent } from './work/work.component';
import { PageComponent } from './page/page.component';
import { DetailsComponent } from './details/details.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: WorkComponent
  },
  {
    path: 'work/:category/:item',
    component: DetailsComponent,
    outlet: 'details'
  },
  {
    path: 'page/:slug',
    component: PageComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
