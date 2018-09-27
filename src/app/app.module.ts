
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';


import {HomePage,UsuarioPage,TareasPage,ProyectosPage,ProyectoPage,NavbarPage,LoginUsuarioPage,HorasPage,HoraPage,TareaPage,HorasefectivasPage} from '../pages/index.paginas';
import { UsuarioserviceProvider } from '../providers/usuarioservice/usuarioservice';
import { ProyectosserviceProvider } from '../providers/proyectosservice/proyectosservice';
import { TareasserviceProvider } from '../providers/tareasservice/tareasservice';
import { HorasserviceProvider } from '../providers/horasservice/horasservice';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsuarioPage,
    TareasPage,
    ProyectosPage,
    ProyectoPage,
    NavbarPage,
    LoginUsuarioPage,
    HorasPage,
    HoraPage,
    TareaPage,
    HorasefectivasPage    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsuarioPage,
    TareasPage,
    ProyectosPage,
    ProyectoPage,
    NavbarPage,
    LoginUsuarioPage,
    HorasPage,
    HoraPage,
    TareaPage,
    HorasefectivasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioserviceProvider,
    ProyectosserviceProvider,
    TareasserviceProvider,
    HorasserviceProvider
  ]
})
export class AppModule {}
