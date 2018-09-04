import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http} from "@angular/http";
import { Proyecto } from '../../interfaces/proyecto';



@Injectable()
export class ProyectosserviceProvider {

  private Proyecto:{
    IdProyecto: number,    
    FechaInicio: Date,
    Estado: boolean,
    codigoProyecto: string
  };

  private Usuario: {
    nombre: string;
    email: string;
    //password: string,
    img: string;
    ci: number;
  };

  private proyectos:Proyecto[] = [];
  
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
        
         this.proyectos = res.json();
                  
          if (this.proyectos.length>0)
          {            
            return this.proyectos;
          }
        else {
          
          return false;
        }
        
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
    

    //return this.proyectos;
  }

  editarProyectos(p: Proyecto, id:string ){

    //Proyecto proy= this.proyectos.find(p;
    let projectoaux = this.proyectos.find(x => x.IdProyecto == Number(id));         
    let index = this.proyectos.indexOf(projectoaux);
    this.proyectos[index]=projectoaux;    
    
    //return this.proyectos;
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
