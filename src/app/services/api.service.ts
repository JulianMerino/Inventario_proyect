import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url= 'http://localhost/server/api-rest/api-equipo_empleado';
  constructor(private http: HttpClient) { }

// Petición de tipo get que devuelve todos los registros
  registros(): Observable<any>{
    return this.http.get(this.url + '/getAll.php');
}


agregarAsignacion(registro: any): Observable<any>{
return this.http.post(this.url + '/post.php', registro)
}


}






