export interface Hora {

    /*
    ESTRUCTURA DE DATOS DE PROYECTOS
    */   
    Idhora:number;
    Descripcion:string;
    CantidadHoras:number;
    Fecha:Date;
    IdTarea: number;
    
    //AL MOMENTO DE CARGAR LA HORA, PASAR TAMBIEN EL USUARIO Y LA TAREA
}
