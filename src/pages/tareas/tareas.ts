import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Tarea } from '../../interfaces/tarea';
import { Proyecto } from '../../interfaces/proyecto';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { TareasserviceProvider } from '../../providers/tareasservice/tareasservice';
import { TareaPage } from '../tarea/tarea';
import { HoraPage } from '../hora/hora';
import { HorasPage } from '../horas/horas';

/**
 * Generated class for the TareasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tareas',
  templateUrl: 'tareas.html',
})
export class TareasPage {

  p: number = 1;
  tareas: Tarea[] = [];
  id: number;
  loading: boolean;

  proyecto: Proyecto = {

    Nombre: "",
    FechaInicio: new Date(Date.now()),
    Estado: true,
    CodigoProyecto: "",
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
    private pservice: ProyectosserviceProvider, private tservice: TareasserviceProvider, private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }

  buscar(termino: string) {
    this.loading = true;
    this.tareas = this.tservice.getTareasxTermino(termino);
  }

  IraTareadeProyecto(idTarea) {
    this.navCtrl.push(TareaPage, { IdTarea: idTarea });
  }

  IraHorasdeTarea(idTarea) {
    this.navCtrl.push(HorasPage, { IdTarea: idTarea });
  }

  IraHoradeTarea(idHora, ruta) {
    this.navCtrl.push(HoraPage, { IdHora: idHora, Ruta: ruta });
  }


  Volver() {
    this.navCtrl.pop();
  }


  listarTareasDeProyecto() {

    //OBTENGO EL PROYECTO        
    this.id = this.navParams.get('IdProyecto');

    this.proyecto = this.pservice.getProyecto(this.id);

    //almaceno en localstorage para poder acceder desde una tarea nueva    
    localStorage.setItem('proyecto', JSON.stringify(this.proyecto));

    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
    this.tservice.getTareasDeProyecto(this.id)
      .subscribe(
        correcto => {
          console.log(correcto);
          if(correcto.RetornoCorrecto==="S")
            { 
              if(correcto.Retorno.length>0){
                //console.log(correcto);
                //vacio las tareas y las vuelvo a cargar.
                this.tareas = null;
                this.tareas = correcto.Retorno;                      
              }
              else{
                let toast = this.toastCtrl.create({
                  message: 'No tiene tareas asignadas',
                  duration: 3000,
                  position: 'middle'
                });
                toast.onDidDismiss(() => {                  
                });
                toast.present();  
              }                           
            }
            else
            {              
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
                duration: 3000,
                position: 'middle'
              });
              toast.onDidDismiss(() => {                
              });
              toast.present();             
            }     
         }
         )
  }




  borrarTarea(k: Number) {
    
    let alert = this.alertCtrl.create({
      title: 'La tarea se eliminará, está seguro?',
      message: 'La tarea no se podrá recuperar.',
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
            this.tservice.eliminarTarea(k)
              .subscribe(
                correcto => {
                  console.log(correcto);
                  if (correcto==="S") {
                    //vuelvo a cargar la lista
                    let toast = this.toastCtrl.create({
                      message: 'Tarea Eliminada',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                      //console.log('Dismissed toast');
                    });
                    toast.present();

                    this.tareas = null;
                    this.listarTareasDeProyecto();

                  }
                  else {
                    //alert("La tarea No Fue Eliminada");                                
                    this.status = 'error';
                    let toast = this.toastCtrl.create({
                      message: correcto.Mensaje +'-'+correcto.Descripcion,
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                      //console.log('Dismissed toast');
                    });
                    toast.present();

                  }
                }, (error) => {
                  //alert("La tarea No Fue Eliminada");            
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

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {
    //console.log('ionViewDidLoad TareasPage');
    this.listarTareasDeProyecto();
  }

}
