import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorregPageRoutingModule } from './donorreg-routing.module';

import { DonorregPage } from './donorreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorregPageRoutingModule
  ],
  declarations: [DonorregPage]
})
export class DonorregPageModule {}
