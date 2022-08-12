import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
 url = environment.url;

 constructor(private http: HttpClient) { }

 agregar(registro: any): Observable<any>{
  return this.http.post(this.url+ 'api-empleado/post.php', registro);
 }

 obtenerEmpleados(): Observable<any>{
  return this.http.get(this.url + 'api-empleado/getAll.php ');
 }




}
