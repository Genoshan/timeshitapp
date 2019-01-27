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

  proyecto:Proyecto = {

    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    CodigoProyecto:"",    
    IdProyecto: 0,
  }

  proyectos:Proyecto[] = [];

  usuarios:Usuario[] = [];

  usuariosDeProyecto:Usuario[] = [];

  usuariosAAsignar:Usuario[] = [];

  listausuariosaasignar:Usuario[]= [
    
      {
        Nombre: "Diego Vargas",
        CI: "11111111",
        Email:"1@mail.com",
        Img: "",
      },
  
      {
        Nombre: "Martin Castro",
        CI: "2222222",
        Email:"2@mail.com",
        Img: "",
      },
  
      {
        Nombre: "Rodrigo Gallardo",
        CI: "33333333",
        Email:"3@mail.com",
        Img: "",
      },

      {
        Nombre: "Julio Ruiz",
        CI: "44444444",
        Email:"4@mail.com",
        Img: "",
      },

      {
        Nombre: "Juan Dura",
        CI: "55555555",
        Email:"5@mail.com",
        Img: "",
      },

      {
        Nombre: "Alex Rostan",
        CI: "66666666",
        Email:"6@mail.com",
        Img: "",
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

    //BUSCO EN EL COMBO DE PROYECTO EL PROYECTO SEGUN SU ID
    let p = this.proyectos.find(x => x.IdProyecto===proy);
    //usuarios de muestra
    this.listausuariosaasignar= [
      {
        Nombre: "Diego Vargas",
        CI: "11111111",
        Email:"1@mail.com",
        Img: "",
      },
  
      {
        Nombre: "Martin Castro",
        CI: "2222222",
        Email:"2@mail.com",
        Img: "",
      },
  
      {
        Nombre: "Rodrigo Gallardo",
        CI: "33333333",
        Email:"3@mail.com",
        Img: "",
      },

      {
        Nombre: "Julio Ruiz",
        CI: "44444444",
        Email:"4@mail.com",
        Img: "",
      },

      {
        Nombre: "Juan Dura",
        CI: "55555555",
        Email:"5@mail.com",
        Img: "",
      },

      {
        Nombre: "Alex Rostan",
        CI: "66666666",
        Email:"6@mail.com",
        Img: "",
      },
    ];
  
    //DADO EL PROYECTO CAMBIADO MARCO LOS USUARIOS QUE ESTAN ASIGNADOS ACTUALMENTE
    this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;    

    //obtengo los usuarios
     this.uservice.getUsuarios()
            .subscribe(        
            correcto => { 
              if(correcto.RetornoCorrecto==="S")
            {              
              if(correcto.Retorno.length>0)
              {
                //con esto cargo combo usuarios
                this.usuarios = correcto.Retorno;                
                //this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;                 
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
          
     //y obtener los asignados a ese proyecto.
     this.uservice.getUsuariosDeProyecto(this.proyecto)
            .subscribe(        
            correcto => { 
              if(correcto.RetornoCorrecto==="S")
            {              
              if(correcto.Retorno.length>0)
              {
                //con esto cargo combo usuarios
                this.usuariosDeProyecto = correcto.Retorno;                
                //this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;                 
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

          
     this.usuarios.forEach(u => { 
       console.log(u.CI);
       this.useraasignar.CI = this.usuariosDeProyecto.find(x => x.CI == u.CI).CI;       
     });

        //FORMA ANTERIOR
    //this.useraasignar.CI = this.listausuariosaasignar[0].CI;

    //cuando tenga el listado de usuarios.

    // this.uservice.getUsuariosNoAsignadosDeProyecto(this.proyecto)
    //   .subscribe(
    //     correcto => {
    //       if (correcto) { //cargar todos los usuarios en combo 
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
    //console.log(this.proyecto.IdProyecto);
    //console.log(this.useraasignar.CI);
    

    this.uservice.asignarUsuarios(this.proyecto,this.usuariosAAsignar).subscribe(
      correcto => {
        if (correcto==="S") {
          //console.log(JSON.parse(localStorage.getItem("usuario")));
          //this.proyectos = JSON.parse(correcto.proyectos);              
              let toast = this.toastCtrl.create({
                message: 'Usuarios asignados!',
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
                message: correcto.Mensaje +'-'+correcto.Descripcion + 'Los usuarios no fueron asignados al proyecto',                
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
              console.log(correcto);
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

     //cargar todos los usuarios en combo
     this.uservice.getUsuarios()
            .subscribe(        
            correcto => { 
              console.log(correcto);
              if(correcto.RetornoCorrecto==="S")
            {              
              if(correcto.Retorno.length>0)
              {
                //con esto cargo combo usuarios
                this.usuarios = correcto.Retorno;
                console.log(this.usuarios);                
                //this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;                 
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
          
     //y obtener los asignados a ese proyecto.
     this.uservice.getUsuariosDeProyecto(this.proyecto)
            .subscribe(        
            correcto => { 
              console.log(correcto);
              if(correcto.RetornoCorrecto==="S")
            {              
              if(correcto.Retorno.length>0)
              {
                //con esto cargo combo usuarios
                this.usuariosDeProyecto = correcto.Retorno;                
                //this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;                 
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

          
     this.usuarios.forEach(u => { 
       console.log(u.CI);
       this.useraasignar.CI = this.usuariosDeProyecto.find(x => x.CI == u.CI).CI;       
     });

    //this.useraasignar.ci = this.listausuariosaasignar[0].ci;
    // this.proyecto = this.proyectos[0];
    // this.proyecto.IdProyecto = this.proyectos[0].IdProyecto;       
    //console.log(this.proyecto.IdProyecto);
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


