import { UsuariosPage } from './../usuarios/usuarios';
import { ProyectoPage } from './../proyecto/proyecto';
import { AsignarusuariosaproyectosPage } from './../asignarusuariosaproyectos/asignarusuariosaproyectos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import {TareasPage, HorasPage, HoraPage , HorasefectivasPage} from '../index.paginas'
import { Usuario } from '../../interfaces/usuario';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { Proyecto } from '../../interfaces/proyecto';


/**
 * Generated class for the ProyectosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-proyectos',
  templateUrl: 'proyectos.html',
})
export class ProyectosPage {

  p: number = 1;
  proyectos:Proyecto[] = [];
  items = [];
  loading:boolean;

  user:Usuario={
    Nombre: "",
    Email: "",
    Clave: "",
    oCompany: -1,
    Administrador: false,
    //password: string;
    Img: "",
    CI: "",
  }

  usuariologueado: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0,
    Administrador: false
  };

  useraasignar: Usuario = {
    Nombre: "",
    Email: "",
    Clave: "",
    Img: "",
    CI: "",
    oCompany: 0,
    Administrador: false
  };
  

  proyecto:Proyecto = {
    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    CodigoProyecto:"",    
    IdProyecto: 0,
  }

  status:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     private pservice: ProyectosserviceProvider, private toastCtrl: ToastController, private alertCtrl: AlertController) {
  }



  buscar(termino: string) {    
    this.loading = true;
    this.proyectos=this.pservice.getProyectoxTermino(termino);    
  }

  borrarProyecto(k: Number) {
    
    let alert = this.alertCtrl.create({
      title: 'El proyecto se eliminará, está seguro?',
      message: 'El proyecto no se podrá recuperar.',
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
            this.pservice.eliminarProyecto(k,this.user)
              .subscribe(
                correcto => {
                  //console.log(correcto);
                  if (correcto.RetornoCorrecto==="S") {
                    //vuelvo a cargar la lista
                    let toast = this.toastCtrl.create({
                      message: 'Proyecto Eliminado',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.onDidDismiss(() => {
                      //console.log('Dismissed toast');
                    });
                    toast.present();

                    this.proyectos = null;
                    //this.listarProyectosDeUsuario();
                    this.pservice.getProyectos()
          .subscribe(        
          correcto => {             
            if(correcto.RetornoCorrecto==="S")
            { 
              if(correcto.Retorno.length>0){
                //console.log(correcto);
                this.proyectos = correcto.Retorno;                      
              }
              else{
                let toast = this.toastCtrl.create({
                  message: 'No tiene proyectos',
                  duration: 3000,
                  position: 'middle'  
                });
                toast.onDidDismiss(() => {                  
                });
                toast.present();  
              }                           
            }
            else{              
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
                duration: 3000,
                position: 'middle'
              });
              toast.onDidDismiss(() => {                
              });
              toast.present();             
            }
        },(error) => {
          //this.status = 'error';
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
        this.proyecto.CodigoProyecto = this.navParams.get('CodigoProyecto');        

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

  IraTareas(idProyecto){
    //console.log(idProyecto);
    this.navCtrl.push(TareasPage, {IdProyecto:idProyecto});
  }
  
  IraHorasdeProyecto(idProyecto){    
    this.navCtrl.push(HorasPage , {IdProyecto:idProyecto});    
  }

  IraProyecto(idProyecto){    
    this.navCtrl.push(ProyectoPage , {IdProyecto:idProyecto});    
  }
  
   IraHoradeProyecto(idHora,ruta){
    //console.log(idHora);
    //console.log(ruta);    
    this.navCtrl.push(HoraPage , {IdHora:idHora,Ruta:ruta});    
  }

  IraHorasEfectivas(){
    //console.log(idHora);
    //console.log("llego ok");    
    this.navCtrl.push(HorasefectivasPage);    
  }

  IraAsignarUsuariosAProyectos(){
    this.navCtrl.push(AsignarusuariosaproyectosPage);
  }

  IraUsuarios(){
    this.navCtrl.push(UsuariosPage);
  }

  listaProyectos(){

    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
    this.pservice.getProyectos()
    .subscribe(        
    correcto => {             
      if(correcto.RetornoCorrecto==="S")
      { 
        if(correcto.Retorno.length>0){
          //console.log(correcto);
          this.proyectos = correcto.Retorno;                      
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'No tiene proyectos asignados',
            duration: 3000,
            position: 'middle'  
          });
          toast.onDidDismiss(() => {                  
          });
          toast.present();  
        }                           
      }
      else{              
        let toast = this.toastCtrl.create({
          message: correcto.Mensaje +'-'+correcto.Descripcion,
          duration: 3000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {                
        });
        toast.present();             
      }
  },(error) => {
    //this.status = 'error';
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

  }

  listarProyectosDelUsuario(){

    //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
    this.pservice.getProyectosUsuario(this.user["Email"])
    .subscribe(        
    correcto => {             
      if(correcto.RetornoCorrecto==="S")
      { 
        if(correcto.Retorno.length>0){
          //console.log(correcto);
          this.proyectos = correcto.Retorno;                      
        }
        else{
          let toast = this.toastCtrl.create({
            message: 'No tiene proyectos asignados',
            duration: 3000,
            position: 'middle'  
          });
          toast.onDidDismiss(() => {                  
          });
          toast.present();  
        }                           
      }
      else{              
        let toast = this.toastCtrl.create({
          message: correcto.Mensaje +'-'+correcto.Descripcion,
          duration: 3000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {                
        });
        toast.present();             
      }
  },(error) => {
    //this.status = 'error';
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

  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {

    
        //LISTA PROYECTOS DEL USUARIO DESDE API
        this.user=JSON.parse(localStorage.getItem('usuario'));

        if (this.user.Administrador) {
          this.listaProyectos();
        }
        else  
        {
          this.listarProyectosDelUsuario();
        }
        
        this.proyecto.CodigoProyecto = this.navParams.get('CodigoProyecto');        
  }    

}
