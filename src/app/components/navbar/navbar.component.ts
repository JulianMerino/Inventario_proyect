import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.Verificar();
  }
    Verificar(){
      let validateSession = localStorage.getItem('token');
      console.log('session: ', validateSession);
  
      if(validateSession != null ){
       console.log('Sesion activa');
   
       
      }
    if( localStorage.getItem('token') == null){
      this.router.navigate(['']);
      }
    
   }
   logout()
  {
  this.auth.deleteToken();
  window.location.href = window.location.href;
  }

}
