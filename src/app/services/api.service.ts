import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = environment.url;

  constructor(private http: HttpClient) { }

// Petición de tipo get que devuelve todos los registros
  registros(): Observable<any>{
    return this.http.get(this.url + 'api-equipo_empleado/getAll.php');
}


agregarAsignacion(registro: any): Observable<any>{
return this.http.post(this.url+'api-equipo_empleado/post.php', registro)
}


//Peticion para actualizar un registro de la tabla empleado_equipo
editarAsignacion(registro: any): Observable<any>{
  return this.http.post(this.url + 'api-equipo_empleado/update.php', registro);
  
}

obtenerEquipoAsig(id_empleado_equipo: any): Observable<any>{
  return this.http.get(`${this.url}api-equipo_empleado/get.php?id_empleado_equipo=${id_empleado_equipo}`);
}


}






