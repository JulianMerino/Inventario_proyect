import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { adminI} from 'src/app/models/equipo';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  pages: any;
  
  formularioLogin: FormGroup;
  admin:adminI[]=[];

  constructor(private auth: AuthService, private router: Router,
              private fb:FormBuilder) {

              this.formularioLogin = this.fb.group({
                nombre: [''],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(8)]]
              })
                
              }

  ngOnInit(): void {
    this.mostrarRegistros();
   
  }


  mostrarRegistros(){
    this.auth.mostrarRegistros().subscribe(res =>{
      this.admin = res;
    })
  }


  agregar(){
    this.auth.insertarNuevo(this.formularioLogin.value).subscribe( res =>{
      this.mostrarRegistros();
      this.formularioLogin.reset();

      console.log("Res: ", res);
     
    });
  }


  eliminar(id: any){
    this.auth.eliminarRegistro(id).subscribe( res =>{
      this.mostrarRegistros();
      console.log(res);
    })
  }


}
