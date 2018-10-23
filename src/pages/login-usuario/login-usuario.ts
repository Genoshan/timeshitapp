import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {ProyectosPage} from '../index.paginas';
import { UsuarioserviceProvider } from '../../providers/usuarioservice/usuarioservice';

/**
 * Generated class for the LoginUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-usuario',
  templateUrl: 'login-usuario.html',
})
export class LoginUsuarioPage {

  email:string;
  pass:string;  

  constructor(public navCtrl: NavController, public navParams: NavParams, public us: UsuarioserviceProvider, private toastCtrl: ToastController) {
    
  }

  logueo(){
    this.us.login(this.email,this.pass)    
    .subscribe(        
    correcto => {
      /*PARA RETORNOS NUEVOS LOGIN TS*/
      /*PARA USAR CON LA NUEVA FORMA DE RETORNO*/
         if (correcto ==="S") {
          this.navCtrl.push(ProyectosPage);           
         }
         
      else{
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
  },(error) => {
    //console.log(error);
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: 'middle'
    });            
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });            
    toast.present();    
  })
}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginUsuarioPage');
  }

}
