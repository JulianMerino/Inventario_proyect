import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  respuesta: any;
  loginForm: FormGroup;
  token = true;
  token_encrypt: any;


  
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
   }

  ngOnInit(): void {
   
   
  }

  Onsubmit(){
    if(this.loginForm.valid){
     this.auth.Login(this.loginForm.value).subscribe(res =>{
      this.respuesta = res.estatus;
      if(res.status== this.token){
        this.auth.setToken(res.status);
        this.router.navigate(['/administrador']);
      }
      else{
        Swal.fire({
          icon: 'error',
          text: 'Acceso denegado',
          showConfirmButton: false,
          timer: 1000
        })
     
        this.router.navigate(['/']);
        this.loginForm.reset();
      }
     });
    }
  }

  

}
