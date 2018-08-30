import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProyectoPage } from './proyecto';

@NgModule({
  declarations: [
    ProyectoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProyectoPage),
  ],
})
export class ProyectoPageModule {}
