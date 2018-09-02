import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Tarea } from '../../interfaces/tarea';
import { Proyecto } from '../../interfaces/proyecto';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { TareasserviceProvider } from '../../providers/tareasservice/tareasservice';
import { Hora } from '../../interfaces/hora';
import { Usuario } from '../../interfaces/usuario';
import { HorasserviceProvider } from '../../providers/horasservice/horasservice';
import { HoraPage } from '../hora/hora';


@IonicPage()
@Component({
  selector: 'page-horas',
  templateUrl: 'horas.html',
})
export class HorasPage {

      /*****ATRIBUTOS******/  
      p: number = 1;
  
      horas:Hora[] = [];
      
      id: number;
      loading:boolean;
      
      hora:Hora={    
        Idhora:0,
        Descripcion:"",
        CantidadHoras:0,
        Fecha:new Date(Date.now()),
        IdTarea: 0
      }
      
      proyecto:Proyecto= {
        
        FechaInicio:new Date(Date.now()),
        Estado:true,
        Nombre:"",
        codigoProyecto:"",
        IdProyecto: 0,    
      }
      
      tarea:Tarea = {
        
        IdTarea: 0,
        Nombre: "",
        Descripcion: "",
        FechaInicio:new Date(Date.now()),
        FechaFIn: new Date(Date.now()),
        IdProyecto:0  
      }
      
      status:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pservice: ProyectosserviceProvider, private tservice: TareasserviceProvider,private hservice: HorasserviceProvider) {
    
  }

  buscar(termino: string) {
    this.loading = true;
    this.horas=this.hservice.getHorasxTermino(termino);   
  }

  IraHoradeTarea(idHora,ruta){
    console.log(idHora);
    console.log(ruta);    
    this.navCtrl.push(HoraPage , {IdHora:idHora,Ruta:ruta});    
  } 


  borrarHora(k: Number) {
    this.loading = true;
    this.hservice.eliminarHora(k)
         .subscribe(        
         correcto => { 
           if(correcto)
           {            
            //vuelvo a cargar la lista
            alert("Hora Eliminada con exito");
            this.horas = null;              
            this.listarHorasdeTarea();                 
           }
           else{
            alert("La Hora No Fue Eliminada");            
             this.status = 'error';            
           }
       },(error) => {
        alert("La Hora No Fue Eliminada");            
         this.status = 'error';
         console.log(error);                    
         } 
       )
       
  }

  listarHorasdeTarea(){

    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS      
    this.id=this.navParams.get('IdTarea');    
    this.tarea = this.tservice.getTarea(this.id);          

    //almaceno en localstorage para poder acceder desde una tarea nueva    
    localStorage.setItem('tarea',JSON.stringify(this.tarea));          

         this.hservice.getHorasDeTarea(this.tarea)
         .subscribe(        
         correcto => { 
           if(correcto)
           {
            //vacio la lista de horas y la vuelvo a cargar
            this.horas = null;               
             this.horas = correcto;                
           }
           else{
             this.status = 'error';                         
           }
       },(error) => {
         this.status = 'error';
         console.log(error);                    
         } 
       )


  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {
    console.log('ionViewDidLoad HorasPage');
    this.listarHorasdeTarea();
  }

}
