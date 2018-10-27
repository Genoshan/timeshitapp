import { Usuario } from './../../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http} from "@angular/http";
import { Proyecto } from '../../interfaces/proyecto';




@Injectable()
export class ProyectosserviceProvider {

  private Proyecto: {
    IdProyecto: number,
    FechaInicio: Date,
    Estado: boolean,
    CodigoProyecto: string,
    Nombre: string
  };
  
  private proyectos: Proyecto[] = [
    {
      IdProyecto: 0,
      FechaInicio: new Date(Date.now()),
      Estado: false,
      Nombre: "",
      CodigoProyecto: ""
    }
  ];

  private Usuario: {
    nombre: string;
    email: string;
    //password: string,
    img: string;
    ci: number;
  };  

  private retornoListarProyectosDeUsuario=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        IdProyecto: 0,
        Nombre: "",
        FechaInicio: new Date(Date.now()),
        Estado: true,
        CodigoProyecto: ""
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
  }

  getProyectos(){
    return this.proyectos;

    //Llamada al servicio de la API y traer por la CI
  }

  getProyectosUsuario(ci: string) {
    let params = JSON.stringify({ pCI: ci });

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.mihttp
      .get(
        this.url + "ListarProyectosDeUsuario?pDocumento=" + ci+"",
        params
      )
      .map((res: any) => {

        this.retornoListarProyectosDeUsuario = res.json();
        //console.log(this.retornoListarProyectosDeUsuario);
        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoListarProyectosDeUsuario.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoListarProyectosDeUsuario.Retorno.length>0)
          {
            
            this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoListarProyectosDeUsuario;            
          }
          else {
            return false;
          }
        }
        else
        {
          return this.retornoListarProyectosDeUsuario.Errores;
        }//fin nueva forma

        
        //vieja forma sin retornos

        //  this.proyectos = res.json();
        //   if (this.proyectos.length>0)
        //   {
        //     return this.proyectos;
        //   }
        // else {
        //   return false;
        // }

      })
      .catch(this.handleError);
  }

  getProyecto(id:number){

    return this.Proyecto=this.proyectos.find(x => x.IdProyecto == id);
  }

  getProyectoxTermino(termino:string){

    return this.proyectos.filter(x => x.Nombre.toLowerCase().indexOf(termino.toLowerCase()) > -1);

  }

  crearProyectos(p: Proyecto){

    p.IdProyecto=this.proyectos.length+1;

    this.proyectos.push(p);

  }

  editarProyectos(p: Proyecto, id:string ){
    
    let projectoaux = this.proyectos.find(x => x.IdProyecto == Number(id));
    let index = this.proyectos.indexOf(projectoaux);
    this.proyectos[index]=projectoaux;    
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
