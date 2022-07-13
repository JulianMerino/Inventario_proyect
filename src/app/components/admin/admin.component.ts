import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder } from '@angular/forms';
import { EquipoService } from 'src/app/services/equipo.service';
import { equipoI } from 'src/app/models/equipo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  filterPost ='';
  //Deditar_equipo: FormGroup;
  datos: equipoI= {id_comp: '',tipo: '', marca:'', modelo: '', n_serie: '', m_ram: '', procesador: '', f_garantia: '', f_compra: '',estatus: ''};
  filtro: any;
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
  
  }

  mostrarRegistros(){
    this.api.obtenerEquipos().subscribe(res =>{
      this.equipos = res;
      console.log(this.equipos)
     });
   
    
  }


 enviarDatos(){
     if(this.addEquipo.valid){


    this.api.agregarEquipo(this.addEquipo.value).subscribe( res =>{
      console.log(res);
      if(res.resultado == true){
        this.mostrarRegistros();
        this.addEquipo.reset();
        console.log('Registro exitoso');
      }
      else{
        alert ('Error');
        this.addEquipo.reset();
      }
    });
  }
 }

 obtenerEquipo(id_comp: any){
  this.api.obtenerEquipo(id_comp).subscribe( res  =>{
  
  console.log("Equipo recibido",this.datos = res);

  } );
 }

editarEquipo(){
  
  this.api.editarEquipo(this.datos).subscribe( res =>{
    console.log(res);
    if(res.resultado== true){
      alert ("Acción realizada correctamente")
     this.mostrarRegistros();
    }
    this.mostrarRegistros();
    
  });

}


}
