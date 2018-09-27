import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proyecto } from '../../interfaces/proyecto';
import { HoraEfectiva } from '../../interfaces/horaefectiva';
import { Usuario } from '../../interfaces/usuario';
import { Tarea } from '../../interfaces/tarea';
import { Hora } from '../../interfaces/hora';
import { HorasserviceProvider } from '../../providers/horasservice/horasservice';

/**
 * Generated class for the HorasefectivasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-horasefectivas',
  templateUrl: 'horasefectivas.html',
})
export class HorasefectivasPage {

  proyectos: Proyecto[] = [];  

  horasefectivas: HoraEfectiva[] = [];

  loading: boolean;
  p: number = 1;
  user: Usuario = {
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  };

  proyecto: Proyecto = {
    Nombre: "",
    FechaInicio: new Date(Date.now()),
    Estado: true,
    codigoProyecto: "",
    IdProyecto: 0
  };

  tarea: Tarea = {
    IdTarea: 0,
    Nombre: "",  
    Descripcion: "",
    FechaInicio: new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto: 0  
  }

  hora:Hora = {
    Idhora:0,
    Descripcion: "" ,
    CantidadHoras: 0,
    Fecha:new Date(Date.now()),
    IdTarea: 0,
  };

  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private hservice: HorasserviceProvider) {
  }

  ListarHorasMensualesDeUsuario(){

    //LISTA HORAS EFECTIVAS DEL USUARIO DESDE API
    this.user = JSON.parse(localStorage.getItem("usuario"));

    this.hservice.ListarHorasMensualesDeUsuario(this.user["CI"]).subscribe(
      correcto => {
        if (correcto) {
          this.horasefectivas = correcto;
          
          
          console.log(this.horasefectivas);

        } else {
          this.status = "error";
        }
      },
      error => {
        this.status = "error";
        console.log(error);
      }
    );

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad HorasefectivasPage');    
    this.ListarHorasMensualesDeUsuario();
    
  }

}
