import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Proyecto } from '../../interfaces/proyecto';
import { Tarea } from '../../interfaces/tarea';
import { Usuario } from '../../interfaces/usuario';
import { ProyectosserviceProvider } from '../../providers/proyectosservice/proyectosservice';
import { TareasserviceProvider } from '../../providers/tareasservice/tareasservice';
import { TareasPage } from '../index.paginas';


@IonicPage()
@Component({
  selector: 'page-tarea',
  templateUrl: 'tarea.html',
})
export class TareaPage {

  

    /*****ATRIBUTOS******/  

    nuevo:boolean=false;
    id:string;
    proyectos:Proyecto[] = [];
  
     tarea:Tarea = {
  
      IdTarea: 0,
      Nombre: "",
      Descripcion: "",
      FechaInicio:new Date(Date.now()),
      FechaFIn: new Date(Date.now()),
      IdProyecto:0  
    }
  
    user: Usuario = {
      nombre: "",
      email: "",
      //password: string;
      img: "",
      ci: ""
    }
  
    proyecto:Proyecto = {
      Nombre:"",
      FechaInicio:new Date(Date.now()),
      Estado:true,
      codigoProyecto:"",    
      IdProyecto: 0,
    }
  
    status:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private ts:TareasserviceProvider ,private pr:ProyectosserviceProvider) {
  }


  /*****OPERACIONES*****/
  IraTareas(idProyecto){
    console.log(idProyecto);
    this.navCtrl.push(TareasPage, {IdProyecto:idProyecto});
  }  
  

getTarea(){

   
  if (this.id== null)
  {
      //console.log(this.proyecto);
      this.tarea.IdProyecto = this.proyecto.IdProyecto;
  }
  else{

    this.tarea=this.ts.getTarea(Number(this.id));
    //OBTENGO EL PROYECTO DE LA TAREA SELECCIONADA
    this.proyecto=this.pr.getProyecto(this.tarea.IdProyecto);

  }        
}


crearTareas(){
  if (this.id== null)
  {
    // insertando
    
    this.ts.crearTareas(this.tarea)
    .subscribe(        
      correcto => { 
        if(correcto)
        {
          //this.proyectos = JSON.parse(correcto.proyectos);
          //this.tarea = correcto;
          alert("Tarea Creada con exito");
          this.IraTareas(this.tarea.IdProyecto);

          //console.log(this.tareas);
        }
        else{
          this.status = 'error';
          alert("Tarea No Fue Creada");

          //alert('El usuario no esta');
        }
    },(error) => {
      this.status = 'error';
      console.log(error);
      alert(""+error);                    
      } 
    )
  }
  else
  {
    //actualizando
    
    this.ts.editarTarea(this.tarea)   
    .subscribe(        
      correcto => { 
        if(correcto)
        {
          //this.proyectos = JSON.parse(correcto.proyectos);
          //this.tarea = correcto;
          alert("Tarea Editada con exito");
          this.IraTareas(this.tarea.IdProyecto);          
          //console.log(this.tareas);
        }
        else{
          this.status = 'error';
          alert("Tarea No Fue Editada");
          //alert('El usuario no esta');
        }
    },(error) => {
      alert("Tarea No Fue Editada");
      this.status = 'error';
      console.log(error);
      alert(""+error);                                        
      } 
    )
               
  }
}

/**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {
    console.log('ionViewDidLoad TareaPage');
    
    this.user=JSON.parse(localStorage.getItem('usuario'));
    this.proyecto = JSON.parse(localStorage.getItem('proyecto'));  
    this.id= this.navParams.get('IdTarea');        
    //LEVANTO DATOS DE TAREA PARA EDITAR O CREO UNA NUEVA  
    this.getTarea();        
    this.proyectos.push(this.proyecto);
  }

}
