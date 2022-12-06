import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdPostPageRoutingModule } from './ad-post-routing.module';

import { AdPostPage } from './ad-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdPostPageRoutingModule
  ],
  declarations: [AdPostPage]
})
export class AdPostPageModule {}
