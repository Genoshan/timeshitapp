import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Tarea } from '../../interfaces/tarea';
import { Proyecto } from '../../interfaces/proyecto';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { TareasserviceProvider } from '../../providers/tareasservice/tareasservice';
import { Hora } from '../../interfaces/hora';
import { Usuario } from '../../interfaces/usuario';
import { HorasserviceProvider } from '../../providers/horasservice/horasservice';
import { HoraPage } from '../hora/hora';


@IonicPage()
@Component({
  selector: 'page-horas',
  templateUrl: 'horas.html',
})
export class HorasPage {

  /*****ATRIBUTOS******/
  p: number = 1;

  horas: Hora[] = [];

  id: number;
  loading: boolean;

  hora: Hora = {
    Idhora: 0,
    Descripcion: "",
    CantidadHoras: 0,
    Fecha: new Date(Date.now()),
    IdTarea: 0
  }

  proyecto: Proyecto = {

    FechaInicio: new Date(Date.now()),
    Estado: true,
    Nombre: "",
    codigoProyecto: "",
    IdProyecto: 0,
  }

  tarea: Tarea = {

    IdTarea: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio: new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto: 0
  }

  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pservice: ProyectosserviceProvider, private tservice: TareasserviceProvider,
    private hservice: HorasserviceProvider, private toastCtrl: ToastController, private alertCtrl: AlertController) {

  }

  buscar(termino: string) {
    this.loading = true;
    this.horas = this.hservice.getHorasxTermino(termino);
  }

  IraHoradeTarea(idHora, ruta) {
    console.log(idHora);
    console.log(ruta);
    this.navCtrl.push(HoraPage, { IdHora: idHora, Ruta: ruta });
  }


  borrarHora(k: Number) {
    this.loading = true;
    let alert = this.alertCtrl.create({
      title: 'La hora cargada se eliminará, está seguro?',
      message: 'La hora no se podrá recuperar.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Si, confirmo!',
          handler: () => {
            //console.log('Buy clicked');
            this.hservice.eliminarHora(k)
              .subscribe(
                correcto => {
                  if (correcto) {
                    //vuelvo a cargar la lista
                    let toast = this.toastCtrl.create({
                      message: 'Hora Eliminada',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                      //console.log('Dismissed toast');
                    });
                    toast.present();

                    //alert("Hora Eliminada con exito");
                    this.horas = null;
                    this.listarHorasdeTarea();
                  }
                  else {
                    //alert("La Hora No Fue Eliminada");                                
                    this.status = 'error';
                    let toast = this.toastCtrl.create({
                      message: 'La Hora No Fue Eliminada',
                      duration: 3000,
                      position: 'middle'
                    });              
                    toast.onDidDismiss(() => {
                      //console.log('Dismissed toast');
                    });              
                    toast.present();
    
                  }
                }, (error) => {
                  //alert("La Hora No Fue Eliminada");            
                  this.status = 'error';
                  let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'middle'
                  });            
                  toast.onDidDismiss(() => {
                    //console.log('Dismissed toast');
                  });            
                  toast.present();    
                  //console.log(error);
                }
              )
          }
        }
      ]
    });
    alert.present();
  }

  listarHorasdeTarea() {

    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS      
    this.id = this.navParams.get('IdTarea');
    this.tarea = this.tservice.getTarea(this.id);

    //almaceno en localstorage para poder acceder desde una tarea nueva    
    localStorage.setItem('tarea', JSON.stringify(this.tarea));

    this.hservice.getHorasDeTarea(this.tarea)
      .subscribe(
        correcto => {
          if (correcto) {
            //vacio la lista de horas y la vuelvo a cargar
            this.horas = null;
            this.horas = correcto;
          }
          else {
            this.status = 'error';
            let toast = this.toastCtrl.create({
              message: 'No se pudieron listar las horas',
              duration: 3000,
              position: 'middle'
            });              
            toast.onDidDismiss(() => {
              //console.log('Dismissed toast');
            });              
            toast.present();
          }
        }, (error) => {
          this.status = 'error';
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'middle'
          });            
          toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
          });            
          toast.present();
          //console.log(error);
        }
      )
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {
    console.log('ionViewDidLoad HorasPage');
    this.listarHorasdeTarea();
  }

}
