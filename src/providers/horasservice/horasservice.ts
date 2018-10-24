import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Hora } from '../../interfaces/hora';
import { Usuario } from '../../interfaces/usuario';
import { Tarea } from '../../interfaces/tarea';
import { HoraEfectiva } from '../../interfaces/horaefectiva';


@Injectable()
export class HorasserviceProvider {

  //ATRIBUTOS
  private horas: Hora[] = [];

  private horasefectivas: HoraEfectiva[]=[];

  private url: string;

  private user: Usuario = {
    nombre: "",
    email: "",
    //password: string;
    img: "",
    ci: ""
  }

  private Hora: {
    Idhora: number;
    Descripcion: string;
    CantidadHoras: number;
    Fecha: Date;
    IdTarea: number;
  };

  private retornoListarHorasDeProyectoyTarea=
  {
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        IdTarea: 0,      
      Descripcion: "",
      CantidadHoras: 0,
      Fecha: new Date(Date.now()),
      Idhora: 0
      }],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  }

  private retornoListadoHorasEfectivas={
    "RetornoCorrecto": "S",
    "Retorno": [
      {
        "oProyecto": {
          "IdProyecto": 0,
          "Nombre": "",
          "FechaInicio": new Date(Date.now()),
          "Estado": true,
          "CodigoProyecto": ""
        },
        "oTarea": {
          "IdTarea": 0,
          "IdProyecto": 0,
          "Nombre": "",
          "Descripcion": "",
          "FechaInicio": new Date(Date.now()),
          "FechaFIn": new Date(Date.now())
        },
        "oHora": {
          "Idhora": 0,
          "IdTarea": 0,
          "Descripcion": "",
          "CantidadHoras": 1,
          "Fecha": new Date(Date.now())
        }
      }
    ],
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  }

  private retornoCrearHora=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  }

  private retornoEditarHora=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  }

  private retornoEliminarHora=
  {
    "RetornoCorrecto": "E",
    "Retorno": false,
    "Errores": {
      "ExceptionType": null,
      "Mensaje": null,
      "Descripcion": null
    }
  }  


  constructor(public http: HttpClient,
    public mihttp: Http) {
    this.url = "http://localhost:88/api/";
  }

  getHoras(key$: number) { }

  getHora(id: number) {
    return (this.Hora = this.horas.find(x => x.Idhora == id));
  }

  getHorasDeTarea(t: Tarea) {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    let params = JSON.stringify({ pIdProyecto: t.IdProyecto, pIdTarea: t.IdTarea, pDocumento: this.user["CI"] });
    console.log(params);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.mihttp
      .get(this.url + "ListarHorasDeTareaDeUsuario?pIdProyecto=" + t.IdProyecto + "&" + "pIdTarea=" + t.IdTarea + "&" + "pDocumento=" + this.user["CI"] + "", params)
      .map((res: any) => {
        this.retornoListarHorasDeProyectoyTarea = res.json();
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoListarHorasDeProyectoyTarea.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoListarHorasDeProyectoyTarea.Retorno.length>0)
          {
            
            this.horas = this.retornoListarHorasDeProyectoyTarea.Retorno;
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoListarHorasDeProyectoyTarea;            
          }
          else {
            return false;
          }
        }
        else
        {
          return this.retornoListarHorasDeProyectoyTarea.Errores;
        }//fin nueva forma

        //vieja forma
        // this.horas = res.json();
        // if (this.horas.length > 0) {
        //   return this.horas;
        // } else {
        //   return false;
        // }
      })
      .catch(this.handleError);
  }

  //BUSCADOR DE HORAS
  getHorasxTermino(termino: string) {
    return this.horas.filter(
      x => x.Descripcion.toLowerCase().indexOf(termino.toLowerCase()) > -1
    );
  }

  //crear tarea

  CargarHoras(h: Hora, ci: string) {

    //    let body:any = JSON.stringify({ t });    

    var body = {
      "<pHoras>k__BackingField": {
        IdHora: h.Idhora,
        IdTarea: h.IdTarea,
        Descripcion: h.Descripcion,
        CantidadHoras: h.CantidadHoras,
        Fecha: h.Fecha
      },
      "<pDocumento>k__BackingField": ci
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.mihttp
      .post(this.url + 'CargarHorasATarea', body, { headers: headers })
      .map((resp: any) => {
        //swal('Tarea Actualizada', t.Nombre, 'success');
        this.retornoCrearHora = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoCrearHora.RetornoCorrecto==="S")
        {
          return this.retornoCrearHora.RetornoCorrecto;
        }
        else 
        {
          return this.retornoCrearHora.Errores;          
        }//fin nueva forma
        //return resp;
      })
      .catch(this.handleError);
  }


  //editar hora
  editarHoras(h: Hora) {


    var body = {
      Idhora: h.Idhora,
      IdTarea: h.IdTarea,
      Descripcion: h.Descripcion,
      CantidadHoras: h.CantidadHoras,
      Fecha: h.Fecha
    };

    //prueba

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.mihttp
      .post(this.url + 'EditarHoras', body, { headers: headers })
      .map((resp: any) => {
        this.retornoEditarHora = resp.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEditarHora.RetornoCorrecto==="S")
        {
          return this.retornoEditarHora.RetornoCorrecto;
        }
        else 
        {
          return this.retornoEditarHora.Errores;          
        }//fin nueva forma

        //return resp;
      })
      .catch(this.handleError);
  }

  eliminarHora(k: Number) {
    //console.log(k);

    var body = k;

    //console.log(body);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.mihttp
      .post(this.url + 'EliminarHora', body, { headers: headers })
      .map((res:any)  => {
        this.retornoEliminarHora = res.json();        
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoEliminarHora.RetornoCorrecto==="S")
        {
          return this.retornoEliminarHora.RetornoCorrecto;
        }
        else 
        {
          return this.retornoEliminarHora.Errores;          
        }//fin nueva forma      
      
      })

      .catch(this.handleError);
  }

  ListarHorasMensualesDeUsuario(ci:string){   
    
    var body = ci;  
    
    console.log(body);

    let params = JSON.stringify({ pCI: ci });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    

    let options = new RequestOptions({ headers: headers });

    return this.mihttp
      .get(this.url + "ListarHorasMensualesDeUsuario?pDocumento=" + ci + "", params)
      .map((res: any) => {

        this.retornoListadoHorasEfectivas = res.json();
        //Nueva forma de obtener retornos - se crea un objeto retorno en la definicion de las variables
        if (this.retornoListadoHorasEfectivas.RetornoCorrecto==="S")
        {
          //this.proyectos = this.retornoListarProyectosDeUsuario.Retorno;
          if (this.retornoListadoHorasEfectivas.Retorno.length>0)
          {
            
            this.horasefectivas = this.retornoListadoHorasEfectivas.Retorno;
            //console.log(this.retornoListarProyectosDeUsuario.Retorno);

            return this.retornoListadoHorasEfectivas;            
          }
          else {
            return false;
          }
        }
        else
        {
          return this.retornoListadoHorasEfectivas.Errores;
        }//fin nueva forma


        //console.log(res);
        // this.horasefectivas = res.json();
        // console.log(this.horasefectivas);

        // if (this.horasefectivas.length > 0) {
        //   return this.horasefectivas;
        // } else {
        //   return false;
        // }
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
