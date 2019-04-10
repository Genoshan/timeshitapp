import { Proyecto } from './../../interfaces/proyecto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario';
import { ProyectosPage } from '../index.paginas'
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
    Nombre: "",
    Email: "",
    Clave: "",
    oCompany: -1,
    Administrador: false,
    Img: "",
    CI: ""

  };

  proyecto: Proyecto = {

    Nombre: "",
    FechaInicio: new Date(Date.now()),
    Estado: true,
    CodigoProyecto: "",
    IdProyecto: 0
  };

  proyectos: Proyecto[] = [];

  usuarios: Usuario[] = [];

  usuariosDeProyecto: Usuario[] = [];

  usuariosAAsignar: Usuario[] = [];

  listausuariosaasignar: Usuario[] = [];

  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pservice: ProyectosserviceProvider, private uservice: UsuarioserviceProvider,
    private toastCtrl: ToastController) {
  }

  IraProyectos() {
    //console.log(idProyecto);
    this.navCtrl.push(ProyectosPage);
  }

  onProyectoChange(IdProyecto) {
    let usersdelproy: Usuario []=[];
    this.proyecto = null;

    this.proyecto = this.proyectos.find(p => p.IdProyecto == IdProyecto);
    //console.log(this.proyecto);
    //OBTENGO TODOS LOS USUARIOS
    this.usuarios = this.ListarUsuarios();
    //OBTENGO LOS USUARIOS DE PROYECTO
    usersdelproy = this.ListarUsuariosdeProyecto(this.proyecto);
    console.log(usersdelproy);

    if (true) {  
      console.log("entra2"); 
      usersdelproy.forEach(e => {        
        this.compareUsuarios(e);
        console.log("comparo");
      });
    }
  }


  AsignarUsuarioAProyecto() {
    this.uservice.asignarUsuarios(this.proyecto, this.usuariosAAsignar).subscribe(
      correcto => {
        if (correcto === "S") {
          let toast = this.toastCtrl.create({
            message: 'Usuarios asignados!',
            duration: 3000,
            position: 'top'
          });

          toast.onDidDismiss(() => {
          });

          toast.present();
          this.IraProyectos();
        }
        else {
          let toast = this.toastCtrl.create({
            message: correcto.Mensaje + '-' + correcto.Descripcion + 'Los usuarios no fueron asignados al proyecto',
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
          //console.log('Dismissed toast');
        });
        toast.present();
      }
    )
  }

  ListarUsuariosdeProyecto(p: Proyecto):Usuario[] {
    let users : Usuario[]=[];
    //obtener los asignados a ese proyecto.
    this.uservice.getUsuariosDeProyecto(p)
      .subscribe(
        correcto => {

          if (correcto.RetornoCorrecto === "S") {
            if (correcto.Retorno.length > 0) {
              correcto.Retorno.forEach(element => {
                let user1: Usuario = {
                  Nombre: element.Nombre,
                  Email: element.Email,
                  Clave: element.Clave,
                  oCompany: element.oCompany,
                  //password: string;
                  Administrador: element.Administrador,
                  Img: "",
                  CI: element.CI
                };
                users.push(user1);
              });
              //this.usuariosDeProyecto = users;            
              //localStorage.setItem('usuariosDeProyecto', JSON.stringify(users));
            }
            else {
              let toast = this.toastCtrl.create({
                message: 'No hay usuarios para listar',
                duration: 3000,
                position: 'middle'
              });
              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });
              toast.present();
            }
          }
          else {
            //this.status = 'error';          
            let toast = this.toastCtrl.create({
              message: correcto.Mensaje + '-' + correcto.Descripcion + '-' + 'No hay usuarios a listar',
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
      return users;
  }

  ListarUsuarios(): Usuario[] {
    let users : Usuario[]=[];
    //cargar todos los usuarios en combo
    this.uservice.getUsuarios()
      .subscribe(
        correcto => {
          //console.log(correcto);
          if (correcto.RetornoCorrecto === "S") {
            if (correcto.Retorno.length > 0) {
              //con esto cargo combo usuarios
              correcto.Retorno.forEach(element => {
                let user1: Usuario = {
                  Nombre: element.Nombre,
                  Email: element.Email,
                  Clave: element.Clave,
                  oCompany: element.oCompany,
                  Administrador: element.Administrador,
                  Img: "",
                  CI: element.CI
                };
                users.push(user1);
              });
              //localStorage.setItem('usuarios', JSON.stringify(users));                
            }
            else {
              let toast = this.toastCtrl.create({
                message: 'No hay usuarios para listar',
                duration: 3000,
                position: 'middle'
              });
              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });
              toast.present();
            }
          }
          else {
            //this.status = 'error';          
            let toast = this.toastCtrl.create({
              message: correcto.Mensaje + '-' + correcto.Descripcion + '-' + 'No hay usuarios a listar',
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

        }
      )
      return users;
  }

  compareUsuarios(userdeproyecto) {
    let user : Usuario;    
    console.log(this.usuarios);
    if (this.usuarios != null) {
      user = this.usuarios.find(u => u.Email === userdeproyecto.Email);
      if (user != null) {
        return true;
      }
      else 
        return false;
    }
    else 
      return false;

    // this.useraasignar=this.usuariosDeProyecto.find(u1 =>u1.Email === u2.Email);
    // if (this.useraasignar!=null){
    //   return true;      
    // } 
    // else return false;
  }

  compareProyectos(p1: Proyecto, p2: Proyecto): boolean {
    return p1 && p2 ? p1.IdProyecto === p2.IdProyecto : p1 === p2;
  }

  ListarProyectos():Proyecto[] {
    let proy = [];
    this.pservice.getProyectos().subscribe(
      correcto => {

        if (correcto.RetornoCorrecto === "S") {
          if (correcto.Retorno.length > 0) {
            this.proyectos = correcto.Retorno;
            this.proyecto = this.proyectos[0];
          }
          else {
            let toast = this.toastCtrl.create({
              message: 'No hay proyectos',
              duration: 3000,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
            });
            toast.present();
          }
        }
        else {     
          let toast = this.toastCtrl.create({
            message: correcto.Mensaje + '-' + correcto.Descripcion + '-' + 'No hay proyectos',
            duration: 3000,
            position: 'middle'
          });
          toast.onDidDismiss(() => {
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
        });
        toast.present();                 
      }
    )
    return proy;
  }

  ionViewDidLoad() {
    //cargar proyectos en combo
    //LISTA PROYECTOS DEL USUARIO DESDE API      
    this.proyectos = this.ListarProyectos();
  }
}


