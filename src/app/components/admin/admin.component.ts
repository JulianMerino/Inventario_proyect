import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, NgForm } from '@angular/forms';
import { EquipoService } from 'src/app/services/equipo.service';
import { equipoI } from 'src/app/models/equipo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  totalRegistros: any;
  searchText: any;
  datos: equipoI= {id_comp: '',tipo: '', marca:'', modelo: '', n_serie: '', m_ram: '', procesador: '', f_garantia: '', f_compra: '',estatus: ''};
  page: any;
  addEquipo: FormGroup;
  equipos:equipoI[]=[];



  constructor( 
              private router: Router, 
              private fb: FormBuilder,
              private api: EquipoService) {

    this.addEquipo = this.fb.group({
      tipo:[''],
      marca:[''],
      modelo:[''],
      n_serie:[''],
      m_ram:[''],
      procesador:[''],
      f_garantia:[''],
      f_compra:[''],
      estatus:['']
    });
   }

  ngOnInit(): void {

    this.mostrarRegistros();
    console.log("Total de registros: ", this.totalRegistros)
  
  }

  mostrarRegistros(){
     return this.api.obtenerEquipos().subscribe(res =>{
      this.equipos = res;
      
      console.log(this.equipos)
      console.log("Total: ",this.equipos.length);
     });
   
    
  }


 enviarDatos(){
     if(this.addEquipo.valid){
    this.api.agregarEquipo(this.addEquipo.value).subscribe( res =>{
      this.mostrarRegistros();
      if(res.resultado == true){
        console.log('Registro exitoso');
        this.addEquipo.reset();
      }
     
       console.log(res);
    });
  }
 }

 obtenerEquipo(id_comp: any){
  this.api.obtenerEquipo(id_comp).subscribe( res  =>{
    this.totalRegistros = res.lenght;
    this.datos = res;
  } );
 }

editarEquipo(){
  
  this.api.editarEquipo(this.datos).subscribe( res =>{
    if(res.resultado== true){
    console.log("Registro editado correctamente")
     this.mostrarRegistros();
    }
    else{
    console.log("Error")
    this.mostrarRegistros();
  }
  });

}



}
