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
      let validateSession = sessionStorage.getItem('token');
      if(validateSession != null || validateSession !='' ){
      }
    if( sessionStorage.getItem('token') == null || sessionStorage.getItem('token') == ''){
      this.router.navigate(['/']);
      }
    
   }
   logout()
  {
  this.auth.deleteToken();
  window.location.href = window.location.href;
  }

}
