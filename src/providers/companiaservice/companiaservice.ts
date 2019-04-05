import { Compania } from './../../interfaces/compania';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http,Headers, RequestOptions} from "@angular/http";

/*
  Generated class for the CompaniaserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CompaniaserviceProvider {

  private Compania: {
    Id: number,    
    Name: string
  };
  
  private Companias: Compania[] = [
    {
      Id: 0,      
      Name: ""      
    }
  ];
  
  private retornoListarCompanias=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        Id: 0,
        Name: ""        
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };    

  private url: string;

  constructor(public http: HttpClient,public mihttp:Http) {

    this.url = "http://localhost:88/api/";
    //this.url = "http://DESKTOP-SNT742M:88/api/";
  }

  getCompanias(){
    let params = JSON.stringify({ pEstado: true });
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.mihttp
      .get( 
        this.url + "ListarCompanias?pEstado="+true,
        params
      )
      .map((res: any) => {

        this.retornoListarCompanias = res.json();
        //console.log(this.retornoListarProyectosDeUsuario);
        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoListarCompanias.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoListarCompanias.Retorno.length>0)
          {
            
            this.Companias = this.retornoListarCompanias.Retorno;
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoListarCompanias;            
          }
          else {
            return false;
          }
        }
        else
        {
          return this.retornoListarCompanias.Errores;
        }//fin nueva forma

      })
      .catch(this.handleError);

    //Llamada al servicio de la API y traer por la CI
  }  

  getCompania(id:number){

    return this.Compania=this.Companias.find(x => x.Id == id);
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
