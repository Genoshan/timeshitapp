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
    Nombre: "",
    Email: "",
    //password: string;
    Img: "",
    CI: ""
  };
  
  useraasignar: Usuario = {
    Nombre: "",
    Email: "",
    //password: string;
    Img: "",
    CI: ""
  };

  //idproy:string = "-1"; 
  proyecto:Proyecto = {

    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    CodigoProyecto:"",    
    IdProyecto: 0
  };

  proyectos:Proyecto[] = [];

  usuarios:Usuario[] = [];

  usuariosDeProyecto:Usuario[] = [];

  usuariosAAsignar:Usuario[] = [];

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

  onProyectoChange(IdProyecto) {
    this.proyecto = null;
    console.log(this.proyecto);
    this.proyecto = this.pservice.getProyecto(IdProyecto);
    console.log(this.proyecto);
    //OBTENGO TODOS LOS USUARIOS
    this.ListarUsuarios();

    //OBTENGO LOS USUARIOS DE PROYECTO
    this.ListarUsuariosdeProyecto(this.proyecto);

    //RECORRO TODOS LOS USUARIOS Y COMPARO LAS CI DE AQUELLOS QUE PERTENECEN AL PROYECTO DEJANDOLOS MARCADOS Y CARGO EN LA LISTA A GUARDAR
    this.usuarios = null;    
    this.usuariosDeProyecto = null;    

    this.usuarios = JSON.parse(localStorage.getItem('usuarios'));

    this.usuariosDeProyecto = JSON.parse(localStorage.getItem('usuariosDeProyecto'));

    this.listausuariosaasignar=this.usuarios;

    console.log(this.proyecto);


  }

  compareFn(u1, u2) {
    this.usuariosDeProyecto = this.usuariosDeProyecto = JSON.parse(localStorage.getItem('usuariosDeProyecto'));
    this.useraasignar=this.usuariosDeProyecto.find(u1 =>u1.Email === u2.Email);
    if (this.useraasignar!=null){
      return true;      
    } 
    else return false;
  }


  AsignarUsuarioAProyecto()
  {

    this.uservice.asignarUsuarios(this.proyecto,this.usuariosAAsignar).subscribe(
      correcto => {
        if (correcto==="S") {
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
                message: correcto.Mensaje +'-'+correcto.Descripcion + 'Los usuarios no fueron asignados al proyecto',                
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

ListarUsuariosdeProyecto(p:Proyecto)
{  

   //obtener los asignados a ese proyecto.
   this.uservice.getUsuariosDeProyecto(p)
   .subscribe(        
   correcto => { 
     
     if(correcto.RetornoCorrecto==="S")
   {              
     if(correcto.Retorno.length>0)
     {
       let users = [];
       
        correcto.Retorno.forEach(element => {
        
          let user1 : Usuario = {
            Nombre : element.Nombre,
            Email: element.Email,
            //password: string;
            Img: "",
            CI: element.CI  
          };
       
        users.push(user1);
        
      });
     
      this.usuariosDeProyecto = users;            
       localStorage.setItem('usuariosDeProyecto', JSON.stringify(this.usuariosDeProyecto));
     
     }
     else
     {
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
   else{
     //this.status = 'error';          
     let toast = this.toastCtrl.create({
       message: correcto.Mensaje +'-'+correcto.Descripcion+'-'+'No hay usuarios a listar',
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

ListarUsuarios(){

     //cargar todos los usuarios en combo
     this.uservice.getUsuarios()
            .subscribe(        
            correcto => { 
              //console.log(correcto);
              if(correcto.RetornoCorrecto==="S")
            {              
              if(correcto.Retorno.length>0)
              {
                let users = [];                
                //con esto cargo combo usuarios
                 correcto.Retorno.forEach(element => {
                  let user1 : Usuario = {
                    Nombre : element.Nombre,
                    Email: element.Email,
                    //password: string;
                    Img: "",
                    CI: element.CI  
                  };        
                
                users.push(user1);
                
                 });
                
                this.usuarios = users;                
                
                localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
                
              }
              else
              {
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
            else{
              //this.status = 'error';          
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion+'-'+'No hay usuarios a listar',
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

          } 
          )    
}

  ionViewDidLoad() {
    //cargar proyectos en combo
      //LISTA PROYECTOS DEL USUARIO DESDE API
      let idproy=-1;

        this.user=JSON.parse(localStorage.getItem('usuario'));

            //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
            this.pservice.getProyectosUsuario(this.user["CI"]).subscribe(        
            correcto => {              

              if(correcto.RetornoCorrecto==="S")
            {              
              if(correcto.Retorno.length>0)
              {                
                this.proyectos = correcto.Retorno;
                this.proyecto = this.proyectos[0];

                //OBTENGO TODOS LOS USUARIOS
                this.ListarUsuarios();

                //OBTENGO LOS USUARIOS DE PROYECTO
                this.ListarUsuariosdeProyecto(this.proyecto);                
                 
                //RECORRO TODOS LOS USUARIOS Y COMPARO LAS CI DE AQUELLOS QUE PERTENECEN AL PROYECTO DEJANDOLOS MARCADOS Y CARGO EN LA LISTA A GUARDAR
                this.usuarios = null;    
                this.usuariosDeProyecto = null;    
                

                this.usuarios = JSON.parse(localStorage.getItem('usuarios'));

                

                this.usuariosDeProyecto = JSON.parse(localStorage.getItem('usuariosDeProyecto'));
                this.listausuariosaasignar=this.usuarios;    
                                                  
              }
              else
              {
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
            }
            else{
              //this.status = 'error';          
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion+'-'+'No tiene proyectos asignados',
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


