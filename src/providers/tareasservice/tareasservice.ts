import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http,Headers, RequestOptions} from "@angular/http";


import { Tarea } from '../../interfaces/tarea';

@Injectable()
export class TareasserviceProvider {

    //ATRIBUTOS
    private tareas: Tarea[] = [];
    private url: string;
    private Tarea: {
      IdTarea: number;
      Nombre: string;
      Descripcion: string;
      FechaInicio: Date;
      FechaFIn: Date;
      IdProyecto: number;
    };

  constructor(public http: HttpClient,public mihttp:Http) {
    this.url = "http://localhost:88/api/";
  }

  getTareas(key$: number) {}

  //OBTENER TAREA POR SU ID
  getTarea(id: number) {
    return (this.Tarea = this.tareas.find(x => x.IdTarea == id));
  }

    //OBTENER TAREAS DE UN PROYECTO DESDE LA API
    getTareasDeProyecto(Id: number) {
      let params = JSON.stringify({ pId: Id });
  
      let headers = new Headers();
      headers.append("Content-Type", "application/json");      
  
      return this.mihttp
        .get(this.url + "ListarTareasDeProyecto?pIdProyecto=" + Id + "", params)
        .map((res: any) => {
          this.tareas = res.json();
  
          if (this.tareas.length > 0) {
            return this.tareas;
          } else {
            return false;
          }
        })
        .catch(this.handleError);
    }

      //BUSCADOR DE TAREAS
  getTareasxTermino(termino: string) {
    return this.tareas.filter(
      x => x.Nombre.toLowerCase().indexOf(termino.toLowerCase()) > -1
    );
  }

//crear tarea
crearTareas(t: Tarea) {

  //let body:any = JSON.stringify({ t });

  var body = {
    IdTarea: t.IdTarea,
    IdProyecto: t.IdProyecto,
    Nombre: t.Nombre,
    Descripcion: t.Descripcion,
    FechaInicio: t.FechaInicio,
    FechaFIn: t.FechaFIn
  };

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  let options = new RequestOptions({ headers: headers });

  return this.mihttp
    .post(this.url + 'CrearTarea', body, { headers: headers })
    .map((resp: any) => {
      //swal('Tarea Actualizada', t.Nombre, 'success');        
      return resp;
    })
    .catch(this.handleError);
}

  //editarTarea
  editarTarea(t: Tarea) {
    //let headers = new Headers();
    var body = {
      IdTarea: t.IdTarea,
      IdProyecto: t.IdProyecto,
      Nombre: t.Nombre,
      Descripcion: t.Descripcion,
      FechaInicio: t.FechaInicio,
      FechaFIn: t.FechaFIn
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.mihttp
      .post(this.url + 'EditarTarea', body, { headers: headers })
      .map((resp: any) => {
        //swal('Tarea Actualizada', t.Nombre, 'success');

        return resp;
      })
      .catch(this.handleError);
  }

    //eliminarTarea
    eliminarTarea(k: Number) {
      console.log(k);
      //let headers = new Headers();
      var body = k
      ;   
  
      console.log(body);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');     
      
  
      return this.mihttp
        .post(this.url + 'EliminarTarea', body, { headers: headers })
        .map((resp: any) => {
          //swal('Tarea Actualizada', t.Nombre, 'success');
          
          console.log(resp);
          return resp;
          
        })
        .catch(this.handleError);
    }

      //MANEJADOR DE ERRORES DE SERVICIO
  private handleError(error: any) {
    let errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : "Server error";
    return Observable.throw(errMsg);
  }

}
