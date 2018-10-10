import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario';
import { Proyecto } from '../../interfaces/proyecto';
import {ProyectosPage} from '../index.paginas'
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { UsuarioserviceProvider } from '../../providers/usuarioservice/usuarioservice';

/**
 * Generated class for the AsignarusuariosaproyectosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asignarusuariosaproyectos',
  templateUrl: 'asignarusuariosaproyectos.html',
})
export class AsignarusuariosaproyectosPage {

  user: Usuario = {
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  };
  
  useraasignar: Usuario = {
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  };

  proyecto:Proyecto = {

    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    codigoProyecto:"",    
    IdProyecto: 0,
  }

  proyectos:Proyecto[] = [];
  listausuariosaasignar:Usuario[]= [];
  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private pservice: ProyectosserviceProvider, private uservice: UsuarioserviceProvider, 
    private toastCtrl: ToastController) {
  }

  IraProyectos() {
    //console.log(idProyecto);
    this.navCtrl.push(ProyectosPage);    
  }

  onProyectoChange() {
    //console.log(this.tarea.IdProyecto);

    this.uservice.getUsuariosNoAsignadosDeProyecto(this.proyecto)
      .subscribe(
        correcto => {
          if (correcto) {
            //vacio las tareas y las vuelvo a cargar.
            this.listausuariosaasignar = null;
            this.listausuariosaasignar = correcto;
            //selecciono la primer tarea de la lista del proyecto cargado
            this.useraasignar.ci = this.listausuariosaasignar[0].ci;            
            //console.log(this.tareas);                            
          }
          else {
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
            //console.log('Dismissed toast');
          });            
          toast.present(); 
          //console.log(error);
        })
  }

  AsignarUsuarioAProyecto()
  {
    this.uservice.asignarUsuarios(this.proyecto,this.useraasignar).subscribe(
      correcto => {
        if (correcto) {
          //console.log(JSON.parse(localStorage.getItem("usuario")));
          //this.proyectos = JSON.parse(correcto.proyectos);              
              let toast = this.toastCtrl.create({
                message: 'Usuario asignado!',
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });

              toast.present();
              //alert("Tarea Creada con exito");
              this.IraProyectos();

              //console.log(this.tareas);
            }
            else {
              this.status = 'error';
              let toast = this.toastCtrl.create({
                message: 'El usuario no fue asignado al proyecto',                
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

  ionViewDidLoad() {
    //cargar proyectos en combo
            //LISTA PROYECTOS DEL USUARIO DESDE API
        this.user=JSON.parse(localStorage.getItem('usuario'));

            //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
            this.pservice.getProyectosUsuario(this.user["CI"])
            .subscribe(        
            correcto => { 
              if(correcto)
              {
                this.proyectos = correcto;
                this.proyecto=this.proyectos[0];                 
              }
              else{
                this.status = 'error';          
                let toast = this.toastCtrl.create({
                  message: 'No tiene proyectos asignados',
                  duration: 3000,
                  position: 'middle'
                });
                toast.onDidDismiss(() => {
                  //console.log('Dismissed toast');
                });
                toast.present();             
              }
          },(error) => {
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
          //this.proyecto.codigoProyecto = this.navParams.get('codigoProyecto');        
    

     //cargar usuarios en combo (que no esten asignado al proyecto)
    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
    this.uservice.getUsuariosNoAsignadosDeProyecto(this.proyecto)
    .subscribe(        
    correcto => { 
      if(correcto)
      { 
        this.listausuariosaasignar = correcto;                 
      }
      else{
        this.status = 'error';          
        let toast = this.toastCtrl.create({
          message: 'Todos los usuarios estan asignados',
          duration: 3000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {
          //console.log('Dismissed toast');
        });
        toast.present();             
      }
  },(error) => {
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


