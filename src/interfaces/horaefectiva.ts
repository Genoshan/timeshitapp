import { Hora } from "./hora";
import { Proyecto } from "./proyecto";
import { Tarea } from "./tarea";

export interface HoraEfectiva {

    /*
    ESTRUCTURA DE DATOS DE PROYECTOS
    */   
   oHora: Hora;
   oProyecto: Proyecto;
   oTarea: Tarea;
       
    //AL MOMENTO DE CARGAR LA HORA, PASAR TAMBIEN EL USUARIO Y LA TAREA
}


