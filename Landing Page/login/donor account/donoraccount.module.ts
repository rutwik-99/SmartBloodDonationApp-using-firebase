import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonoraccountPageRoutingModule } from './donoraccount-routing.module';

import { DonoraccountPage } from './donoraccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonoraccountPageRoutingModule
  ],
  declarations: [DonoraccountPage]
})
export class DonoraccountPageModule {}
