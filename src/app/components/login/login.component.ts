import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token = true;


  
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
      console.log(res);
      if(res.status== this.token){
        this.auth.setToken(res.status);
      
        this.router.navigate(['/administrador']);

      }
      else{
       
        alert ("No existe el usuario");
        this.router.navigate(['/']);
        this.loginForm.reset();
      }
     });
    }
  }

  

}
