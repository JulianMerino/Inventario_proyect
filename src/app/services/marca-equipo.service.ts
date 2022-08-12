import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MarcaEquipoService {
  url  = environment.url;
  constructor(private http: HttpClient) { }

  agregarMarca(marca: any): Observable<any>{
    console.log("Aqui marca en el servicio: " , marca)
  return this.http.post(this.url + 'api-marca/post.php', marca);
  }
  
  registrosMarcas(): Observable<any>{
    return this.http.get(this.url + 'api-marca/getAll.php');
  }



}
