import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  //Dirección del api
  url = environment.url;
  
  constructor(private http: HttpClient) { }

agregarEquipo(equipo: any): Observable<any>{
  console.log("Equipo servicio: ", equipo)
  return this.http.post(`${this.url}api-equipo/postEquipo.php`, equipo);

}

editarEquipo(registro: any): Observable<any>{
  return this.http.post(`${this.url}api-equipo/update.php`, registro);
  
}


obtenerEquipo(id_comp: any): Observable<any>{  
  return this.http.get(`${this.url}api-equipo/get.php?id_comp=${id_comp}`);
  
}
obtenerEquipos(): Observable<any>{
  return this.http.get(this.url + 'api-equipo/getAll.php');
  
}
totalEquipos(): Observable<any>{
  return this.http.get(this.url + 'api-equipo/getAll.php');
}

cambiarEstatus(estatus: any): Observable<any>{
  return this.http.post(`${this.url}api-equipo/estatus.php`, estatus);
}




}
