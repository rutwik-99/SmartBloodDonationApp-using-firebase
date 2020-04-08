import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientaccountPageRoutingModule } from './patientaccount-routing.module';

import { PatientaccountPage } from './patientaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientaccountPageRoutingModule
  ],
  declarations: [PatientaccountPage]
})
export class PatientaccountPageModule {}
