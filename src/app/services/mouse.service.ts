import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MouseService {
  //url = 'http://localhost/server/api-rest/api-mouse';
  url= environment.url;
  constructor(private http: HttpClient) { }

  registrosMouse(): Observable<any>{
 return this.http.get(this.url + 'api-mouse/getAll.php');
  }

  agregarMouse(registro: any): Observable<any>{
    return this.http.post(this.url + 'api-mouse/post.php', registro);
  }

  editarEstatus(estatus: any): Observable<any>{
    return this.http.post(this.url + 'api-mouse/update.php', estatus)
  }

  registroMouse(id_mouse : any): Observable<any>{
    return this.http.get(`${this.url}api-mouse/get.php?id_mouse=${id_mouse}`);
  }
}
