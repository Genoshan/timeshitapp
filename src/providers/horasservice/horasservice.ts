import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http,Headers, RequestOptions} from "@angular/http";
import { Hora } from '../../interfaces/hora';
import { Usuario } from '../../interfaces/usuario';
import { Tarea } from '../../interfaces/tarea';


@Injectable()
export class HorasserviceProvider {

    //ATRIBUTOS
    private horas: Hora[]=[];
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
      Descripcion:string;
      CantidadHoras:number;
      Fecha:Date;
      IdTarea: number;
    };

  constructor(public http: HttpClient,
    public mihttp:Http) {
    this.url = "http://localhost:88/api/";    
  }

  getHoras(key$: number) {}

  getHora(id: number) {
    return (this.Hora = this.horas.find(x => x.Idhora == id));
  }

  getHorasDeTarea(t: Tarea) {
    this.user=JSON.parse(localStorage.getItem('usuario'));
    let params = JSON.stringify({ pIdProyecto: t.IdProyecto, pIdTarea: t.IdTarea, pDocumento: this.user["CI"]});   
    console.log(params);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.mihttp
      .get(this.url + "ListarHorasDeTareaDeUsuario?pIdProyecto=" + t.IdProyecto +  "&" + "pIdTarea=" + t.IdTarea + "&" + "pDocumento=" + this.user["CI"] + "" , params)
      .map((res: any) => {
        this.horas = res.json();
        
        if (this.horas.length > 0) {
          return this.horas;
        } else {
          return false;
        }
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
    
       CargarHoras(h: Hora, ci:string) {
    
        //    let body:any = JSON.stringify({ t });    
        
        var body = {
          "<pHoras>k__BackingField" : {
            IdHora:h.Idhora,
            IdTarea: h.IdTarea,            
            Descripcion: h.Descripcion,
            CantidadHoras: h.CantidadHoras,
            Fecha: h.Fecha
          },
          "<pDocumento>k__BackingField" : ci
        };    
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
    
        let options = new RequestOptions({ headers: headers });
    
        return this.mihttp
          .post(this.url + 'CargarHorasATarea', body, { headers: headers })
          .map((resp: any) => {
            //swal('Tarea Actualizada', t.Nombre, 'success');
            
            return resp;
          })
          .catch(this.handleError);
      }


        //editar hora
  editarHoras(h: Hora) {
    

    var body = {        
        Idhora:h.Idhora,
        IdTarea: h.IdTarea,            
        Descripcion: h.Descripcion,
        CantidadHoras: h.CantidadHoras,
        Fecha: h.Fecha      
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.mihttp
      .post(this.url + 'EditarHoras', body, { headers: headers })
      .map((resp: any) => {
        
        
        return resp;
      })
      .catch(this.handleError);
  }

  eliminarHora(k: Number) {
    console.log(k);
    
    var body =         
        k      
    ;
    
    console.log(body);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.mihttp
      .post(this.url + 'EliminarHora', body, { headers: headers })
      .map(res => res.json())
      
      .catch(this.handleError);
  }

            //MANEJADOR DE ERRORES DE SERVICIO
            private handleError(error: any) {
              let errMsg = error.message
                ? error.message
                : error.status
                  ? `${error.status} - ${error.statusText}`
                  : "Server error";
              return Observable.throw(error);
            }

}
