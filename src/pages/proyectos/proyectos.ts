import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TareasPage, HorasPage, HoraPage} from '../index.paginas'
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


  constructor(public navCtrl: NavController, public navParams: NavParams, private pservice: ProyectosserviceProvider) {
  }



  buscar(termino: string) {    
    this.loading = true;
    this.proyectos=this.pservice.getProyectoxTermino(termino);    
  }

  IraTareas(idProyecto){
    console.log(idProyecto);
    this.navCtrl.push(TareasPage, {IdProyecto:idProyecto});
  }
  
  IraHorasdeProyecto(idProyecto){    
    this.navCtrl.push(HorasPage , {IdProyecto:idProyecto});    
  }
  
   IraHoradeProyecto(idHora,ruta){
    console.log(idHora);
    console.log(ruta);    
    this.navCtrl.push(HoraPage , {IdHora:idHora,Ruta:ruta});    
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProyectosPage');

        //LISTA PROYECTOS DEL USUARIO DESDE API
        this.user=JSON.parse(localStorage.getItem('usuario'));


        //LLAMO AL SERVICIO Y LE PASO EL DOCUMENTO COMO PARAMETRO    
        this.pservice.getProyectosUsuario(this.user["CI"])
          .subscribe(        
          correcto => { 
            if(correcto)
            {
              this.proyectos = correcto;                 
            }
            else{
              this.status = 'error';          
            }
        },(error) => {
          this.status = 'error';
          console.log(error);                    
          } 
        )    

        this.proyecto.codigoProyecto = this.navParams.get('codigoProyecto');
        console.log(this.proyecto.codigoProyecto);
  }    

}
