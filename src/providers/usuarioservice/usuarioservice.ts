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
    Nombre: string;
    Email: string;
    //password: string,
    Img: string;
    CI: number;
  };

//OBJETO RETORNOLOGIN
private retornoLogin = {
  "RetornoCorrecto": "S",
  "Retorno": {
      "Nombre": null,
      "Email": null,
      "Img": null,
      "CI": null
  },
  "Errores": {
    "ExceptionType": null,
    "Mensaje": null,
    "Descripcion": null
}
};

private retornoAsignarUsuarioAProyecto = {
  "RetornoCorrecto": "S",
  "Retorno": false,
  "Errores": {
    "ExceptionType": null,
    "Mensaje": null,
    "Descripcion": null
  }
};

private retornoUsuariosAsignadosAProyecto=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        Nombre: "",
    Email: "",
    //password: string,
    Img: "",
    CI: ""      
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };


  private retornoUsuarios=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        Nombre: "",
    Email: "",
    //password: string,
    Img: "",
    CI: ""      
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  listausuariosaasignar:Usuario[]= [];
  listausuariosasignadosaproyecto:Usuario[]= [];
  listausuarios:Usuario[]= [];

  private url: string;  

  constructor(public _http: HttpClient,public mihttp:Http) {
    
    this.url = "http://localhost:88/api/";
  }

  asignarUsuarios(proyecto: Proyecto, listausuariosaasignar:Usuario[]) {


    let params = JSON.stringify({ pUsuarios: listausuariosaasignar, pIdProyecto: proyecto.IdProyecto });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });   

    return this.mihttp
      .post(this.url + 'AsignarUsusarioAProyecto?'+"pUsuarios=" + listausuariosaasignar+"&pIdProyecto=" + proyecto.IdProyecto, params)
      .map((resp: any) => {
        this.retornoAsignarUsuarioAProyecto = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoAsignarUsuarioAProyecto.RetornoCorrecto==="S")
        {
          return this.retornoAsignarUsuarioAProyecto.RetornoCorrecto;
        }
        else 
        {
          return this.retornoAsignarUsuarioAProyecto.Errores;          
        }//fin nueva forma
        
      })
      .catch(this.handleError);
    
  }

  getUsuariosDeProyecto(proyecto: Proyecto){

      let params = JSON.stringify({ pIdProyecto: proyecto.IdProyecto });
  
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
  
      return this.mihttp
        .get(
          this.url + "ListaUsuariosAsignadoAProyecto?pIdProyecto=" + proyecto.IdProyecto+"",
          params
        )
        .map((res: any) => { 

           this.retornoUsuariosAsignadosAProyecto = res.json();

           console.log(this.retornoUsuariosAsignadosAProyecto);

           //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
           if (this.retornoUsuariosAsignadosAProyecto.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoUsuariosAsignadosAProyecto.Retorno.length>0)
          {
            
            this.listausuariosasignadosaproyecto = this.retornoUsuariosAsignadosAProyecto.Retorno;
            console.log(this.listausuariosasignadosaproyecto);
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoUsuariosAsignadosAProyecto;            
          }
          else {
            return false;
          }
        }
        else
        {
          return this.retornoUsuariosAsignadosAProyecto.Errores;
        }//fin nueva forma
      })
        .catch(this.handleError); 

  }

  getUsuarios(){

    //let params = JSON.stringify({ pIdProyecto: proyecto.IdProyecto );

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.mihttp
      .get(
        this.url + "ListarUsuarios"        
      )
      .map((res: any) => { 

         this.retornoUsuarios = res.json();

         //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
         if (this.retornoUsuarios.RetornoCorrecto==="S")
      {
        //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
        if (this.retornoUsuarios.Retorno.length>0)
        {
          
          this.listausuarios = this.retornoUsuarios.Retorno;
          //console.log(this.retornoListarProyectosDeUsuario.Retorno);

          return this.retornoUsuarios;            
        }
        else {
          return false;
        }
      }
      else
      {
        return this.retornoUsuarios.Errores;
      }//fin nueva forma
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
        //obtengo el retorno con la  nueva forma
        this.retornoLogin = res.json();

        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoLogin.RetornoCorrecto==="S")
        {
          this.Usuario = this.retornoLogin.Retorno;
          if (this.Usuario["Nombre"]!=null)
          {
            localStorage.setItem('usuario',JSON.stringify(this.Usuario));
            return this.retornoLogin.RetornoCorrecto;
          }
        }
        else 
        {
          return this.retornoLogin.Errores;          
        }//fin nueva forma
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
