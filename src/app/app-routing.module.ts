import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AsignacionesComponent } from './components/asignaciones/asignaciones.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'administrador', component: AdminComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'asignaciones', component:AsignacionesComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
