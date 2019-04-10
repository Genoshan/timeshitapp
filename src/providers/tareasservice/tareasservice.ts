import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Http,Headers, RequestOptions} from "@angular/http";


import { Tarea } from '../../interfaces/tarea';
import { Usuario } from "../../interfaces/usuario";

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

  private retornoListarTareasDeProyecto=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        IdTarea: 0,
      Nombre: "",
      Descripcion: "",
      FechaInicio: new Date(Date.now()),
      FechaFIn: new Date(Date.now()),
      IdProyecto: 0
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoCrearTarea=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEditarTarea=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };

  private retornoEliminarTarea=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  };



  constructor(public http: HttpClient,public mihttp:Http) {
    //this.url = "http://localhost:88/api/";
    this.url = "http://DESKTOP-SNT742M:88/api/";
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
          this.retornoListarTareasDeProyecto = res.json();          
        if (this.retornoListarTareasDeProyecto.RetornoCorrecto==="S")
        {
          this.tareas = this.retornoListarTareasDeProyecto.Retorno;
          return this.retornoListarTareasDeProyecto;            
        }
        else
        {
          return this.retornoListarTareasDeProyecto.Errores;
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
      this.retornoCrearTarea = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoCrearTarea.RetornoCorrecto==="S")
        {
          return this.retornoCrearTarea.RetornoCorrecto;
        }
        else 
        {
          return this.retornoCrearTarea.Errores;          
        }//fin nueva forma
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
        //retornoEditarTarea
          this.retornoEditarTarea = resp.json();        
          //console.log(this.retornoEditarTarea);
          //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
          if (this.retornoEditarTarea.RetornoCorrecto==="S")
          {
            return this.retornoEditarTarea;
          }
          else 
          {
            return this.retornoEditarTarea.Errores;          
          }//fin nueva forma

        //return resp;
      })
      .catch(this.handleError);
  }

    //eliminarTarea
    eliminarTarea(k: Number, u:Usuario) {
      //console.log(k);
      //let headers = new Headers();
      var body =
    {
      pIdTarea: k,
      pUsuario: {
        Nombre: u.Nombre,
        Email: u.Email,
        Clave: u.Clave,
        Img: u.Img,
        CI: u.CI,
        oCompany: u.oCompany,
        Administrador: u.Administrador
      }
    }; 
        
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');           
  
      return this.mihttp
        .post(this.url + 'EliminarTarea', body, { headers: headers })
        .map((resp: any) => {
          
          this.retornoEliminarTarea = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEliminarTarea.RetornoCorrecto==="S")
        {
          return this.retornoEliminarTarea.RetornoCorrecto;
        }
        else 
        {
          return this.retornoEliminarTarea.Errores;          
        }//fin nueva forma          
          
        })
        .catch(this.handleError);
    }

      //MANEJADOR DE ERRORES DE SERVICIO
  private handleError(error: any) {
    let error1 = error.json();    
    let errMsg = error1["ExceptionMessage"]
      ? error1["ExceptionMessage"]
      : error.status
        ? `${error.status} - ${error.statusText}`
        : "Server error";
    return Observable.throw(errMsg);
  }

}
