import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public us: UsuarioserviceProvider) {
    
  }

  logueo(){
    this.us.login(this.email,this.pass)    
    .subscribe(        
    correcto => { 
      if(correcto)
      {
        this.navCtrl.push(ProyectosPage);
      }
      else{     
        alert("Credenciales incorrectas");             
        console.log(correcto);
        console.log(this.email);
      }
  },(error) => {

  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginUsuarioPage');
  }

}
