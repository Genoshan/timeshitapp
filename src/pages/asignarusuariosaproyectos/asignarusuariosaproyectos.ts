import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../interfaces/usuario';
import { Proyecto } from '../../interfaces/proyecto';
import {ProyectosPage} from '../index.paginas'
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { UsuarioserviceProvider } from '../../providers/usuarioservice/usuarioservice';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';

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
    CodigoProyecto:"",    
    IdProyecto: 0,
  }

  proyectos:Proyecto[] = [];

  listausuariosaasignar:Usuario[]= [
    {
      nombre: "User1",
      ci: "11111111",
      email:"1@mail.com",
      img: "",
    },

    {
      nombre: "User2",
      ci: "2222222",
      email:"2@mail.com",
      img: "",
    },

    {
      nombre: "User3",
      ci: "33333333",
      email:"3@mail.com",
      img: "",
    },
  ];

  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private pservice: ProyectosserviceProvider, private uservice: UsuarioserviceProvider, 
    private toastCtrl: ToastController) {
  }

  IraProyectos() {
    //console.log(idProyecto);
    this.navCtrl.push(ProyectosPage);    
  }

  onProyectoChange(proy) {
    //console.log(proy);
    // this.proyecto = {

    //   Nombre:"",
    //   FechaInicio:new Date(Date.now()),
    //   Estado:true,
    //   CodigoProyecto:"",    
    //   IdProyecto: 0,
    // }

    let p = this.proyectos.find(x => x.IdProyecto===proy);
    //usuarios de muestra
    this.listausuariosaasignar= [
      {
        nombre: "User1",
        ci: "11111111",
        email:"1@mail.com",
        img: "",
      },
  
      {
        nombre: "User2",
        ci: "2222222",
        email:"2@mail.com",
        img: "",
      },
  
      {
        nombre: "User3",
        ci: "33333333",
        email:"3@mail.com",
        img: "",
      },
    ];
  
    

    this.useraasignar.ci = this.listausuariosaasignar[0].ci;
    this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;    

    //console.log(p.IdProyecto);


    //cuando tenga el listado de usuarios.

    // this.uservice.getUsuariosNoAsignadosDeProyecto(this.proyecto)
    //   .subscribe(
    //     correcto => {
    //       if (correcto) {
    //         //vacio las listas y las vuelvo a cargar.
    //         this.listausuariosaasignar = null;
    //         this.listausuariosaasignar = correcto;
    //         //selecciono el primero de la lista del proyecto cargado
    //         this.useraasignar.ci = this.listausuariosaasignar[0].ci;            
    //         //console.log(this.tareas);                            
    //       }
    //       else {
    //         this.status = 'error';
    //       }
    //     }, (error) => {
    //       this.status = 'error';
    //       let toast = this.toastCtrl.create({
    //         message: error,
    //         duration: 3000,
    //         position: 'top'
    //       });            
    //       toast.onDidDismiss(() => {
    //         //console.log('Dismissed toast');
    //       });            
    //       toast.present(); 
    //       //console.log(error);
    //     })
  }

  AsignarUsuarioAProyecto()
  {
    console.log(this.proyecto.IdProyecto);
    console.log(this.useraasignar.ci);

    this.uservice.asignarUsuarios(this.proyecto,this.useraasignar).subscribe(
      correcto => {
        if (correcto==="S") {
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
              //this.status = 'error';
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion + 'El usuario no fue asignado al proyecto',                
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

    // this.proyecto = {

    //   Nombre:"",
    //   FechaInicio:new Date(Date.now()),
    //   Estado:true,
    //   CodigoProyecto:"",    
    //   IdProyecto: 0,
    // }
            //LISTA PROYECTOS DEL USUARIO DESDE API
        this.user=JSON.parse(localStorage.getItem('usuario'));

            //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
            this.pservice.getProyectosUsuario(this.user["CI"])
            .subscribe(        
            correcto => { 
              if(correcto.RetornoCorrecto==="S")
            {              
              if(correcto.Retorno.length>0)
              {
                this.proyectos = correcto.Retorno;
                this.proyecto.IdProyecto = this.proyectos[0].IdProyecto; 
                
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
          //this.proyecto.CodigoProyecto = this.navParams.get('CodigoProyecto');

     //cargar usuarios en combo (que no esten asignado al proyecto)
     //usuarios de muestra
     //usuarios de muestra
    this.listausuariosaasignar= [
      {
        nombre: "User1",
        ci: "11111111",
        email:"1@mail.com",
        img: "",
      },
  
      {
        nombre: "User2",
        ci: "2222222",
        email:"2@mail.com",
        img: "",
      },
  
      {
        nombre: "User3",
        ci: "33333333",
        email:"3@mail.com",
        img: "",
      },
    ];


    this.useraasignar.ci = this.listausuariosaasignar[0].ci;
    // this.proyecto = this.proyectos[0];
    // this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;       
    console.log(this.proyecto.IdProyecto);
    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
  //   this.uservice.getUsuariosNoAsignadosDeProyecto(this.proyecto)
  //   .subscribe(        
  //   correcto => { 
  //     if(correcto)
  //     { 
  //       this.listausuariosaasignar = correcto;                 
  //     }
  //     else{
  //       this.status = 'error';          
  //       let toast = this.toastCtrl.create({
  //         message: 'Todos los usuarios estan asignados',
  //         duration: 3000,
  //         position: 'middle'
  //       });
  //       toast.onDidDismiss(() => {
  //         //console.log('Dismissed toast');
  //       });
  //       toast.present();             
  //     }
  // },(error) => {
  //   this.status = 'error';
  //   let toast = this.toastCtrl.create({
  //     message: error,
  //     duration: 3000,
  //     position: 'middle'
  //   });            
  //   toast.onDidDismiss(() => {
  //     //console.log('Dismissed toast');
  //   });            
  //   toast.present();

  //   //console.log(error);                    
  //   } 
  // )  
}
}


