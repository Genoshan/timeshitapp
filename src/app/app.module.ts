
import { BrowserModule } from '@angular/platform-browser';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(es);
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { HttpClientModule} from "@angular/common/http";

import { MyApp } from './app.component';


import {HomePage,UsuarioPage,TareasPage,ProyectosPage,ProyectoPage,NavbarPage,LoginUsuarioPage,HorasPage,HoraPage,TareaPage,HorasefectivasPage, AsignarusuariosaproyectosPage} from '../pages/index.paginas';
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
    HorasefectivasPage,
    AsignarusuariosaproyectosPage    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,
      {dayNames: ['sábado', 'domingo', 'lunes', 'martes', 'miércoles','jueves','viernes']})
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
    HorasefectivasPage,
    AsignarusuariosaproyectosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioserviceProvider,
    ProyectosserviceProvider,
    TareasserviceProvider,
    HorasserviceProvider,
    { provide: LOCALE_ID, useValue: "es" } 
  ]
})
export class AppModule {}
