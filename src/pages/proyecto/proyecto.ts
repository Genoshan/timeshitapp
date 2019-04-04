import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Proyecto } from '../../interfaces/proyecto';
import { Usuario } from '../../interfaces/usuario';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { ProyectosPage } from '../index.paginas';


/**
 * Generated class for the ProyectoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proyecto',
  templateUrl: 'proyecto.html',
})
export class ProyectoPage {


    /*****ATRIBUTOS******/

    nuevo: boolean = false;
    id: string;
  
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private pr: ProyectosserviceProvider, private toastCtrl: ToastController) {
  }

  IraProyectos() {
    //console.log(idProyecto);
    this.navCtrl.push(ProyectosPage, { });
  }

  getProyecto() {

    if (this.id == null) {
      //console.log(this.id);
      //this.proyecto.IdProyecto = this.proyecto.IdProyecto;
    }
    else {
      //console.log(this.id);
      this.proyecto = this.pr.getProyecto(Number(this.id));      
    }
  }


  crearProyectos() {
    if (this.id == null) {
      // insertando    
      this.pr.crearProyectos(this.proyecto, this.user)
        .subscribe(
          correcto => {
            if (correcto.RetornoCorrecto==="S") {
              let toast = this.toastCtrl.create({
                message: 'Proyecto Guardado con exito',
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
              });

              toast.present();              
              this.IraProyectos();

            }
            else {
              this.status = 'error';
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {                
              });

              toast.present();
              this.status = 'error';
            }
          }, (error) => {
            this.status = 'error';
            let toast = this.toastCtrl.create({
              message: error,
              duration: 3000,
              position: 'top'
            });
            toast.onDidDismiss(() => {
            });
            toast.present();
          }
        )
    }
    else {
      //actualizando
      this.pr.editarProyecto(this.proyecto,this.user)
        .subscribe(
          correcto => {
            if (correcto.RetornoCorrecto==="S") {
              let toast = this.toastCtrl.create({
                message: 'Proyecto Editado con exito',
                duration: 3000,
                position: 'top'
              });              
              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });             
              toast.present();                    
              this.IraProyectos();
            }
            else {
              this.status = 'error';              
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
                duration: 3000,
                position: 'top'
              });              
              toast.onDidDismiss(() => {
              });              
              toast.present();    
              this.status = 'error';
            }
          }, (error) => {
            this.status = 'error';
            let toast = this.toastCtrl.create({
              message: error,
              duration: 3000,
              position: 'top'
            });
            toast.onDidDismiss(() => {
            });
            toast.present();
          }
        )
    }
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {

    this.user = JSON.parse(localStorage.getItem('usuario'));

    // this.user.CI = JSON.parse(localStorage.getItem("usuario"))["CI"];
    // this.user.Email = JSON.parse(localStorage.getItem("usuario"))["Email"];
    // this.user.Img = JSON.parse(localStorage.getItem("usuario"))["Img"];
    // this.user.Nombre = JSON.parse(localStorage.getItem("usuario"))["Nombre"];
    // this.user.Clave = JSON.parse(localStorage.getItem("usuario"))["Clave"];
    // this.user.oCompany = JSON.parse(localStorage.getItem("usuario"))["oCompany"];
    // this.user.Administrador = JSON.parse(localStorage.getItem("usuario"))["Administrador"];

    //this.proyecto = JSON.parse(localStorage.getItem('proyecto'));
    this.id = this.navParams.get('IdProyecto');    
    this.getProyecto();
    //this.proyectos.push(this.proyecto);
  }
}
