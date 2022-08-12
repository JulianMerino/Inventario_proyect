import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  Login(datos: any): Observable<any>{
    return this.http.post(this.url + 'api.php?login', datos);
  }

  setToken(token: any){
    sessionStorage.setItem('token', token );
  }

  deleteToken(){
    sessionStorage.removeItem('token');
  }

  insertarNuevo(registro: any): Observable<any>{
    console.log("Servicio:", registro)
    return this.http.post(this.url + 'api-login/post.php', registro);
  }

  mostrarRegistros(): Observable<any>{
    return this.http.get(this.url + 'api-login/getAll.php');
  }

  eliminarRegistro(id: any): Observable<any>{
    console.log("Servicio",id);
    return this.http.get(`${this.url}api-login/delete.php?id=${id}`);
  }

  validarLogin(registro: any): Observable<any>{
    return this.http.post(this.url + 'api-login/login.php', registro)
  }


}
