import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Proyecto } from '../../interfaces/proyecto';
import { Tarea } from '../../interfaces/tarea';
import { Usuario } from '../../interfaces/usuario';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { TareasserviceProvider } from '../../providers/tareasservice/tareasservice';
import { HorasPage } from '../index.paginas';
import { Hora } from '../../interfaces/hora';
import { HorasserviceProvider } from '../../providers/horasservice/horasservice';



/**
 * Generated class for the HoraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hora',
  templateUrl: 'hora.html',
})
export class HoraPage {

  /*****ATRIBUTOS******/

  nuevo: boolean = false;
  id: string;
  ruta: string;

  proyectos: Proyecto[] = [];
  tareas: Tarea[] = [];

  user: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    oCompany: -1,
    Administrador: false,
    Img: "",
    CI: ""
  }

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
    private pr: ProyectosserviceProvider, private ts: TareasserviceProvider, 
    private hs: HorasserviceProvider, private toastCtrl: ToastController) 
    {
    this.id = navParams.get('IdHora');
    this.ruta = navParams.get('Ruta');
  }

  /*****OPERACIONES*****/
  IraHoras(idTarea) {

    this.navCtrl.push(HorasPage, { IdTarea: idTarea });
  }

  getHora() {
    
    //FLUJO NORMAL: LLEGO NAVEGANDO DESDE PROYECTO Y DE UNA TAREA Y VEO LAS HORAS CARGADAS y cargo una nueva
    if (this.ruta == '/horas/' && this.id == 'nueva') {
      //FLUJO NORMAL: LLEGO NAVEGANDO DESDE PROYECTO Y DE UNA TAREA Y VEO LAS HORAS CARGADAS
      //OBTENGO, USUARIO, TAREA Y PROYECTO POR EL CUAL LLEGO DE LA NAVEGACION DEL LOCALSTORAGE    
      this.tarea = JSON.parse(localStorage.getItem('tarea'));
      this.proyecto = JSON.parse(localStorage.getItem('proyecto'));

      //Agrego la tarea y el proyecto a las listas locales de proyecto y tarea obtenidos por los servicios a cada combo

      this.proyectos.push(this.proyecto);
      this.tareas.push(this.tarea);


      //OBTENGO LA TAREA      
      this.hora.IdTarea = this.tarea.IdTarea;
      this.tarea.IdProyecto = this.proyecto.IdProyecto;

      //OBTENGO EL PROYECTO
      this.proyecto = this.pr.getProyecto(Number(this.tarea.IdProyecto));
    }
    else {

      //CONTROL DESDE DONDE ESTOY ACCEDIENDO    
      //SI ES DESDE TAREAS (ICONO + EN CADA TAREA)
      if ((this.ruta == '/horas/tarea/') && this.id != 'nueva') {
        
        //console.log("QuieroCargarHsDesdeUnaTareaDeGrillaDeTareas");
        
        //OBTENGO LA TAREA            
        this.tarea = this.ts.getTarea(Number(this.id));
        //GUARDO TAREA EN EL STORAGE       
        localStorage.setItem('tarea', JSON.stringify(this.tarea));

        this.tarea = JSON.parse(localStorage.getItem('tarea'));
        //OBTENGO EL PROYECTO DE LA TAREA
        this.proyecto = this.pr.getProyecto(Number(this.tarea.IdProyecto));
        //GUARDO PROYECTO EN EL STORAGE       
        localStorage.setItem('proyecto', JSON.stringify(this.proyecto));
        //cargo listas locales para los combos:
        this.proyectos.push(this.proyecto);
        this.tareas.push(this.tarea);

        //ASIGNO IDTAREA DE HORA A CREAR
        //OBTENGO LA TAREA      
        this.hora.IdTarea = this.tarea.IdTarea;
        this.tarea.IdProyecto = this.proyecto.IdProyecto;
        this.hora.IdTarea = this.tarea.IdTarea;
      }

      else {
        //CONTROL DESDE DONDE ESTOY ACCEDIENDO    
        //SI ES DESDE TAREAS (ICONO + GRANDE)  
        if (this.ruta == '/horas/tarea/' && this.id == 'nueva') {

          //console.log("QuieroCargarHsDesdeBotonGrandeDeCargarHsDeTareas");
          //OBTENGO EL PROYECTO
          this.proyecto = JSON.parse(localStorage.getItem('proyecto'));
          this.proyectos.push(this.proyecto);

          //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
          this.ts.getTareasDeProyecto(Number(this.proyecto.IdProyecto))
            .subscribe(
              correcto => {
                console.log(correcto);
                if (correcto.RetornoCorrecto==="S") {
                  if(correcto.Retorno.length>0)
                  {
                    //vacio las tareas y las vuelvo a cargar.
                  this.tareas = null;
                  this.tareas = correcto.Retorno;
                  //OBTENGO LA TAREA      
                  this.hora.IdTarea = this.tareas[0].IdTarea;
                  this.tarea.IdProyecto = this.tareas[0].IdProyecto;
                  //console.log(this.tareas);
                  }
                  else
                  {
                    this.status = 'error';
              let toast = this.toastCtrl.create({
                message: 'No hay tareas cargadas',
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
                this.status = 'error';
                //console.log(error);
                let toast = this.toastCtrl.create({
                  message: error,
                  duration: 3000,
                  position: 'top'
                });            
                toast.onDidDismiss(() => {
                  //console.log('Dismissed toast');
                });            
                toast.present(); 
              })

          //OBTENGO LA TAREA      
          //this.hora.IdTarea = this.tarea.IdTarea;           
          //this.tarea.IdProyecto = this.proyecto.IdProyecto;

        }
        else {
          //CARGANDO HORAS DESDE UN PROYECTO dado boton +
          if ((this.ruta == '/horas/proyecto/') && this.id != 'nueva') {

            //console.log("QuieroCargarHsDesdeUnProyectoDeGrillaDeProyectos");

            //OBTENGO EL PROYECTO:        
            this.proyecto = this.pr.getProyecto(Number(this.id));
            this.proyectos.push(this.proyecto);
            //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
            this.ts.getTareasDeProyecto(Number(this.proyecto.IdProyecto))
              .subscribe(
                correcto => {
                  console.log(correcto);
                  if (correcto.RetornoCorrecto==="S") {

                    if(correcto.Retorno.length>0)
                    {
                      //vacio las tareas y las vuelvo a cargar.
                    this.tareas = null;
                    this.tareas = correcto.Retorno;
                    //OBTENGO LA TAREA      
                    this.hora.IdTarea = this.tareas[0].IdTarea;
                    this.tarea.IdProyecto = this.tareas[0].IdProyecto;
                    //console.log(this.tareas);                      
                    }
                    else
                    {
                      this.status = 'error';
              let toast = this.toastCtrl.create({
                message: 'No hay tareas cargadas',
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
                  this.status = 'error';
                  //console.log(error);
                  let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'top'
                  });            
                  toast.onDidDismiss(() => {
                    //console.log('Dismissed toast');
                  });            
                  toast.present(); 
                })

            //OBTENGO LA TAREA      
            //this.hora.IdTarea = this.tarea.IdTarea;           
            //this.tarea.IdProyecto = this.proyecto.IdProyecto;      

          }
          else {

            //CARGANDO HORAS DESDE PROYECTOS BOTON GRANDE+  
            if (this.ruta == '/horas/proyecto/' && this.id == 'nueva') {

              //console.log("QuieroCargarHsDesdeBotonGrandeDeCargarHsDeProyectos");
              //listo todos los proyectos del usuario --
              //LISTA PROYECTOS DEL USUARIO DESDE API
              this.user = JSON.parse(localStorage.getItem('usuario'));
              //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
              this.pr.getProyectosUsuario(this.user["CI"])
                .subscribe(
                  correcto => {
                    // console.log("//LISTANDO PRYECTOS BOTON GRANDE+  ");
                    // console.log(correcto);
                    if (correcto.RetornoCorrecto==="S") 
                    {

                      if(correcto.Retorno.length>0)
                      {
                        //vacio los proyectos y los vuelvo a cargar.
                      this.proyectos = null;
                      this.proyectos = correcto.Retorno;
                      //para la primer carga queda el primer proyecto seleccionado
                      this.tarea.IdProyecto = this.proyectos[0].IdProyecto;

                      this.ts.getTareasDeProyecto(Number(this.tarea.IdProyecto))
                        .subscribe(
                          correcto => {
                            // console.log("//LISTANDO TAREAS DESDE PROYECTOS BOTON GRANDE+  ");
                            // console.log(correcto);
                            if (correcto.RetornoCorrecto==="S") {
                              if(correcto.Retorno.length>0)
                              {
                                //vacio las tareas y las vuelvo a cargar.
                              this.tareas = null;
                              this.tareas = correcto.Retorno;
                              //selecciono la primer tarea de la lista del proyecto cargado
                              this.hora.IdTarea = this.tareas[0].IdTarea;
                              this.tarea.IdProyecto = this.tareas[0].IdProyecto;
                              //console.log(this.tareas);                            
                              }
                              else
                              {
                                this.status = 'error';
              let toast = this.toastCtrl.create({
                message: 'No hay tareas cargadas',
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
                            this.status = 'error';
                            //console.log(error);
                            let toast = this.toastCtrl.create({
                              message: error,
                              duration: 3000,
                              position: 'top'
                            });            
                            toast.onDidDismiss(() => {
                              //console.log('Dismissed toast');
                            });            
                            toast.present(); 
                          })

                      //console.log(this.tarea.IdProyecto);
                        
                      }
                      else
                      {
                        this.status = 'error';
              let toast = this.toastCtrl.create({
                message: 'No hay proyectos cargados',
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
                  }
                )
            }
            else {

              //SI LLEGO DESDE HORAS,
              //ES CUANDO ESTOY EDITANDO UNA HORA CARGADA  

              //OBTENGO LA HORA SEGUN SU ID    
              this.hora = this.hs.getHora(Number(this.id));
              //OBTENGO LA TAREA PARA LA HORA SELECCIONADA
              this.tarea = this.ts.getTarea(Number(this.hora.IdTarea));
              //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
              this.proyecto = this.pr.getProyecto(this.tarea.IdProyecto);

              //CARGO COMBOS
              this.proyectos.push(this.proyecto);
              this.tareas.push(this.tarea);
            }
          }
        }

      }
    }
  }
 

  CargarHoras() {
    //creando
    if (this.id == 'nueva') {

      this.hs.CargarHoras(this.hora, this.user["CI"])
        .subscribe(
          correcto => {
            console.log(correcto);
            if (correcto==="S") {              
                let toast = this.toastCtrl.create({
                  message: 'Hora Guardada con exito',
                  duration: 3000,
                  position: 'top'
                });
              
                toast.onDidDismiss(() => {
                  //console.log('Dismissed toast');
                });
              
              toast.present();              
              this.IraHoras(this.hora.IdTarea);
            }
            else {
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
            //alert("La Hora No fue Guardada");
            //console.log(error);
          }
        )
    }
    else {
      if (this.ruta == '/horas/tarea/') {
        //cargando una hora nueva desde boton + de tareas
        //console.log("cargohorasdesdeunaTareaDeGrillaDeTareasODesdeBotonGrande");

        this.hs.CargarHoras(this.hora, this.user["CI"])
          .subscribe(
            correcto => {
              if (correcto==="S") {
                //alert("Hora Guardada con exito");
                let toast = this.toastCtrl.create({
                  message: 'Hora Guardada con exito',
                  duration: 3000,
                  position: 'top'
                });              
                toast.onDidDismiss(() => {
                  //console.log('Dismissed toast');
                });             
                toast.present();
                this.IraHoras(this.hora.IdTarea);
                //this.hora = correcto;          
              }
              else {
                //alert("La Hora No fue Guardada");
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
              //alert("La Hora No fue Guardada");
              
              //console.log(error);
            }
          )
      }
      else {
        if (this.ruta == '/horas/proyecto/') {
          //console.log("cargohorasdesdeunProyectoDeGrillaDeProyectosODesdeBotonGrande");
          this.hs.CargarHoras(this.hora, this.user["CI"])
            .subscribe(
              correcto => {
                if (correcto==="S") {
                  //this.hora = correcto; 
                  //alert("Hora Guardada con exito");
                  let toast = this.toastCtrl.create({
                    message: 'Hora Guardada con exito',
                    duration: 3000,
                    position: 'top'
                  });              
                  toast.onDidDismiss(() => {
                    //console.log('Dismissed toast');
                  });             
                  toast.present();
  
                  this.IraHoras(this.hora.IdTarea);
                }
                else {
                  //alert("La Hora No fue Guardada");
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
                }
              }, (error) => {
                //alert("La Hora No fue Guardada");
                let toast = this.toastCtrl.create({
                  message: error,
                  duration: 3000,
                  position: 'top'
                });            
                toast.onDidDismiss(() => {
                  //console.log('Dismissed toast');
                });            
                toast.present();
                this.status = 'error';
                //console.log(error);
              }
            )
        }        
          else {
            //console.log('EditaLaHora');
            //actualizando una hora ya existente   
            this.hs.editarHoras(this.hora)
              .subscribe(
                correcto => {
                  if (correcto==="S") {
                    //this.proyectos = JSON.parse(correcto.proyectos);
                    //this.hora = correcto;
                    //alert("Hora Modificada con exito");
                    let toast = this.toastCtrl.create({
                      message: 'Hora Modificada con exito',
                      duration: 3000,
                      position: 'top'
                    });              
                    toast.onDidDismiss(() => {
                      //console.log('Dismissed toast');
                    });             
                    toast.present();                    
                    this.IraHoras(this.hora.IdTarea);
                    //console.log(this.tareas);
                  }
                  else {
                    //alert("La Hora No fue Guardada");
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
                  //alert("La Hora No fue Guardada");
                  let toast = this.toastCtrl.create({
                    message: error,
                    duration: 3000,
                    position: 'top'
                  });            
                  toast.onDidDismiss(() => {
                    //console.log('Dismissed toast');
                  });            
                  toast.present();
                  this.status = 'error';                  
                  //console.log(error);
                }
              )
          }
        }
      //}
    }
  }

  onProyectoChange() {
    //console.log(this.tarea.IdProyecto);

    this.ts.getTareasDeProyecto(Number(this.tarea.IdProyecto))
      .subscribe(
        correcto => {
          // console.log("En OnProyectoChange");
          // console.log(correcto);
          if (correcto.RetornoCorrecto==="S") {
            if(correcto.Retorno.length>0)
            {
              //vacio las tareas y las vuelvo a cargar.
            this.tareas = null;
            this.tareas = correcto.Retorno;
            //selecciono la primer tarea de la lista del proyecto cargado
            this.hora.IdTarea = this.tareas[0].IdTarea;
            this.tarea.IdProyecto = this.tareas[0].IdProyecto;
            //console.log(this.tareas);                         
            }
            else
            {
              console.log("En OnProyectoChange - no hay tareas");
              this.status = 'error';
              let toast = this.toastCtrl.create({
              message: 'No hay tareas',
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

    //OBTENGO LA TAREA      
    //this.hora.IdTarea = this.tarea.IdTarea;           
    //this.tarea.IdProyecto = this.proyecto.IdProyecto;      
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.id = this.navParams.get('IdHora');
    this.getHora();
  }

}
