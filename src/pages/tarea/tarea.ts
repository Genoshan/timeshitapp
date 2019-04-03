import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Proyecto } from '../../interfaces/proyecto';
import { Tarea } from '../../interfaces/tarea';
import { Usuario } from '../../interfaces/usuario';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { TareasserviceProvider } from '../../providers/tareasservice/tareasservice';
import { TareasPage } from '../index.paginas';


@IonicPage()
@Component({
  selector: 'page-tarea',
  templateUrl: 'tarea.html',
})
export class TareaPage {



  /*****ATRIBUTOS******/

  nuevo: boolean = false;
  id: string;
  proyectos: Proyecto[] = [];

  tarea: Tarea = {

    IdTarea: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio: new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto: 0
  }

  user: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    oCompany: -1,
    Administrador: false,
    Img: "",
    CI: ""
  }

  proyecto: Proyecto = {
    Nombre: "",
    FechaInicio: new Date(Date.now()),
    Estado: true,
    CodigoProyecto: "",
    IdProyecto: 0,
  }

  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ts: TareasserviceProvider, private pr: ProyectosserviceProvider, private toastCtrl: ToastController) {
  }


  /*****OPERACIONES*****/
  IraTareas(idProyecto) {
    console.log(idProyecto);
    this.navCtrl.push(TareasPage, { IdProyecto: idProyecto });
  }


  getTarea() {

    if (this.id == null) {
      //console.log(this.proyecto);
      this.tarea.IdProyecto = this.proyecto.IdProyecto;
    }
    else {
      this.tarea = this.ts.getTarea(Number(this.id));
      //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
      this.proyecto = this.pr.getProyecto(this.tarea.IdProyecto);
    }
  }


  crearTareas() {
    if (this.id == null) {
      // insertando    
      this.ts.crearTareas(this.tarea)
        .subscribe(
          correcto => {
            console.log(correcto);
            if (correcto==="S") {
              //this.proyectos = JSON.parse(correcto.proyectos);
              //this.tarea = correcto;
              let toast = this.toastCtrl.create({
                message: 'Tarea Guardada con exito',
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });

              toast.present();
              //alert("Tarea Creada con exito");
              this.IraTareas(this.tarea.IdProyecto);

              //console.log(this.tareas);
            }
            else {
              this.status = 'error';
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });

              toast.present();
              //alert("La Hora No fue Guardada");
              this.status = 'error';

              //alert('El usuario no esta');
            }
          }, (error) => {
            this.status = 'error';
            let toast = this.toastCtrl.create({
              message: error,
              duration: 3000,
              position: 'top'
            });
            toast.onDidDismiss(() => {
              //console.log('Dismissed toast');
            });
            toast.present();
          }
        )
    }
    else {
      //actualizando
      this.ts.editarTarea(this.tarea)
        .subscribe(
          correcto => {
            if (correcto.RetornoCorrecto==="S") {
              //this.proyectos = JSON.parse(correcto.proyectos);
              //this.tarea = correcto;
              //alert("Tarea Editada con exito");
              let toast = this.toastCtrl.create({
                message: 'Tarea Editada con exito',
                duration: 3000,
                position: 'top'
              });              
              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });             
              toast.present();                    
              this.IraTareas(this.tarea.IdProyecto);
              //console.log(this.tareas);
            }
            else {
              this.status = 'error';              
              //alert("Tarea No Fue Editada");
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
                duration: 3000,
                position: 'top'
              });              
              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });              
              toast.present();    
              this.status = 'error';

              //alert('El usuario no esta');
            }
          }, (error) => {
            this.status = 'error';
            let toast = this.toastCtrl.create({
              message: error,
              duration: 3000,
              position: 'top'
            });
            toast.onDidDismiss(() => {
              //console.log('Dismissed toast');
            });
            toast.present();
          }
        )

    }
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {

    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.proyecto = JSON.parse(localStorage.getItem('proyecto'));
    this.id = this.navParams.get('IdTarea');
    //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA  
    this.getTarea();
    this.proyectos.push(this.proyecto);
  }

}
