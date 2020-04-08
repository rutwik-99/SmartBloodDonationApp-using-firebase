import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientregPageRoutingModule } from './patientreg-routing.module';

import { PatientregPage } from './patientreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientregPageRoutingModule
  ],
  declarations: [PatientregPage]
})
export class PatientregPageModule {}
