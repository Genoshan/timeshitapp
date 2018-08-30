import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HorasPage } from './horas';

@NgModule({
  declarations: [
    HorasPage,
  ],
  imports: [
    IonicPageModule.forChild(HorasPage),
  ],
})
export class HorasPageModule {}
