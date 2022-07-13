import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

 url = 'http://localhost/server/api-rest/api-empleado';

 constructor(private http: HttpClient) { }

 agregar(registro: any): Observable<any>{
  return this.http.post(this.url+ '/post.php', registro);
 }

 obtenerEmpleados(): Observable<any>{
  return this.http.get(this.url + '/getAll.php ');
 }


}
