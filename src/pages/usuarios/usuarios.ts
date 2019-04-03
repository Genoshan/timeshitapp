import { Compania } from './../../interfaces/compania';
import { Usuario } from './../../interfaces/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UsuarioPage } from '../usuario/usuario';
import { UsuarioserviceProvider } from '../../providers/usuarioservice/usuarioservice';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CompaniaserviceProvider } from '../../providers/companiaservice/companiaservice';

/**
 * Generated class for the UsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {


  p: number = 1;
  usuarios: Usuario[] = [];
  id: number;
  loading: boolean;
  termino: string;

  // Compania: Compania = {

  //   IdCompania: "",
  //   Nombre: ""    
  // }

  usuario: Usuario = {
    Email: "",
    Nombre: "",
    CI: "",
    Img:"",
    Clave:"",
    Administrador: false,
    oCompany:-1    
  }

  compania: Compania = {
    Id: -1,
    Name: ""    
  }

  status: string;

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private uservice: UsuarioserviceProvider, private cservice: CompaniaserviceProvider, private toastCtrl: ToastController, private alertCtrl: AlertController, 
    private sanitizer: DomSanitizer) {
  }

  getImgContent(Img): SafeUrl {
    //return this.sanitizer.bypassSecurityTrustUrl("data:image/*;base64,"+Img);
    return this.sanitizer.bypassSecurityTrustUrl("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNTAgMjUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAgMjUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojREQwMDMxO30NCgkuc3Qxe2ZpbGw6I0MzMDAyRjt9DQoJLnN0MntmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTI1LDMwIDEyNSwzMCAxMjUsMzAgMzEuOSw2My4yIDQ2LjEsMTg2LjMgMTI1LDIzMCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMjUsMzAgMTI1LDUyLjIgMTI1LDUyLjEgMTI1LDE1My40IDEyNSwxNTMuNCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAxMjUsMzAgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjUsNTIuMUw2Ni44LDE4Mi42aDBoMjEuN2gwbDExLjctMjkuMmg0OS40bDExLjcsMjkuMmgwaDIxLjdoMEwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMQ0KCQlMMTI1LDUyLjF6IE0xNDIsMTM1LjRIMTA4bDE3LTQwLjlMMTQyLDEzNS40eiIvPg0KPC9nPg0KPC9zdmc+DQo=");
}

  IraUsuario(Email){    
    console.log(Email);
    this.navCtrl.push(UsuarioPage , {Email:Email});    
  }

  buscar(termino: string) {
    this.loading = true;    
    this.usuarios = this.uservice.getUsuarioxTermino(termino);
    console.log(this.usuarios)
  }

  Volver() {
    this.navCtrl.pop();
  }

  listarUsuarios() {

    //OBTENGO EL PROYECTO        
    //this.id = this.navParams.get('IdProyecto');

    //this.proyecto = this.pservice.getProyecto(this.id);

    //almaceno en localstorage para poder acceder desde una tarea nueva    
    //localStorage.setItem('proyecto', JSON.stringify(this.proyecto));

    //OBTENGO LAS TAREAS DEL PROYECTO PARA LISTARLAS    
    this.uservice.getUsuarios()
      .subscribe(
        correcto => {
          console.log(correcto);
          if(correcto.RetornoCorrecto==="S")
            { 
              if(correcto.Retorno.length>0){
                //console.log(correcto);
                //vacio las tareas y las vuelvo a cargar.
                this.usuarios = null;
                this.usuarios = correcto.Retorno;                
              }
              else{
                let toast = this.toastCtrl.create({
                  message: 'No tiene usuarios',
                  duration: 3000,
                  position: 'middle'
                });
                toast.onDidDismiss(() => {                  
                });
                toast.present();
              }                           
            }
            else
            {              
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
                duration: 3000,
                position: 'middle'
              });
              toast.onDidDismiss(() => {                
              });
              toast.present();             
            }     
         }
         )
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
    ionViewDidLoad() {
      //console.log('ionViewDidLoad TareasPage');
      this.listarUsuarios();
      
    }
  }