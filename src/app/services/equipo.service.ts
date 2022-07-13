import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  //Dirección en donde se encuentra el api
  url = 'http://localhost/server/api-rest/api-equipo';

  constructor(private http: HttpClient) { }

agregarEquipo(registro: any): Observable<any>{
  return this.http.post(this.url+ '/post.php', registro);

}

editarEquipo(registro: any): Observable<any>{
  return this.http.post(this.url + '/update.php', registro);
  
}


obtenerEquipo(id_comp: any): Observable<any>{  
  return this.http.get(`${this.url}/get.php?id_comp=${id_comp}`);
  
}
obtenerEquipos(): Observable<any>{
  return this.http.get(this.url + '/getAll.php');
  
}

}
