import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  tareas:Tarea[] = [];
  id: number;
  loading:boolean;
  
  proyecto:Proyecto = {

    Nombre:"",
    FechaInicio:new Date(Date.now()),
    Estado:true,
    codigoProyecto:"",    
    IdProyecto: 0,
  }

  tarea:Tarea = {

    IdTarea: 0,
    Nombre: "",
    Descripcion: "",
    FechaInicio:new Date(Date.now()),
    FechaFIn: new Date(Date.now()),
    IdProyecto: 0  
  }
  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pservice: ProyectosserviceProvider, private tservice: TareasserviceProvider) {
  }

  buscar(termino: string) {
    this.loading = true;
    this.tareas=this.tservice.getTareasxTermino(termino);  
  }

  IraTareadeProyecto(idTarea){    
    this.navCtrl.push(TareaPage , {IdTarea:idTarea});    
  }  

  IraHorasdeTarea(idTarea){    
    this.navCtrl.push(HorasPage , {IdTarea:idTarea});    
  }  


  Volver(){
    this.navCtrl.pop();
  }


  listarTareasDeProyecto(){

    //OBTENGO EL PROYECTO        
    this.id=this.navParams.get('IdProyecto');

    this.proyecto=this.pservice.getProyecto(this.id);
    
    //almaceno en localstorage para poder acceder desde una tarea nueva    
    localStorage.setItem('proyecto',JSON.stringify(this.proyecto)); 
    
    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
     this.tservice.getTareasDeProyecto(this.id)
     .subscribe(        
     correcto => { 
       if(correcto)
       {
         //vacio las tareas y las vuelvo a cargar.
         this.tareas = null;
         this.tareas = correcto;
         //console.log(this.tareas);
       }
       else{
         this.status = 'error';
    
         //alert('El usuario no esta');
       }
    },(error) => {
     this.status = 'error';
     console.log(error);                    
     } 
    )
    }




    borrarTarea(k: Number) {      
           
            //llamo al metodo
            this.tservice.eliminarTarea(k)
            .subscribe(        
              correcto => { 
                if(correcto)
                {
                  console.log(correcto);    
                  //recargo las tareas
                  this.tareas = null;
                  this.listarTareasDeProyecto();
                  //console.log(this.tareas);
                }
                else{
                  this.status = 'error';
                  console.log(correcto);                        
                }
            },(error) => {
              this.status = 'error';
              console.log(error);
              } 
            )  
          }

/**** CARGA INICIAL DEL COMPONENTE *****/          
  ionViewDidLoad() {
    console.log('ionViewDidLoad TareasPage');
    this.listarTareasDeProyecto();
  }

}
