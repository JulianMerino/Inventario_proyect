import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost/server/api-rest/api.php';
  URL= 'http://localhost/server/api-rest/api-login';

  constructor(private http: HttpClient) { }

  Login(datos: any): Observable<any>{
    return this.http.post(this.url + '?login', datos);
  }

  setToken(token: any){
    localStorage.setItem('token', token );

  }
  deleteToken(){
    localStorage.removeItem('token');
  }

  insertarNuevo(registro: any): Observable<any>{
    console.log("Servicio:", registro)
    return this.http.post(this.URL + '/post.php', registro);

  }

  mostrarRegistros(): Observable<any>{
    return this.http.get(this.URL + '/getAll.php');
  }

  eliminarRegistro(id: any): Observable<any>{
    console.log("Servicio",id);
    return this.http.get(`${this.URL}/delete.php?id=${id}`);
  }

  validarLogin(registro: any): Observable<any>{
    return this.http.post(this.URL + '/login.php', registro)
  }


}
