import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdPostPage } from './ad-post.page';

const routes: Routes = [
  {
    path: '',
    component: AdPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdPostPageRoutingModule {}
