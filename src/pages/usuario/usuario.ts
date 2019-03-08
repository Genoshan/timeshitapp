import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { UsuarioserviceProvider } from '../../providers/usuarioservice/usuarioservice';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UsuariosPage } from '../index.paginas';


/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

      /*****ATRIBUTOS******/

      nuevo: boolean = false;
      id: string;
    
      user: Usuario = {
        Nombre: "",
        Email: "",
        Clave:"",
        oCompany:-1,
        //password: string;
        Img: "",        
        CI: ""
      }    
      
    
      status: string;
  
  Email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private us: UsuarioserviceProvider, 
    private toastCtrl: ToastController, private sanitizer: DomSanitizer) {
  }

  getImgContent(Img): SafeUrl {
    //return this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64,"+Img);
    return this.sanitizer.bypassSecurityTrustUrl("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNTAgMjUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAgMjUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojREQwMDMxO30NCgkuc3Qxe2ZpbGw6I0MzMDAyRjt9DQoJLnN0MntmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTI1LDMwIDEyNSwzMCAxMjUsMzAgMzEuOSw2My4yIDQ2LjEsMTg2LjMgMTI1LDIzMCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMjUsMzAgMTI1LDUyLjIgMTI1LDUyLjEgMTI1LDE1My40IDEyNSwxNTMuNCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAxMjUsMzAgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjUsNTIuMUw2Ni44LDE4Mi42aDBoMjEuN2gwbDExLjctMjkuMmg0OS40bDExLjcsMjkuMmgwaDIxLjdoMEwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMQ0KCQlMMTI1LDUyLjF6IE0xNDIsMTM1LjRIMTA4bDE3LTQwLjlMMTQyLDEzNS40eiIvPg0KPC9nPg0KPC9zdmc+DQo=");
}

  IraUsuarios() {
    //console.log(idProyecto);
    this.navCtrl.push(UsuariosPage, { });
  }

  getUsuario() {

    if (this.Email == null) {
      //console.log(this.id);
      //this.proyecto.IdProyecto = this.proyecto.IdProyecto;
    }
    else {
      console.log(this.Email);
      this.user = this.us.getUsuario(this.Email);      
    }
  }


  crearUsuarios() {
    if (this.id == null) {
      // insertando    
      this.us.crearUsuarios(this.user)
        .subscribe(
          correcto => {
            if (correcto.RetornoCorrecto==="S") {
              let toast = this.toastCtrl.create({
                message: 'Usuario Guardado con exito',
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
              });

              toast.present();              
              this.IraUsuarios();

            }
            else {
              this.status = 'error';
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
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
            });
            toast.present();
          }
        )
    }
    else {
      //actualizando
      this.us.editarUsuario(this.user)
        .subscribe(
          correcto => {
            if (correcto.RetornoCorrecto==="S") {
              let toast = this.toastCtrl.create({
                message: 'Usuario Editado con exito',
                duration: 3000,
                position: 'top'
              });              
              toast.onDidDismiss(() => {
                //console.log('Dismissed toast');
              });             
              toast.present();                    
              this.IraUsuarios();
            }
            else {
              this.status = 'error';              
              let toast = this.toastCtrl.create({
                message: correcto.Mensaje +'-'+correcto.Descripcion,
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
            });
            toast.present();
          }
        )
    }
  }

  /**** CARGA INICIAL DEL COMPONENTE *****/
  ionViewDidLoad() {

    //this.user = JSON.parse(localStorage.getItem('usuario'));
    
    //this.proyecto = JSON.parse(localStorage.getItem('proyecto'));
    this.Email= this.navParams.get('Email');    
    console.log(this.Email);
    this.getUsuario();
    //this.proyectos.push(this.proyecto);
  }

}
