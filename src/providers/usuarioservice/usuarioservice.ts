import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Http} from "@angular/http";




/*
  Generated class for the UsuarioserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioserviceProvider {

  email: string;
  pass: string;

  private Usuario: {
    nombre: string;
    email: string;
    //password: string,
    img: string;
    ci: number;
  };
  private url: string;

  constructor(public _http: HttpClient,public mihttp:Http) {
    
    this.url = "http://localhost:88/api/";
  }

  login(email: string, pass: string) {
    let params = JSON.stringify({ pUsuario: email, pClave: pass });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.mihttp
      .get(
        this.url + "LoginUsuario?pUsuario=" + email + "&pClave=" + pass,
        params
      )
      .map((res: any) => { 
                
         this.Usuario = res.json();
                  
          if (this.Usuario["Nombre"]!=null)
          {            
            localStorage.setItem('usuario',JSON.stringify(this.Usuario));
            return true;
          }
        else {          
          return false;
        }
        
      })
      .catch(this.handleError); 
  }

    //MANEJADOR DE ERRORES DE SERVICIO  
    private handleError(error:any)
    { 
      let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return Observable.throw(error);
    } 

  

}
