import { Component, OnInit } from '@angular/core';
import { equipoI } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { empleadoI } from 'src/app/models/empleado';
import { ApiService } from 'src/app/services/api.service';
import { equipo_empleadoI } from 'src/app/models/equipo_asignado';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {
  lista: any;
  resultado: any;
  searchText: any;
  pages: any;
  equipo_asignado: FormGroup;
  empleado_form: FormGroup;
  filtro: FormGroup;
   equipos: equipoI[]=[];
   empleados: empleadoI[]=[];
   equipo_empleado: equipo_empleadoI[]=[];
  constructor(private api:EquipoService, private fb: FormBuilder, private emp: EmpleadoService, private e_a: ApiService) { 

    this.equipo_asignado = this.fb.group({
      fk_id_empleado: [''],
      fk_id_equipo: [''],
      f_asignacion: ['']
    })

    this.empleado_form = this.fb.group({
      n_completo: [''],
      cliente: [''],
    })

    this.filtro =this.fb.group({
     filter: [''],
    }); 
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.mostrarRegistros();
    this.registros();
   
  }

  obtenerEmpleados(){
    this.emp.obtenerEmpleados().subscribe( res =>{
      this.empleados = res;
    });
    
  }

  mostrarRegistros(){
    this.api.obtenerEquipos().subscribe( res =>{
      this.equipos = res;
      console.log(this.equipos)
    });
  }

  asignarEquipo(){
    
      this.e_a.agregarAsignacion(this.equipo_asignado.value).subscribe( res =>{
        this.resultado = res.resultado;
        if(res.resultado == true){
          this.registros();
          this.equipo_asignado.reset();
        }
       
      });
  }

//Trae todos los registros de los equipos asignados a un empleado
  agregarEmpleado(){

    if(this.empleado_form.valid){
      this.emp.agregar(this.empleado_form.value).subscribe( res =>{
        this.obtenerEmpleados();
        if(res.resultado == true){
          console.log('Registro exitoso');
          this.empleado_form.reset();
        }
        console.log(res);

      });
    }
   
  }


  registros(){
    this.e_a.registros().subscribe( res =>{
      this.equipo_empleado = res;
      console.log(this.equipo_empleado)
        });

  }


  resetForm(){
    this.equipo_asignado.reset();
   
  }

}
