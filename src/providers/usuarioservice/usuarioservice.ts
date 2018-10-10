import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Http, Headers, RequestOptions } from "@angular/http";
import { Proyecto } from '../../interfaces/proyecto';
import { Usuario } from '../../interfaces/usuario';




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

  listausuariosaasignar:Usuario[]= [];

  private url: string;  

  constructor(public _http: HttpClient,public mihttp:Http) {
    
    this.url = "http://localhost:88/api/";
  }

  asignarUsuarios(proyecto: Proyecto, useraasignar: Usuario) {
    var body = {

      pIdProyecto: proyecto.IdProyecto,
      pDocumento: useraasignar.ci
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });    

    return this.mihttp
      .post(this.url + 'Usuario', body, { headers: headers })
      .map((resp: any) => {
        return resp;
      })
      .catch(this.handleError);
    
  }

  getUsuariosNoAsignadosDeProyecto(proyecto: Proyecto){

      let params = JSON.stringify({ pIdProyecto: proyecto.IdProyecto });
  
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
  
      return this.mihttp
        .get(
          this.url + "ListarUsuariosNoAsignadosDeProyecto?pIdProyecto=" + proyecto.IdProyecto+"",
          params
        )
        .map((res: any) => {        
          
           this.listausuariosaasignar = res.json();
                    
            if (this.listausuariosaasignar.length>0)
            {            
              return this.listausuariosaasignar;
            }
          else {
            
            return false;
          }
          
        })
        .catch(this.handleError); 

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
      let error1 = error.json();    
    let errMsg = error1["ExceptionMessage"]
      ? error1["ExceptionMessage"]
      : error.status
        ? `${error.status} - ${error.statusText}`
        : "Server error";
    return Observable.throw(errMsg);
    } 

  

}
